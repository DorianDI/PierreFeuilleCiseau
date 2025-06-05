import { FileGameRepository } from "../infrastructure/FileGameRepository";
import type { MatchResult } from "../src/types";
import { GameRepositoryError } from "../src/errors/GameRepositoryError";
import { describe, it, expect, beforeEach } from "bun:test";
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(__dirname, "../infrastructure/games.json");

const sampleMatch: MatchResult = {
    rounds: [
        { player1: "rock", player2: "scissors", winner: "Player1" },
        { player1: "paper", player2: "rock", winner: "Player1" }
    ],
    matchWinner: "Player1"
};

describe("FileGameRepository", () => {
    const repo = new FileGameRepository();

    beforeEach(async () => {
        await fs.writeFile(DB_PATH, "[]");
    });

    it("devrait sauvegarder un match", async () => {
        await repo.saveMatch(sampleMatch);
        const all = await repo.getAllMatches();
        expect(all).toEqual([sampleMatch]);
    });

    it("devrait ajouter plusieurs matchs", async () => {
        await repo.saveMatch(sampleMatch);
        await repo.saveMatch(sampleMatch);
        const all = await repo.getAllMatches();
        expect(all.length).toBe(2);
    });

    it("devrait retourner [] si le fichier est vide ou invalide", async () => {
        await fs.writeFile(DB_PATH, "invalid json");
        const all = await repo.getAllMatches();
        expect(all).toEqual([]);
    });

    it("devrait lancer une GameRepositoryError si la sauvegarde échoue", async () => {
        const brokenRepo = new class extends FileGameRepository {
            override async saveMatch(_: MatchResult): Promise<void> {
                throw new GameRepositoryError("Erreur simulée");
            }
        };
        await expect(brokenRepo.saveMatch(sampleMatch)).rejects.toThrow("Erreur simulée");
    });
});
