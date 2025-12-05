// indexes.js
// Creación de índices para optimización

db = db.getSiblingDB('globalmarket_db');

print("Creando índices...");

// Índice de texto para búsqueda
db.sales_transformed.createIndex(
  { "product.name": "text" },
  { name: "text_product_name" }
);
print("Índice de texto creado: text_product_name");

// Índices tradicionales
db.sales_transformed.createIndex(
  { "product.category": 1, "order_info.order_date": 1 },
  { name: "idx_category_date" }
);
print("Índice compuesto creado: idx_category_date");

db.sales_transformed.createIndex(
  { "product.product_id": 1 },
  { name: "idx_product_id" }
);
print("Índice simple creado: idx_product_id");

db.sales_transformed.createIndex(
  { "sales_data.sales": 1, "sales_data.quantity": 1 },
  { name: "idx_sales_quantity" }
);
print("Índice compuesto creado: idx_sales_quantity");

print("Índices creados exitosamente");