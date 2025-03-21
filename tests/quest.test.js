import {Quest} from "./../service/quest.js";
import {QuestModel} from "./../models/questModel.js";

describe('Quest Class Tests ⚔️', () => {
    let quest;

    // Before each test, we create a new instance of the Quest class.
    beforeEach(() => {
        quest = new Quest();
    });

    describe('Testing getOptimalQuest Method 🎯', () => {
        it('should return the optimal quest based on probability 🎉', () => {
            const questsInput = [
                new QuestModel("1",
                    "Steal the treasure",
                    500,
                    5,
                    "sure thing"),
                new QuestModel("2",
                    "Walk through the park",
                    300,
                    10,
                    "walk in the park"),
                new QuestModel("3",
                    "Dangerous infiltration mission",
                    700,
                    2,
                    "impossible")
            ];

            const optimalQuest = quest.getOptimalQuest(questsInput);
            // Expect the quest with the correct probability
            expect(optimalQuest.reward).toBe(300); // Should return the 'Walk through the park'
        });

        it('should categorize quests correctly based on their probability 🌈', () => {
            const questsInput = [
                new QuestModel("1",
                    "Quest 1",
                    100,
                    10,
                    "walk in the park"),
                new QuestModel("2",
                    "Quest 2",
                    200,
                    5,
                    "walk in the park"),
                new QuestModel("3",
                    "Quest 3",
                    150,
                    8,
                    "walk in the park"),
            ];

            const optimalQuest = quest.getOptimalQuest(questsInput);
            // Expect the optimal quest with the highest reward in the simplest category
            expect(optimalQuest.adId).toBe("2"); // Should return the 'Quest 2' task for max reward
        });

        it('should default to the first quest if no suitable categories are found ⚔️', () => {
            const questsInput = [
                new QuestModel("1",
                    "Unknown challenge",
                    0,
                    20,
                    "unknown"),
                new QuestModel("2",
                    "Another task",
                    0,
                    15,
                    "unknown")
            ];

            const optimalQuest = quest.getOptimalQuest(questsInput);
            // Should return the default first quest if no categories have valid quests
            expect(optimalQuest.adId).toBe("1"); // The first quest in the list
        });
    });

    describe('Testing getQuestWithBestReward Method 💰', () => {
        it('should return the quest with the highest reward from the list 🎁', () => {
            const questsInput = [
                new QuestModel("1",
                    "Low reward quest",
                    100,
                    10,
                    "piece of cake"),
                new QuestModel("2",
                    "High reward quest",
                    500,
                    5,
                    "sure thing"),
                new QuestModel("3",
                    "Moderate reward quest",
                    300,
                    7,
                    "quite likely"),
            ];

            const bestQuest = quest.getQuestWithBestReward(questsInput);
            // Expect the returned quest to be the one with the highest reward
            expect(bestQuest.reward).toBe(500); // High reward quest should be returned
        });
    });

    describe('Testing getQuestModel Method 🏗️', () => {
        it('should create a QuestModel object from a valid JSON element ✔️', () => {
            const element = {
                adId: "1",
                message: "Complete the challenge",
                reward: 300,
                expiresIn: 10,
                probability: "quite likely",
                encrypted: 0
            };

            const questModel = quest.getQuestModel(element);

            // Expect the created object to be an instance of QuestModel and to contain the correct properties
            expect(questModel).toBeInstanceOf(QuestModel);
            expect(questModel.adId).toBe("1");
            expect(questModel.message).toBe("Complete the challenge");
            expect(questModel.reward).toBe(300);
            expect(questModel.expiresIn).toBe(10);
            expect(questModel.probability).toBe("quite likely");
            expect(questModel.encrypted).toBe(0);
        });
    });
});
