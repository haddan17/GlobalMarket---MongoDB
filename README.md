# Proyecto GlobalMarket - MongoDB

## Grupo:
- [V-25.933.680 Alburquerque Sheen]
- [V-31.818.222 Valencia Haddan]
- [V-31.445.710 Longart Daniela]

## Requisitos
- MongoDB Atlas (Cluster M0)
- MongoDB Compass
- Dataset: Global Superstore (modificado)

## Descripción
Migración de datos de ventas a MongoDB Atlas con pipelines de agregación, validación de esquema y optimización con índices.

## Estructura del Proyecto

### 1. Modelado y Validación
- Esquema embebido en `sales_transformed`
- Validación JSON Schema aplicada

### 2. Pipelines de Agregación
1. **Reporte de ventas por categoría y mes**
2. **Top productos mejor calificados** (con reseñas simuladas)
3. **Bucket por rangos de precio**

### 3. Búsqueda y Rendimiento
- Índice de texto para búsqueda en `product.name`
- Índices tradicionales para optimización
- Explain Plan comparativo

## Archivos
- `validation.js` → Aplica validación JSON Schema
- `queries.js` → 3 pipelines de agregación
- `indexes.js` → Crea índices de texto y tradicionales

## Cómo ejecutar
1. Conectar a MongoDB Atlas desde MongoDB Compass o Shell
2. Ejecutar en orden:
load("scripts/validation.js")
load("scripts/indexes.js")
load("scripts/queries.js")

## Resultados esperados
1. Validación activa en `sales_transformed`
2. Índices creados para búsqueda y optimización
3. Reportes de ventas, top productos y rangos de precio

## Tecnologías
- MongoDB Atlas (M0)
- MongoDB Compass
- Aggregation Framework
- Atlas Search (configurado)

## Dashboard de Ventas - Análisis Visual
6 Gráficos Principales del Dashboard:
- 1. Ventas por País
Tipo: Gráfico de barras (arriba izquierda)

Muestra: Ranking de ventas totales por país

Destacado: Estados Unidos lidera con más de 2,400,000

- 2. Cantidad por Ganancias
Tipo: Gráfico de rosquilla (arriba centro)

Muestra: Distribución de ganancias por rangos

Insight: Rangos medios (300-450) son los más frecuentes

- 3. Productos Vendidos
Tipo: Gráfico horizontal (arriba derecha)

Muestra: Comparación entre cantidad de ventas y productos distintos

Normalizado: 0-100%

- 4. Ventas Totales
Tipo: KPI (abajo izquierda)

Valor: $12,642,501.91

- 5. Productos por Fecha
Tipo: Gráfico lineal (abajo centro)

Muestra: Número de pedidos por fecha

Patrón: Curva descendente por ranking

- 6. Producto por País
Tipo: Mapa mundial de calor (abajo derecha)

Muestra: Cantidad de productos vendidos por país

Destacado: EE.UU. con ~9000 productos
