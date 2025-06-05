import type { GameResult } from '../types';

export interface GameRepository {
    saveGame(result: GameResult): Promise<void>;
    getGames(): Promise<GameResult[]>;
    getGamesByPlayer(player: 'Player1' | 'Player2'): Promise<GameResult[]>;
}
