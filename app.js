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
        this.api = new Api(); // Create API instance
        this.userInput = readline.createInterface({
            input: stdin,  // User input from standard input
            output: stdout, // Output messages to standard output
        });
    }

    /**
     * Starts the main game loop, asking for the dragon's name and managing gameplay.
     */
    async start() {
        let wantToPlay = true; // Flag to continue playing
        while (wantToPlay) {
            const dragonName = await askDragonName(this.userInput); // Get dragon name
            await this.playGame(dragonName); // Start the game

            if (wantToPlay) {
                wantToPlay = await askToPlayAgain(this.userInput); // Ask to play again
            }
        }
        console.log("Thank you for playing!"); // Thank the user when done
    }

    /**
     * Plays a single game session.
     *
     * @param {string} dragonName - Name of the dragon chosen by the user.
     */
    async playGame(dragonName) {
        try {
            const gameData = await this.api.postStartTheGame(); // Start game via API
            welcomeMessage(); // Show welcome message

            const game = new Game(this.userInput); // Create a Game instance
            await game.start(gameData, dragonName); // Start the game
        } catch (error) {
            console.log(`Failed to start the game! Error: ${error.message}`); // Handle errors
        }
    }
}

// Create a Main instance and start it
const main = new Main();
main.start().then(() => process.exit(1)); // Exit after the game ends
