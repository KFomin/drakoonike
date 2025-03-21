import {Api} from "./../resource/api.js";
import {Shop} from "./shop.js";
import {Quest} from "./quest.js";
import {askToContinue, endGameMessage} from "./interactions.js";

export class Game {
    constructor(userInput) {
        this.lives = 0;
        this.score = 0;
        this.gold = 0;
        this.level = 0;
        this.gameId = '';
        this.api = new Api();
        this.shop = new Shop();
        this.quest = new Quest();
        this.currentTurn = 0;
        this.lastItemSuggestion = null;
        this.name = '';
        this.buysInRow = 0;
        this.userInput = userInput;
    }


    async start(gameData, playerName) {
        this.gameId = gameData.gameId;
        this.lives = gameData.lives;
        this.score = gameData.score;
        this.gold = gameData.gold;
        this.level = gameData.level;
        this.currentTurn = gameData.turn;
        this.name = playerName;
        this.buysInRow = 0;

        console.log('Game has been started, good luck! ❤️');

        while (this.lives > 0) {
            if (this.currentTurn % 1000 === 0 && this.currentTurn > 999) {
                const continue_ = await askToContinue(this.userInput);
                if (continue_ && (continue_ === true)) break;
            }

            try {
                if (this.buysInRow < 20) {
                    await this.buyAnItem();
                    if (this.gold > 350) continue;
                }
                this.buysInRow = 0;

                const questsJson = await this.api.getTheQuestBoard(this.gameId);
                if (this.checkGameOver(questsJson)) break;

                const quests = this.quest.parseQuests(JSON.stringify(questsJson));
                const questToComplete = this.quest.getOptimalQuest(quests);
                try {
                    const solveJson = await this.api.postSolveQuest(this.gameId, questToComplete.adId).then(res => JSON.stringify(res));
                    if (this.checkGameOver(solveJson)) break;

                    const solveResponse = JSON.parse(solveJson);
                    this.lives = solveResponse.lives;
                    this.score = solveResponse.score;
                    this.gold = solveResponse.gold;
                    this.currentTurn = solveResponse.turn;
                    if (solveResponse.message.toLowerCase().includes("failed")) {
                        console.log(`Turn ${this.currentTurn}: ${solveResponse.message} ${this.lives} lives left.`);
                    } else {
                        console.log(`Turn ${this.currentTurn}: ${solveResponse.message}`);
                    }


                } catch (error) {
                    console.log("Error while trying to do the quest: " + error.message);
                    break;
                }

            } catch (error) {
                console.log("Error during game process: " + error.message);
                break;
            }
        }
        endGameMessage(this.score, this.gold);
    }


    async buyAnItem() {
        const shopJson = await this.api.getShopItems(this.gameId);
        if (this.checkGameOver(shopJson)) {
            endGameMessage(this.score, this.gold);
            return;
        }

        const items = this.shop.parseShopItems(JSON.stringify(shopJson));
        this.lastItemSuggestion = this.lastItemSuggestion ?? items[1];

        for (let item of items) {
            if (item.id === "hpot" && this.lives > 2) {
                continue;
            }

            if (this.gold >= item.cost) {
                let purchaseJson;

                if (item.id === "hpot") {
                    purchaseJson = await this.api.postItemBuy(this.gameId, item.id);
                }

                if (this.gold > 100 && this.currentTurn < 40 && item.id.includes(this.shop.suggestLowTierItem(this.lastItemSuggestion))) {
                    purchaseJson = await this.api.postItemBuy(this.gameId, item.id);
                    this.lastItemSuggestion = item;
                }

                if (this.gold > 300 && this.currentTurn > 39 && item.id.includes(this.shop.suggestHighTierItem(this.lastItemSuggestion))) {
                    purchaseJson = await this.api.postItemBuy(this.gameId, item.id);
                    this.lastItemSuggestion = item;
                }

                if (!purchaseJson) {
                    continue;
                }

                if (this.checkGameOver(purchaseJson)) {
                    break;
                }
                const purchaseResponse = JSON.parse(JSON.stringify(purchaseJson));
                this.gold = purchaseResponse.gold;
                this.currentTurn = purchaseResponse.turn;
                this.lives = purchaseResponse.lives;

                if (purchaseResponse.shoppingSuccess) {
                    if (purchaseResponse.level > this.level) {
                        this.level = purchaseResponse.level;
                        this.buysInRow += 1;
                        console.log(`Turn ${this.currentTurn}: ${this.name} got level ${this.level} with ${item.name}`);
                    } else {
                        console.log(`Turn ${this.currentTurn}: Successfully bought the ${item.name}`);
                    }
                } else {
                    console.log(`Turn ${this.currentTurn}: Failed to buy ${item.name}`);
                }

                break;
            }
        }
    }

    checkGameOver(jsonResponse) {
        if (typeof jsonResponse === 'string') {
            return jsonResponse.toLowerCase().includes("game over");
        }

        if (jsonResponse && jsonResponse.status) {
            return jsonResponse.status.toLowerCase() === "game over";
        }

        return false;
    }

}
