export class Shop {
    /**
     * Suggests the next low-tier item based on the provided current item ID.
     *
     */
    private suggestLowTierItem(itemId: string): string {
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
     */
    private suggestHighTierItem(itemId: string): string {
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

    suggestEquipToBuy(gold: number, currentTurn: number, lastItemSuggestion: string): string {
        if (gold < 300 && currentTurn < 40) {
            return this.suggestLowTierItem(lastItemSuggestion);
        }
        return this.suggestHighTierItem(lastItemSuggestion);
    }
}
