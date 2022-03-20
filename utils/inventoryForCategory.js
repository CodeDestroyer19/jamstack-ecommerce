import { fetchInventory } from './inventoryProvider'
import { inventoryByCategory } from './inventoryByCategory'

async function inventoryForCategory (category) {
  const inventory = await fetchInventory("http://localhost:3000/")
  const byCategory = inventoryByCategory(inventory)
  return byCategory[category].items
}

export default inventoryForCategory