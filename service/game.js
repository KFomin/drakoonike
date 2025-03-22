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
        this.lastItemSuggestion = '';
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

        const shopJson = await this.api.getShopItems(this.gameId);
        const items = this.shop.parseShopItems(JSON.stringify(shopJson));

        while (this.lives > 0) {
            if (this.currentTurn % 1000 === 0 && this.currentTurn > 999) {
                const continue_ = await askToContinue(this.userInput);
                if (!continue_) break;
            }

            try {
                if (this.buysInRow < 10) {
                    await this.doTheShopTurn(items);
                    if (this.gold > 350) continue;
                }
                this.buysInRow = 0;

                try {
                    await this.doTheQuestTurn()
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

    async doTheQuestTurn() {
        const questsJson = await this.api.getTheQuestBoard(this.gameId);
        const quests = this.quest.parseQuests(JSON.stringify(questsJson));
        const questToComplete = this.quest.getOptimalQuest(quests);
        const solveJson = await this.api.postSolveQuest(this.gameId, questToComplete.adId).then(res => JSON.stringify(res));
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
    }

    async doTheShopTurn(items) {
        for (let item of items) {
            if (item.id === "hpot" && this.lives > 2) {
                continue;
            }

            if (this.gold >= item.cost) {

                if (item.id === "hpot") {
                    let response = await this.api.postItemBuy(this.gameId, item.id);
                    this.shoppingMessage(item.name, response);
                    break;
                }

                let equipId = this.suggestEquipToBuy(this.gold, this.currentTurn, this.lastItemSuggestion);

                if (item.id === equipId) {
                    let response = await this.api.postItemBuy(this.gameId, item.id);
                    this.shoppingMessage(item.name, response);
                    this.lastItemSuggestion = item.id;
                    break;
                }
            }
        }
    }

    suggestEquipToBuy(gold, currentTurn, lastItemSuggestion) {
        if (gold < 300 && currentTurn < 40) {
            return this.shop.suggestLowTierItem(lastItemSuggestion)
        }
        return this.shop.suggestHighTierItem(lastItemSuggestion)
    }

    shoppingMessage(itemName, shoppingData) {
        this.gold = shoppingData.gold;
        this.currentTurn = shoppingData.turn;
        this.lives = shoppingData.lives;

        if (shoppingData.shoppingSuccess) {
            if (shoppingData.level > this.level) {
                this.level = shoppingData.level;
                this.buysInRow += 1;
                console.log(`Turn ${this.currentTurn}: ${this.name} got level ${this.level} with ${itemName}`);
            } else {
                console.log(`Turn ${this.currentTurn}: Successfully bought the ${itemName}`);
            }
        } else {
            console.log(`Turn ${this.currentTurn}: Failed to buy ${itemName}`);
        }
    }
}
