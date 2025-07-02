# Guía de Usuario - EnergíaFina S.A.

## Introducción

El Sistema de Optimización de Producción de EnergíaFina S.A. es una aplicación web que permite optimizar la mezcla de aceites crudos para maximizar el beneficio en la producción de diferentes tipos de gasolina.

## Acceso al Sistema

1. Abre tu navegador web
2. Ve a `http://localhost:3000`
3. El sistema se cargará automáticamente

## Navegación

### Dashboard
- **Vista General**: Estadísticas del sistema y estado actual
- **Acciones Rápidas**: Enlaces directos a las funciones principales
- **Estado del Sistema**: Indicadores de configuración y validación

### Gestión de Aceites Crudos
- **Ver Aceites**: Lista de todos los aceites disponibles
- **Agregar Aceite**: Crear nuevo aceite con sus características
- **Editar Aceite**: Modificar propiedades de aceites existentes
- **Eliminar Aceite**: Remover aceites del sistema

### Gestión de Tipos de Gasolina
- **Ver Gasolinas**: Lista de todos los tipos de gasolina
- **Agregar Gasolina**: Crear nuevo tipo de gasolina
- **Editar Gasolina**: Modificar propiedades de gasolinas existentes
- **Eliminar Gasolina**: Remover tipos de gasolina del sistema

### Parámetros del Modelo
- **Configurar Parámetros**: Ajustar variables del modelo de optimización
- **Valores por Defecto**: Restaurar configuración inicial

### Optimización
- **Ejecutar Optimización**: Procesar el modelo de optimización
- **Ver Resultados**: Analizar asignaciones y métricas

## Gestión de Aceites Crudos

### Agregar Nuevo Aceite

1. Ve a la sección "Aceites Crudos"
2. Haz clic en "Agregar Aceite"
3. Completa los campos:
   - **Nombre**: Nombre descriptivo del aceite
   - **Octanaje (RON)**: Valor entre 0-120
   - **Plomo (mg/L)**: Contenido de plomo entre 0-1000
   - **Costo (USD/L)**: Precio por litro
   - **Capacidad (L)**: Cantidad disponible
4. Haz clic en "Crear"

### Editar Aceite

1. En la lista de aceites, haz clic en el ícono de editar
2. Modifica los campos necesarios
3. Haz clic en "Actualizar"

### Eliminar Aceite

1. En la lista de aceites, haz clic en el ícono de eliminar
2. Confirma la eliminación

## Gestión de Tipos de Gasolina

### Agregar Nueva Gasolina

1. Ve a la sección "Tipos de Gasolina"
2. Haz clic en "Agregar Gasolina"
3. Completa los campos:
   - **Nombre**: Tipo de gasolina (ej: Súper, Regular, Diésel)
   - **Demanda (L)**: Cantidad requerida por el mercado
   - **Precio (USD/L)**: Precio de venta por litro
   - **Octanaje Mínimo (RON)**: Valor mínimo requerido
   - **Plomo Máximo (mg/L)**: Contenido máximo permitido
4. Haz clic en "Crear"

### Editar Gasolina

1. En la lista de gasolinas, haz clic en el ícono de editar
2. Modifica los campos necesarios
3. Haz clic en "Actualizar"

### Eliminar Gasolina

1. En la lista de gasolinas, haz clic en el ícono de eliminar
2. Confirma la eliminación

## Configuración de Parámetros

### Parámetros del Modelo

1. Ve a la sección "Parámetros"
2. Ajusta los valores:
   - **Costo Fijo por Litro**: Costo adicional de producción
   - **Producción Máxima Total**: Límite total de producción
   - **Penalización por Producción Extra**: Factor de penalización
   - **Permitir Producción Extra**: Habilitar/deshabilitar excedentes
3. Haz clic en "Guardar Parámetros"

## Ejecutar Optimización

### Preparación

1. Asegúrate de tener:
   - Al menos un aceite crudo configurado
   - Al menos un tipo de gasolina definido
   - Parámetros del modelo configurados
2. Verifica que no haya errores en el Dashboard

### Ejecución

1. Ve a la sección "Optimización"
2. Haz clic en "Ejecutar Optimización"
3. Espera a que se complete el procesamiento
4. Revisa los resultados

## Interpretación de Resultados

### Métricas Principales

- **Ingreso Total**: Ingresos por venta de gasolinas
- **Costo Total**: Costos de producción (aceites + fijos)
- **Beneficio Neto**: Diferencia entre ingresos y costos
- **Excedentes**: Producción adicional a la demanda

### Tabla de Asignaciones

Muestra cuántos litros de cada aceite se asignan a cada tipo de gasolina:
- **Aceite**: Nombre del aceite crudo
- **Gasolina**: Tipo de gasolina
- **Litros Asignados**: Cantidad asignada

### Tabla de Producción

Detalla la producción por tipo de gasolina:
- **Demanda**: Cantidad requerida
- **Producido**: Cantidad realmente producida
- **Excedente**: Producción adicional (si aplica)
- **Cumplimiento**: Porcentaje de satisfacción de demanda

## Validación del Sistema

### Verificación Automática

El sistema valida automáticamente:
- Existencia de datos mínimos
- Compatibilidad entre aceites y gasolinas
- Configuración de parámetros

### Errores Comunes

- **Sin aceites disponibles**: Agregar al menos un aceite
- **Sin gasolinas definidas**: Crear al menos un tipo de gasolina
- **Aceites incompatibles**: Verificar requisitos de calidad
- **Parámetros no configurados**: Configurar parámetros del modelo

## Consejos de Uso

### Para Mejores Resultados

1. **Datos Precisos**: Ingresa valores reales y actualizados
2. **Revisión Regular**: Actualiza datos según cambios en el mercado
3. **Análisis de Resultados**: Interpreta las métricas para tomar decisiones
4. **Validación**: Verifica que los resultados sean lógicos

### Optimización Continua

1. **Monitoreo**: Revisa regularmente el estado del sistema
2. **Ajustes**: Modifica parámetros según necesidades
3. **Comparación**: Ejecuta múltiples optimizaciones para comparar
4. **Documentación**: Mantén registro de cambios y resultados

## Solución de Problemas

### El Sistema No Inicia

1. Verifica que el backend esté ejecutándose en puerto 3001
2. Verifica que el frontend esté ejecutándose en puerto 3000
3. Revisa los logs de error en la consola

### Errores de Optimización

1. Verifica que todos los datos estén completos
2. Revisa la compatibilidad entre aceites y gasolinas
3. Ajusta los parámetros del modelo
4. Consulta la documentación técnica

### Problemas de Rendimiento

1. Reduce la cantidad de datos si es necesario
2. Optimiza los parámetros del modelo
3. Considera actualizar la configuración del servidor

## Soporte Técnico

Para problemas técnicos o consultas:
- Revisa la documentación técnica
- Consulta los logs del sistema
- Contacta al equipo de desarrollo

## Glosario

- **Aceite Crudo**: Materia prima para la producción de gasolinas
- **Octanaje (RON)**: Medida de la calidad de la gasolina
- **Plomo**: Contaminante regulado en combustibles
- **Demanda**: Cantidad requerida por el mercado
- **Optimización**: Proceso de maximizar beneficios
- **Excedente**: Producción adicional a la demanda
- **Penalización**: Costo adicional por excedentes 