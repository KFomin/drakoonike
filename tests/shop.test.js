import {Shop} from "./../service/shop.js";
import {ShopItem} from "./../models/shopItem";

describe('Shop Class Tests 😊', () => {
    let shop;

    // Before each test, we create a new instance of the Shop class.
    beforeEach(() => {
        shop = new Shop();
    });

    describe('Testing parseShopItems Method 📦', () => {
        it('should successfully parse valid JSON and return an array of ShopItem objects ✔️', () => {
            const json = JSON.stringify([
                {id: "item1", name: "Item One", cost: 100},
                {id: "item2", name: "Item Two", cost: 150}
            ]);

            const items = shop.parseShopItems(json);
            expect(items).toHaveLength(2); // We expect to get 2 items back
            expect(items[0]).toBeInstanceOf(ShopItem); // Check that the first item is a ShopItem
            expect(items[0].id).toBe("item1");
            expect(items[0].name).toBe("Item One");
            expect(items[0].cost).toBe(100);
        });

        it('should throw an error when given invalid JSON ❌', () => {
            const invalidJson = 'invalid json';
            // Expecting an error if we pass invalid JSON
            expect(() => shop.parseShopItems(invalidJson)).toThrow("Invalid JSON format:");
        });

        it('should throw an error if the parsed JSON lacks required fields ⚠️', () => {
            const json = JSON.stringify([{id: "item1", name: "Item One"}]); // Missing cost
            // Expecting an error for missing fields
            expect(() => shop.parseShopItems(json)).toThrow("Missing one of the required fields: id, name, cost");
        });
    });

    describe('Testing getShopItem Method 🔍', () => {
        it('should create a ShopItem from a valid JSON element ✔️', () => {
            const element = {id: "item1", name: "Item One", cost: 100};
            const item = shop.getShopItem(element);

            // Confirm the created item is a ShopItem and has the expected properties
            expect(item).toBeInstanceOf(ShopItem);
            expect(item.id).toBe("item1");
            expect(item.name).toBe("Item One");
            expect(item.cost).toBe(100);
        });

        it('should throw an error if the JSON element is missing required fields ⚠️', () => {
            const element = {id: "item1", name: "Item One"}; // Missing cost
            // Expecting an error for missing required fields
            expect(() => shop.getShopItem(element)).toThrow("Missing one of the required fields: id, name, cost");
        });
    });

    describe('Testing suggestLowTierItem Method 💡', () => {
        it('should suggest the appropriate low-tier items based on input 🌟', () => {
            expect(shop.suggestLowTierItem({id: "cs"})).toBe("gas");
            expect(shop.suggestLowTierItem({id: "gas"})).toBe("wax");
            expect(shop.suggestLowTierItem({id: "wax"})).toBe("tricks");
            expect(shop.suggestLowTierItem({id: "tricks"})).toBe("wingpot");
            // Default case for unknown items
            expect(shop.suggestLowTierItem({id: "unknown"})).toBe("cs");
        });
    });

    describe('Testing suggestHighTierItem Method 🌠', () => {
        it('should suggest the appropriate high-tier items based on input 🚀', () => {
            expect(shop.suggestHighTierItem({id: "ch"})).toBe("rf");
            expect(shop.suggestHighTierItem({id: "rf"})).toBe("iron");
            expect(shop.suggestHighTierItem({id: "iron"})).toBe("mtrix");
            expect(shop.suggestHighTierItem({id: "mtrix"})).toBe("wingpotmax");
            // Default case for unknown items
            expect(shop.suggestHighTierItem({id: "unknown"})).toBe("ch");
        });
    });
});
