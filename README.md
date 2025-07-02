# EnergíaFina S.A. - Sistema de Optimización de Producción

Sistema de optimización de producción de gasolinas que utiliza **IBM Watson Studio** con **programación lineal** para maximizar el beneficio total considerando restricciones de calidad, demanda y capacidad.

## Características

- **Backend**: NestJS con integración a IBM Watson Studio y Cloud Object Storage
- **Frontend**: React con interfaz moderna y responsiva
- **Optimización**: Modelo OPL (Optimization Programming Language) ejecutado en Watson Studio
- **Almacenamiento**: IBM Cloud Object Storage para datos CSV
- **Gestión**: CRUD completo para aceites crudos, tipos de gasolina y parámetros

## Arquitectura

```
Frontend (React) → Backend (NestJS) → IBM Cloud Object Storage → Watson Studio → Resultados
```

### Motor de Optimización
- **IBM Watson Studio**: Plataforma de optimización en la nube
- **Modelo OPL**: Programación lineal con variables de decisión:
  - `Blend[o][g]`: Cantidad de aceite o a mezclar en gasolina g
  - `a[g]`: Cantidad adicional de gasolina g a producir
- **CPLEX**: Solver de optimización industrial

## Estructura del Proyecto

```
├── backend/          # API NestJS con servicios de Watson
├── frontend/         # Aplicación React
├── docs/            # Documentación técnica
│   ├── TECHNICAL_DOCUMENTATION.md
│   ├── USER_GUIDE.md
│   └── WATSON_STUDIO_INTEGRATION.md
└── README.md
```

## Instalación

1. **Instalar dependencias:**
```bash
npm run install:all
```

2. **Configurar variables de entorno:**
   - Copiar `.env.example` a `.env` en el directorio `backend/`
   - Configurar credenciales de IBM Cloud Object Storage
   - Configurar credenciales de IBM Watson Studio (opcional)

3. **Ejecutar en desarrollo:**
```bash
npm run dev
```

## Configuración de IBM Cloud

### Cloud Object Storage
```env
COS_ENDPOINT=your-cos-endpoint
COS_API_KEY=your-cos-api-key
COS_BUCKET=your-bucket-name
```

### Watson Studio (Opcional)
```env
WATSON_STUDIO_API_KEY=your-watson-api-key
WATSON_STUDIO_PROJECT_ID=your-project-id
WATSON_STUDIO_URL=your-watson-studio-url
```

## Uso

### Backend (NestJS)
- Puerto: 3001
- Documentación API: http://localhost:3001/api

### Frontend (React)
- Puerto: 3000
- URL: http://localhost:3000

## Funcionalidades

### Gestión de Datos
- **Aceites Crudos**: Agregar, modificar, eliminar y listar desde Cloud Object Storage
- **Tipos de Gasolina**: Gestión completa con parámetros técnicos
- **Parámetros Globales**: Configuración del modelo de optimización

### Optimización con Watson Studio
- **Modelo OPL**: Programación lineal para maximización de beneficios
- **Restricciones**: Capacidad, calidad (octanaje/plomo), demanda
- **Variables de Decisión**: Asignación óptima de aceites a gasolinas
- **Resultados**: Métricas detalladas de producción y beneficios
- **Persistencia**: Resultados guardados automáticamente en localStorage
- **Ejecución Real**: Integración completa con IBM Watson Studio API

### Visualización
- **Dashboard**: Métricas principales de optimización
- **Asignaciones**: Tabla de mezclas óptimas aceite-gasolina
- **Producción**: Análisis de cumplimiento de demanda
- **Métricas**: Ingresos, costos, beneficios y excedentes
- **Persistencia de Resultados**: Carga automática de última ejecución
- **Indicadores Visuales**: Información de última ejecución y estado

## Modelo de Optimización

### Función Objetivo
```
maximize
  sum(g in Gasolines, o in Oils)
    (g.price - o.price - ProdCostParam.ProdCost) * Blend[o][g]
  - sum(g in Gasolines) a[g];
```

### Restricciones Principales
1. **Demanda**: Satisfacer demanda de cada gasolina
2. **Capacidad**: Respetar capacidad de cada aceite
3. **Producción Máxima**: Límite total de producción
4. **Calidad**: Cumplir especificaciones de octanaje y plomo

## API Endpoints

### Optimización
- `POST /optimizacion/ejecutar`: Ejecuta optimización con Watson Studio
- `GET /optimizacion/datos`: Obtiene datos para optimización
- `GET /optimizacion/resultados`: Obtiene resultados de optimización
- `GET /optimizacion/test-conexion`: Prueba conexión con Watson Studio
- `GET /optimizacion/watson`: Ejecuta optimización real en Watson Studio

### Gestión de Datos
- `GET/POST/PUT/DELETE /aceites`: CRUD de aceites
- `GET/POST/PUT/DELETE /gasolinas`: CRUD de gasolinas
- `GET/PUT /parametros`: Gestión de parámetros

### Jobs
- `POST /jobs/launch`: Lanza job de optimización
- `GET /jobs/status/:jobId`: Consulta estado del job
- `GET /jobs/results/:jobId`: Obtiene resultados del job

## Tecnologías

- **Backend**: NestJS, TypeScript, IBM Watson Studio API, IBM Cloud Object Storage
- **Frontend**: React, TypeScript, Material-UI, localStorage
- **Optimización**: IBM Watson Studio, OPL, CPLEX
- **Almacenamiento**: IBM Cloud Object Storage (CSV), localStorage (resultados)

## Ventajas de la Integración

### Escalabilidad
- Watson Studio maneja problemas de optimización complejos
- Procesamiento distribuido en la nube

### Flexibilidad
- Modelo OPL permite modificar restricciones fácilmente
- Datos dinámicos desde Cloud Object Storage

### Confiabilidad
- Motor de optimización industrial (CPLEX)
- Resultados consistentes y reproducibles
- Persistencia de resultados entre sesiones

## Documentación

- [Documentación Técnica](docs/TECHNICAL_DOCUMENTATION.md)
- [Guía de Usuario](docs/USER_GUIDE.md)
- [Integración con Watson Studio](docs/WATSON_STUDIO_INTEGRATION.md)

## Licencia

MIT 