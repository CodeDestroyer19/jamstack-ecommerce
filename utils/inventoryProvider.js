import inventory from "./inventory"

/*
Inventory items should adhere to the following schema:
type Product {
  id: ID!
  categories: [String]!
  price: Float!
  name: String!
  image: String!
  description: String!
  currentInventory: Int!
  brand: String
  sku: ID
}
*/

async function fetchInventory(Origin) {
  console.log(Origin)

  const inventory = await fetch(Origin + "api/prices/getPrices", {
    method: "GET",
  }).then((result) => result.json())

  return Promise.resolve(inventory.result)
}

export { fetchInventory, inventory as staticInventory }
