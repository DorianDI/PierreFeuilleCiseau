import type { GameRepository } from "../src/ports/GameRepository";
import type { GameResult } from "../src/types";
import { GameRepositoryError } from "../src/errors/GameRepositoryError";
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(__dirname, "games.json");

export class FileGameRepository implements GameRepository {
    async saveGame(result: GameResult): Promise<void> {
        try {
            const games = await this.getGames();
            games.push(result);
            await fs.writeFile(DB_PATH, JSON.stringify(games, null, 2), "utf-8");
        } catch (err) {
            throw new GameRepositoryError("Erreur lors de la sauvegarde");
        }
    }

    async getGames(): Promise<GameResult[]> {
        try {
            const content = await fs.readFile(DB_PATH, "utf-8");
            return JSON.parse(content);
        } catch {
            return [];
        }
    }

    async getGamesByPlayer(player: 'Player1' | 'Player2'): Promise<GameResult[]> {
        const games = await this.getGames();
        return games.filter(g => g.winner === player);
    }
}
