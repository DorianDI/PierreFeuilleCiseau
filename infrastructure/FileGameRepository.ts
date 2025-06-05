import type { MatchResult } from "../src/types";
import { GameRepositoryError } from "../src/errors/GameRepositoryError";
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(__dirname, "games.json");

export class FileGameRepository {
    async saveMatch(result: MatchResult): Promise<void> {
        try {
            const content = await this.getAllMatches();
            content.push(result);
            await fs.writeFile(DB_PATH, JSON.stringify(content, null, 2), "utf-8");
        } catch (err) {
            throw new GameRepositoryError("Erreur lors de la sauvegarde");
        }
    }

    async getAllMatches(): Promise<MatchResult[]> {
        try {
            const content = await fs.readFile(DB_PATH, "utf-8");
            return JSON.parse(content);
        } catch {
            return [];
        }
    }
}
