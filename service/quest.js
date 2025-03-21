import {decode, decodeROT13} from "./utils.js";
import {QuestModel} from "./../models/questModel.js";

export class Quest {
    /**
     * Gets the optimal quest from a list of quests.
     * @param {Array} quests List of quest objects.
     * @returns {QuestModel} The optimal quest.
     */
    getOptimalQuest(quests) {
        const questCategories = {
            "walk in the park": [],
            "piece of cake": [],
            "quite likely": [],
            "sure thing": [],
            "hmmm": [],
            "risky": [],
            "gamble": [],
            "rather detrimental": [],
            "playing with fire": [],
            "suicide mission": [],
            "impossible": [],
            "others": []
        };

        quests.sort((a, b) => b.reward - a.reward);

        quests.forEach((quest) => {
            const probability = quest.probability.toLowerCase();
            if (quest.message.toLowerCase().includes("steal") || quest.message.toLowerCase().includes("infiltrate")) {
                questCategories["others"].push(quest);
            } else if (questCategories[probability]) {
                questCategories[probability].push(quest);
            } else {
                questCategories["others"].push(quest);
            }
        });

        const priorityOrder = [
            "sure thing", "walk in the park", "piece of cake", "quite likely",
            "gamble", "hmmm", "risky", "rather detrimental", "playing with fire",
            "suicide mission", "impossible", "others"
        ];

        for (const category of priorityOrder) {
            const questList = questCategories[category];
            if (questList.length) {
                return this.getQuestWithBestReward(questList);
            }
        }
        return quests[0];
    }

    /**
     * Gets the quest with the best reward.
     * @param {Array} quests List of quest objects.
     * @returns {QuestModel} The quest with the highest reward.
     */
    getQuestWithBestReward(quests) {
        return quests.reduce((max, quest) => (quest.reward > max.reward ? quest : max));
    }

    /**
     * Parses the quests from the JSON response.
     * @param {string} json JSON response string containing quests.
     * @returns {Array} List of parsed QuestModel objects.
     */
    parseQuests(json) {
        const ads = [];
        const adArray = JSON.parse(json);

        adArray.forEach((element) => {
            const ad = this.getQuestModel(element);
            if (ad.encrypted === 1) {
                ad.adId = decode(ad.adId);
                ad.message = decode(ad.message);
                ad.probability = decode(ad.probability);
            }

            if (ad.encrypted === 2) {
                ad.adId = decodeROT13(ad.adId);
                ad.message = decodeROT13(ad.message);
                ad.probability = decodeROT13(ad.probability);
            }
            ads.push(ad);
        });
        return ads;
    }

    /**
     * Extracts and constructs a QuestModel from the given JSON element.
     * @param {object} element A JSON object representing a single quest.
     * @returns {QuestModel} A populated QuestModel object.
     */
    getQuestModel(element) {
        return new QuestModel(
            element.adId,
            element.message,
            element.reward,
            element.expiresIn,
            element.probability,
            element.encrypted ? element.encrypted : 0
        );
    }
}
