import * as readline from "node:readline"; // Импортируем модуль readline

/**
 * Prompts the user to enter the name of their dragon.
 *
 * @param {readline.Interface} userInput - The readline interface for capturing user input.
 * @returns {Promise<string>} A promise that resolves to the name of the dragon entered by the user.
 */
export const askDragonName = (userInput: readline.Interface): Promise<string> => {
    return new Promise((resolve) => {
        userInput.question('Name your dragon, please: ', (answer: string) => {
            resolve(answer);
        });
    });
}

/**
 * Asks the user if they would like to play again.
 *
 * @param {readline.Interface} userInput - The readline interface for capturing user input.
 * @returns {Promise<boolean>} A promise that resolves to true if the user wants to play again, false otherwise.
 */
export const askToPlayAgain = (userInput: readline.Interface): Promise<boolean> => {
    return new Promise((resolve) => {
        userInput.question('Would you like to play again? (y/n): ', (answer: string) => {
            resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
        });
    });
}

/**
 * Asks the user if they would like to continue after becoming an unkillable demon king.
 *
 * @param {readline.Interface} userInput - The readline interface for capturing user input.
 * @returns {Promise<boolean>} A promise that resolves to true if the user wants to continue, false otherwise.
 */
export const askToContinue = (userInput: readline.Interface): Promise<boolean> => {
    return new Promise((resolve) => {
        userInput.question('You just became an unkillable demon king! Would you like to continue (y/n): ', (answer: string) => {
            resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
        });
    });
}

/**
 * Displays a welcome message for the player at the beginning of their journey.
 */
export const welcomeMessage = (): void => {
    console.log(`
            This is the very beginning of your journey!
            To become successful and famous, you will need to work a little.
            The city tavern always has a fresh list of tasks,
            the completion of which is generously paid by the
            inhabitants of our kingdom or the kingdom itself.
            Not all of them look like work for a real dragon tamer,
            but we all once started with something like this.
            The main thing is to remain an honest person and live this life with inner harmony.
            Let's begin the adventure!
        `);
}

/**
 * Displays an end game message, including the player's journey as a dragon tamer.
 *
 * @param {number} score - The player's score.
 * @param {number} gold - The amount of gold left.
 */
export const endGameMessage = (score: number, gold: number): void => {
    console.log(`
            Your journey as a dragon tamer has come to an end, a path of trials and victories, where legends blend.
            Though you fought battles and the sky burned with fire,
            Your name remains, a spark of hope for many. In the kingdom's tales, your story will live on,
            echoed in the voices of those you inspired. Though it's time to rest and say goodbye,
            your legacy will endure, rising high in the sky.
        `);
    console.log(`Your score: ${score}`);
    console.log(`Gold left: ${gold}`);
}
