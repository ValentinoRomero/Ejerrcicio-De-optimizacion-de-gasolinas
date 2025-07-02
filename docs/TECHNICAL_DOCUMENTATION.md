# Documentación Técnica - EnergíaFina S.A.

## Arquitectura del Sistema

### Backend (NestJS)

#### Estructura de Módulos
```
backend/
├── src/
│   ├── entities/           # Entidades de base de datos
│   ├── services/           # Servicios de negocio
│   ├── aceites/           # Módulo de aceites crudos
│   ├── gasolinas/         # Módulo de tipos de gasolina
│   ├── parametros/        # Módulo de parámetros globales
│   ├── optimizacion/      # Módulo de optimización
│   └── main.ts            # Punto de entrada
```

#### Tecnologías Utilizadas
- **NestJS**: Framework para aplicaciones Node.js
- **TypeORM**: ORM para base de datos
- **SQLite**: Base de datos (desarrollo)
- **Swagger**: Documentación de API
- **Class Validator**: Validación de datos
- **Axios**: Cliente HTTP para IBM Watson Studio

#### Entidades de Base de Datos

##### Aceite
```typescript
{
  id: number;
  nombre: string;
  octanaje: number;      // RON (0-120)
  plomo: number;         // mg/L (0-1000)
  costo: number;         // USD/L
  capacidad: number;     // Litros disponibles
  createdAt: Date;
  updatedAt: Date;
}
```

##### Gasolina
```typescript
{
  id: number;
  nombre: string;
  demanda: number;           // Litros requeridos
  precio: number;            // USD/L
  octanajeMinimo: number;    // RON mínimo requerido
  plomoMaximo: number;       // mg/L máximo permitido
  createdAt: Date;
  updatedAt: Date;
}
```

##### Parametros
```typescript
{
  id: number;
  costoFijoPorLitro: number;         // USD/L
  produccionMaximaTotal: number;     // Litros totales
  penalizacionProduccionExtra: number; // Factor multiplicador
  permitirProduccionExtra: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Frontend (React)

#### Estructura de Componentes
```
frontend/
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/            # Páginas principales
│   ├── services/         # Servicios de API
│   └── App.tsx           # Componente principal
```

#### Tecnologías Utilizadas
- **React 18**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Material-UI**: Componentes de UI
- **React Router**: Navegación
- **Axios**: Cliente HTTP
- **localStorage**: Persistencia de datos en el navegador
- **Custom Hooks**: useLocalStorage para gestión de estado persistente

## Modelo de Optimización

### Función Objetivo
Maximizar el beneficio total:
```
Max: Σ(j) [precio[j] * (Σ(i) x[i][j] + a[j])] - Σ(i,j) [costo[i] * x[i][j]] - costoFijo * Σ(i,j) x[i][j] - penalizacion * Σ(j) a[j]
```

Donde:
- `x[i][j]`: Litros del aceite i usados en gasolina j
- `a[j]`: Litros excedentes de gasolina j
- `precio[j]`: Precio de venta de gasolina j
- `costo[i]`: Costo del aceite i
- `costoFijo`: Costo fijo por litro
- `penalizacion`: Factor de penalización por excedentes

### Restricciones

#### 1. Capacidad de Aceites
```
Σ(j) x[i][j] ≤ capacidad[i] para todo i
```

#### 2. Demanda
```
Σ(i) x[i][j] + a[j] ≥ demanda[j] para todo j
```

#### 3. Calidad - Octanaje
```
Σ(i) [octanaje[i] * x[i][j]] / Σ(i) x[i][j] ≥ octanajeMinimo[j] para todo j
```

#### 4. Calidad - Plomo
```
Σ(i) [plomo[i] * x[i][j]] / Σ(i) x[i][j] ≤ plomoMaximo[j] para todo j
```

#### 5. Producción Total
```
Σ(i,j) x[i][j] ≤ produccionMaximaTotal
```

#### 6. No Negatividad
```
x[i][j] ≥ 0, a[j] ≥ 0 para todo i, j
```

## Integración con IBM Watson Studio

### Configuración
```env
WATSON_API_URL=https://api.dataplatform.cloud.ibm.com
WATSON_API_KEY=your_api_key
WATSON_PROJECT_ID=your_project_id
WATSON_SPACE_ID=your_space_id
```

### Flujo de Optimización
1. **Recopilación de Datos**: Obtener aceites, gasolinas y parámetros
2. **Validación**: Verificar compatibilidad y restricciones
3. **Construcción del Modelo**: Crear modelo de optimización lineal
4. **Envío a Watson**: Transmitir modelo a IBM Watson Studio
5. **Procesamiento**: Ejecutar optimización en la nube
6. **Resultados**: Recibir y procesar solución óptima

## API Endpoints

### Aceites
- `GET /aceites` - Listar todos los aceites
- `POST /aceites` - Crear nuevo aceite
- `GET /aceites/:id` - Obtener aceite por ID
- `PATCH /aceites/:id` - Actualizar aceite
- `DELETE /aceites/:id` - Eliminar aceite
- `GET /aceites/stats` - Estadísticas de aceites

### Gasolinas
- `GET /gasolinas` - Listar todas las gasolinas
- `POST /gasolinas` - Crear nueva gasolina
- `GET /gasolinas/:id` - Obtener gasolina por ID
- `PATCH /gasolinas/:id` - Actualizar gasolina
- `DELETE /gasolinas/:id` - Eliminar gasolina
- `GET /gasolinas/stats` - Estadísticas de gasolinas

### Parámetros
- `GET /parametros` - Obtener parámetros actuales
- `PATCH /parametros` - Actualizar parámetros
- `POST /parametros/init` - Inicializar parámetros por defecto

### Optimización
- `POST /optimizacion/ejecutar` - Ejecutar optimización
- `GET /optimizacion/validar` - Validar datos para optimización
- `GET /optimizacion/watson` - Ejecutar optimización real en Watson Studio
- `GET /optimizacion/test-conexion` - Probar conexión con Watson Studio

## Despliegue

### Desarrollo
```bash
npm run dev          # Backend + Frontend
npm run dev:backend  # Solo backend
npm run dev:frontend # Solo frontend
```

### Producción
```bash
npm run build        # Construir aplicación
npm start           # Iniciar en producción
```

### Variables de Entorno
```env
# Backend
PORT=3001
NODE_ENV=production
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=energiafina
DB_USERNAME=user
DB_PASSWORD=password

# IBM Watson Studio
WATSON_API_URL=https://api.dataplatform.cloud.ibm.com
WATSON_API_KEY=your_api_key
WATSON_PROJECT_ID=your_project_id
WATSON_SPACE_ID=your_space_id
```

## Consideraciones de Seguridad

1. **Validación de Entrada**: Todos los datos de entrada son validados
2. **Autenticación**: Implementar JWT para producción
3. **Autorización**: Control de acceso basado en roles
4. **CORS**: Configurado para desarrollo y producción
5. **Variables de Entorno**: Credenciales sensibles en archivos .env

## Persistencia de Datos

### Frontend (localStorage)
- **Resultados de Optimización**: Guardados automáticamente en localStorage
- **Timestamp de Ejecución**: Registro de última ejecución
- **Hook Personalizado**: useLocalStorage para gestión elegante
- **Recuperación Automática**: Carga de resultados al montar componentes

### Estructura de Datos Persistidos
```typescript
// Resultados de optimización
watsonOptimizationResults: {
  resultadoMezclas: Array<any>,
  resultadoAdicionalGasolinas: Array<any>,
  runId: string,
  status: string,
  message: string
}

// Timestamp de última ejecución
watsonOptimizationTime: string // Formato: DD/MM/YYYY, HH:MM:SS
```

## Monitoreo y Logging

- **Logs de Aplicación**: NestJS Logger
- **Métricas de API**: Swagger UI
- **Errores**: Interceptores de errores globales
- **Performance**: Métricas de optimización

## Escalabilidad

- **Base de Datos**: Migrar a PostgreSQL para producción
- **Caché**: Implementar Redis para optimización
- **Load Balancing**: Configurar múltiples instancias
- **CDN**: Servir assets estáticos desde CDN
- **Persistencia Local**: localStorage para resultados de optimización
- **Gestión de Estado**: Custom hooks para estado persistente 