import {ShopItem} from "./../models/shopItem.js";

export class Shop {
    /**
     * Parses the JSON array of shop items and converts it into a List of ShopItem objects.
     * @param {string} json The JSON string containing the shop items.
     * @returns {Array} List of ShopItem objects parsed from the JSON.
     * @throws {Error} If the JSON cannot be parsed or does not contain the expected structure.
     */
    parseShopItems(json) {
        const items = [];
        let itemArray;

        try {
            itemArray = JSON.parse(json);
        } catch (error) {
            throw new Error("Invalid JSON format: " + json);
        }

        itemArray.forEach((element) => {
            const item = this.getShopItem(element);
            items.push(item);
        });
        return items;
    }

    /**
     * Extracts and constructs a ShopItem from the given JSON element.
     * @param {object} element A JSON object that represents a single shop item.
     * @returns {ShopItem} A ShopItem object populated with the data from the JSON element.
     * @throws {Error} If the JSON element does not contain the required fields: id, name, or cost.
     */
    getShopItem(element) {
        if (!element.id || !element.name || element.cost === undefined) {
            throw new Error("Missing one of the required fields: id, name, cost");
        }

        const item = new ShopItem();
        item.id = element.id;
        item.name = element.name;
        item.cost = element.cost;
        return item;
    }


    /**
     * Suggests the next low-tier item based on the provided current item ID.
     *
     * @param {string} itemId - The current item object that contains the ID.
     * @returns {string} The ID of the suggested low-tier item. Returns "cs"
     *                  if the current item's ID does not match any known items.
     */
    suggestLowTierItem(itemId) {
        switch (itemId) {
            case "cs":
                return "gas";
            case "gas":
                return "wax";
            case "wax":
                return "tricks";
            case "tricks":
                return "wingpot";
            default:
                return "cs";
        }
    }

    /**
     * Suggests the next high-tier item based on the provided current item ID.
     *
     * @param {string} itemId - The current item object that contains the ID.
     * @returns {string} The ID of the suggested high-tier item. Returns "ch"
     *                  if the current item's ID does not match any known items.
     */
    suggestHighTierItem(itemId) {
        switch (itemId) {
            case "ch":
                return "rf";
            case "rf":
                return "iron";
            case "iron":
                return "mtrix";
            case "mtrix":
                return "wingpotmax";
            default:
                return "ch";
        }
    }

}
