// queries.js
// 3 Pipelines de Agregación para GlobalMarket

db = db.getSiblingDB('globalmarket_db');

// ==================== PIPELINE 1 ====================
print(" Pipeline 1: Reporte de ventas por categoría y mes");
const ventasPorCategoriaMes = [
  {
    $match: {
      "sales_data.sales": { $gt: 0 },
      "product.category": { $exists: true }
    }
  },
  {
    $addFields: {
      order_month: {
        $dateToString: {
          format: "%Y-%m",
          date: {
            $dateFromString: {
              dateString: "$order_info.order_date",
              format: "%d-%m-%Y"
            }
          }
        }
      }
    }
  },
  {
    $group: {
      _id: {
        category: "$product.category",
        month: "$order_month"
      },
      total_sales: { $sum: "$sales_data.sales" },
      total_orders: { $sum: 1 },
      avg_profit: { $avg: "$sales_data.profit" }
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id.category",
      month: "$_id.month",
      total_sales: 1,
      total_orders: 1,
      avg_profit: 1,
      sales_per_order: { $divide: ["$total_sales", "$total_orders"] }
    }
  },
  { $sort: { month: 1, total_sales: -1 } }
];

const resultado1 = db.sales_transformed.aggregate(ventasPorCategoriaMes).toArray();
printjson(resultado1.slice(0, 3)); // Muestra primeros 3
print("----------------------------------------");

// ==================== PIPELINE 2 ====================
print(" Pipeline 2: Top productos mejor calificados (simulado)");
const topProductos = [
  {
    $addFields: {
      rating: { $add: [{ $floor: { $multiply: [{ $rand: {} }, 5] } }, 1] },
      factor_resenas: 10
    }
  },
  {
    $group: {
      _id: "$product.product_id",
      nombre: { $first: "$product.name" },
      categoria: { $first: "$product.category" },
      total_resenas: { $sum: "$factor_resenas" },
      calificacion_promedio: { $avg: "$rating" }
    }
  },
  { $match: { total_resenas: { $gt: 50 } } },
  { $sort: { calificacion_promedio: -1 } },
  {
    $project: {
      _id: 0,
      producto_id: "$_id",
      nombre_producto: "$nombre",
      categoria: "$categoria",
      total_resenas: 1,
      calificacion_promedio: { $round: ["$calificacion_promedio", 2] }
    }
  },
  { $limit: 5 }
];

const resultado2 = db.sales_transformed.aggregate(topProductos).toArray();
printjson(resultado2);
print("----------------------------------------");

// ==================== PIPELINE 3 ====================
print(" Pipeline 3: Productos por rango de precio (Bucket)");
const bucketPrecios = [
  {
    $addFields: {
      precio_unitario: {
        $cond: {
          if: { $gt: ["$sales_data.quantity", 0] },
          then: { $divide: ["$sales_data.sales", "$sales_data.quantity"] },
          else: 0
        }
      }
    }
  },
  {
    $bucket: {
      groupBy: "$precio_unitario",
      boundaries: [0, 50, 200, 1000],
      default: "Fuera de rango",
      output: {
        count: { $sum: 1 },
        precio_promedio: { $avg: "$precio_unitario" }
      }
    }
  },
  {
    $project: {
      _id: 0,
      rango: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id", "Fuera de rango"] }, then: "Fuera de rango" },
            { case: { $lt: ["$_id", 50] }, then: "Bajo" },
            { case: { $lt: ["$_id", 200] }, then: "Medio" },
            { case: { $gte: ["$_id", 200] }, then: "Alto" }
          ],
          default: "No clasificado"
        }
      },
      cantidad_productos: "$count",
      precio_promedio: { $round: ["$precio_promedio", 2] }
    }
  },
  { $sort: { rango: 1 } }
];

const resultado3 = db.sales_transformed.aggregate(bucketPrecios).toArray();
printjson(resultado3);
print("----------------------------------------");
print("Todos los pipelines ejecutados");
