import {decode, decodeROT13} from "./utils";
import {QuestModel} from "../models/models";

type Difficulty = 'easy' | 'medium' | 'hard' | 'better avoid'

const priorityOrder: Difficulty[] = [
    'easy',
    'medium',
    'hard',
    'better avoid',
];

export class Quest {
    /**
     * Gets the optimal quest from a list of quests.
     */
    getOptimalQuest(quests: QuestModel[]): QuestModel {
        const questCategories: { [key in Difficulty]: QuestModel[] } = {
            'easy': [],
            'medium': [],
            'hard': [],
            'better avoid': []
        };

        quests.sort((a, b) => b.reward - a.reward);

        quests.forEach((quest) => {
            const difficulty = this.toDifficulty(quest);
            if (quest.message.toLowerCase().includes("steal") || quest.message.toLowerCase().includes("infiltrate")) {
                questCategories['better avoid'].push(quest);
            } else if (questCategories[difficulty]) {
                questCategories[difficulty].push(quest);
            } else {
                questCategories['better avoid'].push(quest);
            }
        });

        for (const category of priorityOrder) {
            const questList = questCategories[category];
            if (questList.length) {
                return this.getQuestWithBestReward(questList);
            }
        }
        return quests[0];
    }

    private toDifficulty(quest: QuestModel): Difficulty {
        switch (quest.probability.toLowerCase()) {
            case 'walk in the park':
                return 'easy';
            case 'piece of cake':
                return 'easy';
            case 'quite likely':
                return 'easy';
            case 'sure thing':
                return 'easy';
            case 'hmmm':
                return 'medium';
            case 'risky':
                return 'medium';
            case 'gamble':
                return 'medium';
            case 'rather detrimental':
                return 'hard';
            case 'playing with fire':
                return 'hard';
            case 'suicide mission':
                return 'hard';
            case 'impossible':
                return 'hard';
            default:
                return 'better avoid';
        }

    }

    /**
     * Gets the quest with the best reward.
     */
    getQuestWithBestReward(quests: QuestModel[]): QuestModel {
        return quests.reduce((max, quest) => {
            return quest.reward > max.reward ? quest : max
        });
    }

    decodeQuestData(quest: QuestModel): QuestModel {
        switch (quest.encrypted) {
            case 2:
                quest.probability = decodeROT13(quest.probability);
                quest.message = decodeROT13(quest.message);
                quest.adId = decodeROT13(quest.adId);
                break;
            case 1:
                quest.probability = decode(quest.probability);
                quest.message = decode(quest.message);
                quest.adId = decode(quest.adId);
                break;
            default:
                break;
        }
        return quest;
    }
}
