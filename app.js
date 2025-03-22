import {Api} from "./resource/api.js";
import {Game} from "./service/game.js";
import * as readline from "node:readline";
import {stdout, stdin} from "node:process";
import {askDragonName, askToPlayAgain, welcomeMessage} from "./service/interactions.js";

/**
 * Main class to manage the game's flow and user interactions.
 */
class Main {
    /**
     * Initializes the Main class with API and readline for user input.
     */
    constructor() {
        this.api = new Api();
        this.userInput = readline.createInterface({
            input: stdin,
            output: stdout,
        });
    }

    /**
     * Starts the main game loop, asking for the dragon's name and managing gameplay.
     */
    async start() {
        let wantToPlay = true;
        while (wantToPlay) {
            const dragonName = await askDragonName(this.userInput);
            try {
                const gameData = await this.api.postStartTheGame();

                welcomeMessage();

                const game = new Game(this.userInput);

                // Here the game starts. :)
                await game.start(gameData, dragonName);
            } catch (error) {
                console.log(`Failed to start the game! Error: ${error.message}`);
            }

            if (wantToPlay) {
                wantToPlay = await askToPlayAgain(this.userInput);
            }
        }
        console.log("Thank you for playing!");
    }
}

// Create a Main instance and start it
const main = new Main();
main.start().then(() => process.exit(1));
