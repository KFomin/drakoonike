export interface QuestModel {
    adId: string;
    message: string;
    reward: number;
    expiresIn: number;
    probability: string;
    encrypted: number | null;
}

export interface SolveResult {
    success: boolean;
    lives: number;
    gold: number;
    score: number;
    turn: number;
    message: string;
}

export interface ShopItem {
    id: string;
    name: string;
    cost: number;
}

export interface GameData {
    gameId: string;
    lives: number;
    score: number;
    turn: number;
    gold: number;
    level: number;
}
