import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as csvParse from 'csv-parse/sync';
import * as csvStringify from 'csv-stringify/sync';

@Injectable()
export class CosService {
  private s3: AWS.S3;
  private bucket: string;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: process.env.COS_ENDPOINT,
      accessKeyId: process.env.COS_ACCESS_KEY_ID,
      secretAccessKey: process.env.COS_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
      s3ForcePathStyle: true,
    });
    this.bucket = process.env.COS_BUCKET;
  }

  async leerCSV(key: string): Promise<any[]> {
    const data = await this.s3.getObject({ Bucket: this.bucket, Key: key }).promise();
    const csv = data.Body.toString('utf-8');
    return csvParse.parse(csv, { columns: true });
  }

  async escribirCSV(key: string, rows: any[]): Promise<void> {
    if (!rows || rows.length === 0) throw new Error('No hay datos para escribir');
    const csv = csvStringify.stringify(rows, { header: true });
    await this.s3.putObject({
      Bucket: this.bucket,
      Key: key,
      Body: csv,
      ContentType: 'text/csv',
    }).promise();
  }

  // Helpers CRUD genéricos
  async addRow(key: string, row: any): Promise<any> {
    const rows = await this.leerCSV(key);
    rows.push(row);
    await this.escribirCSV(key, rows);
    return row;
  }

  async updateRow(key: string, idField: string, idValue: any, newData: any): Promise<any> {
    const rows = await this.leerCSV(key);
    console.log(`[DEBUG] Buscando en ${key} con campo ${idField} = ${idValue} (tipo: ${typeof idValue})`);
    console.log(`[DEBUG] Estructura completa del CSV:`, rows);
    console.log(`[DEBUG] Columnas disponibles:`, rows.length > 0 ? Object.keys(rows[0]) : 'CSV vacío');
    
    let idx = -1;
    
    // Si el campo idField no existe en el CSV, usar el índice del array
    if (rows.length > 0 && !(idField in rows[0])) {
      console.log(`[DEBUG] Campo ${idField} no existe en el CSV, usando índice del array`);
      idx = idValue - 1; // Los IDs empiezan en 1, pero los índices en 0
      console.log(`[DEBUG] Usando índice ${idx} para ID ${idValue}`);
    } else {
      console.log(`[DEBUG] Buscando por campo ${idField} en el CSV`);
      console.log(`[DEBUG] Registros disponibles:`, rows.map(r => ({ id: r[idField], tipo: typeof r[idField] })));
      
      // Primero intentar buscar por el ID exacto
      idx = rows.findIndex(r => {
        const match = r[idField] == idValue;
        console.log(`[DEBUG] Comparando ${r[idField]} (${typeof r[idField]}) == ${idValue} (${typeof idValue}) = ${match}`);
        return match;
      });
      
      // Si no se encuentra y el ID es numérico, usar el índice del array
      if (idx === -1 && typeof idValue === 'number') {
        console.log(`[DEBUG] No se encontró el ID ${idValue}, usando índice del array`);
        idx = idValue - 1; // Los IDs empiezan en 1, pero los índices en 0
        console.log(`[DEBUG] Usando índice ${idx} para ID ${idValue}`);
      }
    }
    
    if (idx === -1 || idx >= rows.length) {
      console.log(`[DEBUG] No se encontró el registro con ${idField} = ${idValue} (índice: ${idx})`);
      throw new Error('Registro no encontrado');
    }
    
    console.log(`[DEBUG] Registro encontrado en índice ${idx}:`, rows[idx]);
    rows[idx] = { ...rows[idx], ...newData };
    await this.escribirCSV(key, rows);
    return rows[idx];
  }

  async deleteRow(key: string, idField: string, idValue: any): Promise<void> {
    const rows = await this.leerCSV(key);
    
    let idx = -1;
    
    // Si el campo idField no existe en el CSV, usar el índice del array
    if (rows.length > 0 && !(idField in rows[0])) {
      console.log(`[DEBUG] Campo ${idField} no existe en el CSV, usando índice del array para eliminar`);
      idx = idValue - 1; // Los IDs empiezan en 1, pero los índices en 0
    } else {
      // Primero intentar buscar por el ID exacto
      idx = rows.findIndex(r => r[idField] == idValue);
      
      // Si no se encuentra y el ID es numérico, usar el índice del array
      if (idx === -1 && typeof idValue === 'number') {
        console.log(`[DEBUG] No se encontró el ID ${idValue}, usando índice del array para eliminar`);
        idx = idValue - 1; // Los IDs empiezan en 1, pero los índices en 0
      }
    }
    
    if (idx === -1 || idx >= rows.length) {
      throw new Error('Registro no encontrado');
    }
    
    rows.splice(idx, 1);
    await this.escribirCSV(key, rows);
  }
} 