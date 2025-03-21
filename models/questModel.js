export class QuestModel {
    constructor(adId, message, reward, expiresIn, probability, encrypted = 0) {
        this.adId = adId;
        this.message = message;
        this.reward = reward;
        this.expiresIn = expiresIn;
        this.probability = probability;
        this.encrypted = encrypted;
    }
}
