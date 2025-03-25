import {Api} from "../resource/api.js";
import {Shop} from "./shop";
import {Quest} from "./quest";
import {askToContinue, endGameMessage} from "./interactions";
import {QuestModel, ShopItem, GameData, SolveResult} from '../models/models.js';

export class Game {
    private lives: number;
    private score: number;
    private gold: number;
    private level: number;
    private gameId: string;
    private turn: number;
    private api: Api;
    private shop: Shop;
    private quest: Quest;
    private lastItemSuggestion: string;
    private name: string;
    private buysInRow: number;
    private readonly userInput: any;

    constructor(userInput: any) {
        this.lives = 0;
        this.score = 0;
        this.gold = 0;
        this.level = 0;
        this.gameId = '';
        this.turn = 0;
        this.api = new Api();
        this.shop = new Shop();
        this.quest = new Quest();
        this.lastItemSuggestion = '';
        this.name = '';
        this.buysInRow = 0;
        this.userInput = userInput;
    }

    async start(gameData: GameData, playerName: string): Promise<void> {
        this.gameId = gameData.gameId;
        this.lives = gameData.lives;
        this.score = gameData.score;
        this.gold = gameData.gold;
        this.level = gameData.level;
        this.turn = gameData.turn;
        this.name = playerName;
        this.buysInRow = 0;

        console.log('Game has been started, good luck! ❤️');

        const items: ShopItem[] = await this.api.getShopItems(this.gameId);

        while (this.lives > 0) {
            if (this.turn % 1000 === 0 && this.turn > 999) {
                const continueGame = await askToContinue(this.userInput);
                if (!continueGame) break;
            }

            try {
                if (this.buysInRow < 10) {
                    await this.doTheShopTurn(items);
                    if (this.gold > 350) continue;
                }
                this.buysInRow = 0;

                try {
                    await this.doTheQuestTurn();
                } catch (error: any) {
                    console.log("Error while trying to do the quest: " + (String(error)));
                    break;
                }
            } catch (error: any) {
                console.log("Error during game process: " + (String(error)));
                break;
            }
        }

        endGameMessage(this.score, this.gold);
    }

    async doTheQuestTurn(): Promise<void> {
        const quests: QuestModel[] = await this.api.getTheQuestBoard(this.gameId);
        quests.map(quest => this.quest.decodeQuestData(quest));
        const questToComplete = this.quest.getOptimalQuest(quests);
        const solveResult: SolveResult = await this.api.postSolveQuest(this.gameId, questToComplete.adId);

        this.lives = solveResult.lives;
        this.score = solveResult.score;
        this.gold = solveResult.gold;
        this.turn = solveResult.turn;

        if (solveResult.message.toLowerCase().includes("failed")) {
            console.log(`Turn ${this.turn}: ${solveResult.message} ${this.lives} lives left.`);
        } else {
            console.log(`Turn ${this.turn}: ${solveResult.message}`);
        }
    }

    async doTheShopTurn(items: ShopItem[]): Promise<void> {
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

                let equipId = this.shop.suggestEquipToBuy(this.gold, this.turn, this.lastItemSuggestion);
                if (item.id === equipId) {
                    let response = await this.api.postItemBuy(this.gameId, item.id);
                    this.shoppingMessage(item.name, response);
                    this.lastItemSuggestion = item.id;
                    break;
                }
            }
        }
    }

    shoppingMessage(itemName: string, shoppingData: any): void {
        this.gold = shoppingData.gold;
        this.turn = shoppingData.turn;
        this.lives = shoppingData.lives;

        if (shoppingData.shoppingSuccess) {
            if (shoppingData.level > this.level) {
                this.level = shoppingData.level;
                this.buysInRow += 1;
                console.log(`Turn ${this.turn}: ${this.name} got level ${this.level} with ${itemName}!`);
            } else {
                console.log(`Turn ${this.turn}: Successfully bought the ${itemName}`);
            }
        } else {
            console.log(`Turn ${this.turn}: Failed to buy ${itemName}`);
        }
    }
}
