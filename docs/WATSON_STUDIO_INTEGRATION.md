# Integración con IBM Watson Studio

## Descripción General

La aplicación de optimización de producción de gasolinas utiliza **IBM Watson Studio** como motor de optimización, implementando un modelo de **programación lineal** escrito en **OPL (Optimization Programming Language)**. La integración incluye persistencia automática de resultados en el navegador para mejorar la experiencia del usuario.

## Arquitectura de la Integración

### 1. Flujo de Datos

```
Frontend (React) → Backend (NestJS) → IBM Cloud Object Storage → Watson Studio → Resultados
```

### 2. Componentes Principales

#### Backend Services
- **`WatsonDataService`**: Maneja la comunicación con Watson Studio y Cloud Object Storage
- **`CosService`**: Gestiona la lectura/escritura de archivos CSV en IBM COS
- **`OptimizacionService`**: Coordina la ejecución de optimizaciones

#### Frontend Services
- **`optimizacionService`**: Interfaz para consumir los endpoints de optimización
- **`useLocalStorage`**: Hook personalizado para persistencia de resultados
- **`OptimizacionPage`**: Componente con gestión automática de resultados guardados

## Modelo OPL Implementado

### Estructura del Modelo

El modelo de optimización está basado en el siguiente problema de programación lineal:

#### Variables de Decisión
- `a[g]`: Cantidad adicional de gasolina g a producir
- `Blend[o][g]`: Cantidad de aceite o a mezclar en gasolina g

#### Función Objetivo
```
maximize
  sum(g in Gasolines, o in Oils)
    (g.price - o.price - ProdCostParam.ProdCost) * Blend[o][g]
  - sum(g in Gasolines) a[g];
```

#### Restricciones Principales

1. **Demanda**: `sum(o in Oils) Blend[o][g] == g.demand + 10 * a[g]`
2. **Capacidad**: `sum(g in Gasolines) Blend[o][g] <= o.capacity`
3. **Producción Máxima**: `sum(o in Oils, g in Gasolines) Blend[o][g] <= MaxProdParam.MaxProduction`
4. **Octanaje**: `sum(o in Oils) (o.octane - g.octane) * Blend[o][g] >= 0`
5. **Plomo**: `sum(o in Oils) (o.lead - g.lead) * Blend[o][g] <= 0`

### Datos de Entrada

#### Tuplas de Gasolinas
```opl
{gasTuple} Gasolines = {
  <"Gasolina Regular", 5000, 2.50, 87, 0.1>,
  <"Gasolina Premium", 3000, 3.00, 91, 0.05>
};
```

#### Tuplas de Aceites
```opl
{oilTuple} Oils = {
  <"Aceite A", 4000, 1.80, 90, 0.08>,
  <"Aceite B", 3500, 2.00, 92, 0.03>
};
```

#### Parámetros
```opl
maxProductionParam MaxProdParam = <14000>;
prodCostParam ProdCostParam = <4>;
```

## Implementación Técnica

### 1. Generación Dinámica del Modelo OPL

El servicio `WatsonDataService` genera dinámicamente el modelo OPL basado en los datos actuales:

```typescript
private crearModeloOPL(aceites: any[], gasolinas: any[], parametrosCosto: any[], parametrosMaxima: any[]): string {
  // Crear datos para el modelo OPL
  const gasolinesData = gasolinas.map(g => 
    `  <"${g.nombre}", ${g.demanda}, ${g.precio}, ${g.octanajeMinimo}, ${g.plomoMaximo}>`
  ).join(',\n');

  const oilsData = aceites.map(o => 
    `  <"${o.nombre}", ${o.capacidad}, ${o.costo}, ${o.octanaje}, ${o.plomo}>`
  ).join(',\n');

  // Retornar modelo OPL completo
  return `...`;
}
```

### 2. Ejecución en Watson Studio

```typescript
async ejecutarOptimizacionReal(): Promise<OptimizacionResponse> {
  // 1. Obtener datos actualizados
  const [aceites, gasolinas, parametrosCosto, parametrosMaxima] = await Promise.all([
    this.getAceites(),
    this.getGasolinas(),
    this.getParametrosCosto(),
    this.getParametrosMaxima(),
  ]);

  // 2. Crear modelo OPL
  const modeloOPL = this.crearModeloOPL(aceites, gasolinas, parametrosCosto, parametrosMaxima);
  
  // 3. Ejecutar optimización
  const resultado = await this.ejecutarOptimizacionWatson(modeloOPL);
  
  return resultado;
}
```

### 3. Hook Personalizado para Persistencia

```typescript
// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error al establecer localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al eliminar localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}
```

### 3. Procesamiento de Resultados

Los resultados del modelo OPL se procesan para generar:

- **Asignaciones**: Variables `Blend[o][g]`
- **Producción**: Variables `a[g]` y métricas de cumplimiento
- **Métricas**: Ingresos, costos, beneficios y excedentes

## Endpoints de la API

### Optimización
- `POST /optimizacion/ejecutar`: Ejecuta optimización con Watson Studio
- `GET /optimizacion/datos`: Obtiene datos para optimización
- `GET /optimizacion/resultados`: Obtiene resultados de optimización
- `GET /optimizacion/test-conexion`: Prueba conexión con Watson Studio
- `GET /optimizacion/watson`: Ejecuta optimización real en Watson Studio con persistencia

### Jobs
- `POST /jobs/launch`: Lanza job de optimización
- `GET /jobs/status/:jobId`: Consulta estado del job
- `GET /jobs/results/:jobId`: Obtiene resultados del job
- `GET /jobs/download/:assetId`: Descarga resultados en CSV

## Configuración Requerida

### Variables de Entorno
```env
# IBM Cloud Object Storage
COS_ENDPOINT=your-cos-endpoint
COS_API_KEY=your-cos-api-key
COS_BUCKET=your-bucket-name

# Watson Studio (para implementación completa)
WATSON_STUDIO_API_KEY=your-watson-api-key
WATSON_STUDIO_PROJECT_ID=your-project-id
WATSON_STUDIO_URL=your-watson-studio-url
```

### Archivos CSV en Cloud Object Storage
- `Oils.csv`: Datos de aceites
- `Gasolines.csv`: Datos de gasolinas
- `ProdCostParam.csv`: Parámetros de costo
- `MaxProdParam.csv`: Parámetros de producción máxima

## Ventajas de la Integración

### 1. Escalabilidad
- Watson Studio puede manejar problemas de optimización complejos
- Procesamiento distribuido en la nube

### 2. Flexibilidad
- Modelo OPL permite modificar fácilmente restricciones y objetivos
- Datos dinámicos desde Cloud Object Storage

### 3. Confiabilidad
- Motor de optimización probado (CPLEX)
- Resultados consistentes y reproducibles

### 4. Integración
- Datos centralizados en IBM Cloud
- API REST para comunicación
- Persistencia local de resultados para mejor UX

## Próximos Pasos

### Implementación Completa
Para una integración completa con Watson Studio, se requiere:

1. **Configurar Watson Studio API**
   - Autenticación con API Key
   - Crear proyecto y assets
   - Configurar jobs de optimización

2. **Implementar Ejecución Real**
   - Enviar modelo OPL a Watson Studio
   - Ejecutar job de optimización
   - Recuperar resultados

3. **Manejo de Estados**
   - Monitorear progreso del job
   - Manejar errores y timeouts
   - Cachear resultados
   - Persistir resultados en localStorage

## Persistencia de Resultados

### Funcionalidades Implementadas
- **Guardado Automático**: Los resultados se guardan automáticamente en localStorage
- **Carga Automática**: Al volver a la página, se muestran los resultados de la última ejecución
- **Indicadores Visuales**: Información de última ejecución y estado de persistencia
- **Gestión de Datos**: Hook personalizado `useLocalStorage` para manejo elegante

### Estructura de Datos Persistidos
```typescript
// Resultados de optimización de Watson Studio
watsonOptimizationResults: {
  resultadoMezclas: Array<any>,           // Mezclas óptimas
  resultadoAdicionalGasolinas: Array<any>, // Producción adicional
  runId: string,                          // ID de ejecución en Watson
  status: string,                         // Estado de la ejecución
  message: string                         // Mensaje descriptivo
}

// Timestamp de última ejecución
watsonOptimizationTime: string // Formato: DD/MM/YYYY, HH:MM:SS
```

### Beneficios de la Persistencia
- **Mejor UX**: No es necesario re-ejecutar la optimización al cambiar de pestaña
- **Eficiencia**: Ahorro de tiempo y recursos de Watson Studio
- **Conveniencia**: Acceso inmediato a resultados históricos
- **Control**: Opción de limpiar resultados guardados cuando sea necesario

### Mejoras Futuras
- **Optimización Multi-objetivo**: Considerar múltiples objetivos
- **Análisis de Sensibilidad**: Evaluar impacto de cambios en parámetros
- **Optimización Estocástica**: Incluir incertidumbre en demanda
- **Interfaz Avanzada**: Visualización de resultados con gráficos
- **Historial de Ejecuciones**: Mantener múltiples resultados históricos

## Referencias

- [IBM Watson Studio Documentation](https://dataplatform.cloud.ibm.com/docs/)
- [OPL Language Reference](https://www.ibm.com/docs/en/icos/22.1.0)
- [CPLEX Optimization Studio](https://www.ibm.com/products/ilog-cplex-optimization-studio) 