import axios from "axios";

export class Api {
    static BASE_URL = 'https://dragonsofmugloar.com/api/v2';

    constructor() {
        this.client = axios.create({
            baseURL: Api.BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Sends an API call to the specified endpoint with the given HTTP method.
     *
     * @param {string} endpoint The API endpoint to which the request will be sent.
     * @param {string} method The HTTP method to use (e.g., "GET" or "POST").
     * @param {object} [data] Optional data to send in the body for POST requests.
     * @returns {Promise<string>} The response body returned by the API as a string.
     */
    async makeApiCall(endpoint, method, data = {}) {
        const options = {
            method,
            url: endpoint,
            data
        };

        const response = await this.client(options);
        return response.data;
    }

    /**
     * Initiates a new game session by sending a POST request to the API.
     *
     * @returns {Promise<string>} The JSON response body from the API.
     */
    async postStartTheGame() {
        return this.makeApiCall('/game/start', 'POST');
    }

    /**
     * Attempts to buy an item from the shop based on its ID.
     *
     * @param {string} gameId The ID of the current game.
     * @param {string} id The ID of the item to purchase.
     * @returns {Promise<string>} The response body returned by the API.
     */
    async postItemBuy(gameId, id) {
        return this.makeApiCall(`/${gameId}/shop/buy/${id}`, 'POST');
    }

    /**
     * Attempts to get a list of available items from the shop based on game ID.
     *
     * @param {string} gameId The ID of the current game.
     * @returns {Promise<string>} The response body returned by the API.
     */
    async getShopItems(gameId) {
        return this.makeApiCall(`/${gameId}/shop`, 'GET');
    }

    /**
     * Retrieves the task board (list of tasks).
     *
     * @param {string} gameId The ID of the current game session.
     * @returns {Promise<string>} The JSON response body from the API.
     */
    async getTheQuestBoard(gameId) {
        return this.makeApiCall(`/${gameId}/messages`, 'GET');
    }

    /**
     * Attempts to solve a task in the specified game by sending a POST request to the API.
     *
     * @param {string} gameId The ID of the current game session.
     * @param {string} taskId The ID of the task to be solved.
     * @returns {Promise<string>} The JSON response body from the API.
     */
    async postSolveQuest(gameId, taskId) {
        return this.makeApiCall(`/${gameId}/solve/${taskId}`, 'POST');
    }

    /**
     * Sends a POST request to investigate reputation.
     * NOT USED NOW, used it few times to understand how some quests affects reputation.
     *
     * @param {string} gameId The ID of the current game session.
     * @returns {Promise<string>} The JSON response body from the API.
     */
    async postInvestigateReputation(gameId) {
        return this.makeApiCall(`/${gameId}/investigate/reputation`, 'POST');
    }
}
