"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const csvParse = require("csv-parse/sync");
const csvStringify = require("csv-stringify/sync");
let CosService = class CosService {
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
    async leerCSV(key) {
        const data = await this.s3.getObject({ Bucket: this.bucket, Key: key }).promise();
        const csv = data.Body.toString('utf-8');
        return csvParse.parse(csv, { columns: true });
    }
    async escribirCSV(key, rows) {
        if (!rows || rows.length === 0)
            throw new Error('No hay datos para escribir');
        const csv = csvStringify.stringify(rows, { header: true });
        await this.s3.putObject({
            Bucket: this.bucket,
            Key: key,
            Body: csv,
            ContentType: 'text/csv',
        }).promise();
    }
    async addRow(key, row) {
        const rows = await this.leerCSV(key);
        rows.push(row);
        await this.escribirCSV(key, rows);
        return row;
    }
    async updateRow(key, idField, idValue, newData) {
        const rows = await this.leerCSV(key);
        console.log(`[DEBUG] Buscando en ${key} con campo ${idField} = ${idValue} (tipo: ${typeof idValue})`);
        console.log(`[DEBUG] Estructura completa del CSV:`, rows);
        console.log(`[DEBUG] Columnas disponibles:`, rows.length > 0 ? Object.keys(rows[0]) : 'CSV vacío');
        let idx = -1;
        if (rows.length > 0 && !(idField in rows[0])) {
            console.log(`[DEBUG] Campo ${idField} no existe en el CSV, usando índice del array`);
            idx = idValue - 1;
            console.log(`[DEBUG] Usando índice ${idx} para ID ${idValue}`);
        }
        else {
            console.log(`[DEBUG] Buscando por campo ${idField} en el CSV`);
            console.log(`[DEBUG] Registros disponibles:`, rows.map(r => ({ id: r[idField], tipo: typeof r[idField] })));
            idx = rows.findIndex(r => {
                const match = r[idField] == idValue;
                console.log(`[DEBUG] Comparando ${r[idField]} (${typeof r[idField]}) == ${idValue} (${typeof idValue}) = ${match}`);
                return match;
            });
            if (idx === -1 && typeof idValue === 'number') {
                console.log(`[DEBUG] No se encontró el ID ${idValue}, usando índice del array`);
                idx = idValue - 1;
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
    async deleteRow(key, idField, idValue) {
        const rows = await this.leerCSV(key);
        let idx = -1;
        if (rows.length > 0 && !(idField in rows[0])) {
            console.log(`[DEBUG] Campo ${idField} no existe en el CSV, usando índice del array para eliminar`);
            idx = idValue - 1;
        }
        else {
            idx = rows.findIndex(r => r[idField] == idValue);
            if (idx === -1 && typeof idValue === 'number') {
                console.log(`[DEBUG] No se encontró el ID ${idValue}, usando índice del array para eliminar`);
                idx = idValue - 1;
            }
        }
        if (idx === -1 || idx >= rows.length) {
            throw new Error('Registro no encontrado');
        }
        rows.splice(idx, 1);
        await this.escribirCSV(key, rows);
    }
};
exports.CosService = CosService;
exports.CosService = CosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CosService);
//# sourceMappingURL=cos.service.js.map