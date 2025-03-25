import {Quest} from "../service/quest";
import {QuestModel} from "../models/models";

describe('Quest Class Tests ⚔️', () => {
    let quest: Quest;

    beforeEach(() => {
        quest = new Quest();
    });

    describe('Testing getOptimalQuest Method 🎯', () => {
        it('should return the optimal quest based on probability 🎉', () => {
            const questsInput: QuestModel[] = [
                {
                    adId: "1",
                    message: "Steal the treasure",
                    reward: 500,
                    expiresIn: 5,
                    probability: "sure thing",
                    encrypted: null
                },
                {
                    adId: "2",
                    message: "Walk through the park",
                    reward: 300,
                    expiresIn: 10,
                    probability: "walk in the park",
                    encrypted: null
                },
                {
                    adId: "3",
                    message: "Dangerous infiltration mission",
                    reward: 700,
                    expiresIn: 2,
                    probability: "impossible",
                    encrypted: null
                }
            ];

            const optimalQuest = quest.getOptimalQuest(questsInput);
            expect(optimalQuest.reward).toBe(300);
        });

        it('should categorize quests correctly based on their probability 🌈', () => {
            const questsInput: QuestModel[] = [
                {
                    adId: "1",
                    message: "Quest 1",
                    reward: 100,
                    expiresIn: 10,
                    probability: "walk in the park",
                    encrypted: null
                },
                {
                    adId: "2",
                    message: "Quest 2",
                    reward: 200,
                    expiresIn: 5,
                    probability: "walk in the park",
                    encrypted: null
                },
                {
                    adId: "3",
                    message: "Quest 3",
                    reward: 150,
                    expiresIn: 8,
                    probability: "walk in the park",
                    encrypted: null
                },
            ];

            const optimalQuest = quest.getOptimalQuest(questsInput);
            expect(optimalQuest.adId).toBe("2");
        });

        it('should default to the first quest if no suitable categories are found ⚔️', () => {
            const questsInput: QuestModel[] = [
                {
                    adId: "1",
                    message: "Unknown challenge",
                    reward: 0,
                    expiresIn: 20,
                    probability: "unknown",
                    encrypted: null
                },
                {adId: "2", message: "Another task", reward: 0, expiresIn: 15, probability: "unknown", encrypted: null}
            ];

            const optimalQuest = quest.getOptimalQuest(questsInput);
            expect(optimalQuest.adId).toBe("1");
        });
    });

    describe('Testing getQuestWithBestReward Method 💰', () => {
        it('should return the quest with the highest reward from the list 🎁', () => {
            const questsInput: QuestModel[] = [
                {
                    adId: "1",
                    message: "Low reward quest",
                    reward: 100,
                    expiresIn: 10,
                    probability: "piece of cake",
                    encrypted: null
                },
                {
                    adId: "2",
                    message: "High reward quest",
                    reward: 500,
                    expiresIn: 5,
                    probability: "sure thing",
                    encrypted: null
                },
                {
                    adId: "3",
                    message: "Moderate reward quest",
                    reward: 300,
                    expiresIn: 7,
                    probability: "quite likely",
                    encrypted: null
                },
            ];

            const bestQuest = quest.getQuestWithBestReward(questsInput);
            expect(bestQuest.reward).toBe(500);
        });
    });
});
