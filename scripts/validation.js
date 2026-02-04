// validation.js
// Schema Validation para la colección sales_transformed

db = db.getSiblingDB('globalmarket_db');

print(" Aplicando validación de esquema en sales_transformed...");

db.runCommand({
  collMod: "sales_transformed",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["order_info", "customer", "product", "sales_data"],
      properties: {
        "sales_data.sales": {
          bsonType: "double",
          minimum: 0,
          description: "Sales must be a positive number"
        },
        "sales_data.profit": {
          bsonType: "double",
          description: "Profit must be a number (can be negative)"
        },
        "sales_data.quantity": {
          bsonType: "int",
          minimum: 1,
          description: "Quantity must be positive integer"
        },
        "sales_data.discount": {
          bsonType: "double",
          minimum: 0,
          maximum: 1,
          description: "Discount must be between 0 and 1"
        },
        "customer.customer_id": {
          bsonType: "string",
          description: "Customer ID is required"
        },
        "product.category": {
          bsonType: "string",
          enum: ["Technology", "Furniture", "Office Supplies"],
          description: "Category must be one of the allowed values"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

print("Validación aplicada exitosamente");
