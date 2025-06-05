import type { GameResult } from '../types';

export interface GameRepository {
    saveGame(result: GameResult): Promise<void>;
    getGames(): Promise<GameResult[]>;
    getGamesByPlayer(player: 'Lisa' | 'Dorian'): Promise<GameResult[]>;
}
