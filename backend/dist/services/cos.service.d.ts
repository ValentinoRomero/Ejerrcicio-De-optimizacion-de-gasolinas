export declare class CosService {
    private s3;
    private bucket;
    constructor();
    leerCSV(key: string): Promise<any[]>;
    escribirCSV(key: string, rows: any[]): Promise<void>;
    addRow(key: string, row: any): Promise<any>;
    updateRow(key: string, idField: string, idValue: any, newData: any): Promise<any>;
    deleteRow(key: string, idField: string, idValue: any): Promise<void>;
}
