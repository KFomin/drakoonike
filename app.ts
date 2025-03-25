import {Api} from "./resource/api";
import {Game} from "./service/game";
import * as readline from "node:readline";
import {stdout, stdin} from "node:process";
import {askDragonName, askToPlayAgain, welcomeMessage} from "./service/interactions";

/**
 * Main class to manage the game's flow and user interactions.
 */
class Main {
    private api: Api = new Api();
    private userInput: readline.Interface = readline.createInterface({
        input: stdin,
        output: stdout,
    });

    /**
     * Starts the main game loop, asking for the dragon's name and managing gameplay.
     */
    async start(): Promise<void> {
        let wantToPlay = true;
        while (wantToPlay) {
            try {
                const gameData = await this.api.postStartTheGame();
                let dragonName: string;

                do {
                    dragonName = await askDragonName(this.userInput);
                    if (!dragonName.trim()) {
                        console.log("Dragon name cannot be empty! Please enter a valid name.");
                    }
                } while (!dragonName.trim());

                welcomeMessage();

                const game = new Game(this.userInput);
                await game.start(gameData, dragonName);

                wantToPlay = await askToPlayAgain(this.userInput);
            } catch (error) {
                console.log(`Failed to start the game! Error: ${String(error)}`);
            }
        }
        console.log("Thank you for playing!");
    }
}

const main = new Main();
main.start().then(() => process.exit(1));
