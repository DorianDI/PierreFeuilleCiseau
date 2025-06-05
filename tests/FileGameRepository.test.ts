import { FileGameRepository } from "../infrastructure/FileGameRepository";
import type { GameResult } from "../src/types";
import { expect, describe, it, beforeEach } from "bun:test";
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(__dirname, "../infrastructure/games.json");

describe("FileGameRepository", () => {
    const repo = new FileGameRepository();

    const sampleGame: GameResult = {
        player1: "rock",
        player2: "scissors",
        winner: "Player1"
    };

    beforeEach(async () => {
        await fs.writeFile(DB_PATH, "[]");
    });

    it("devrait sauvegarder un jeu", async () => {
        await repo.saveGame(sampleGame);
        const games = await repo.getGames();
        expect(games).toEqual([sampleGame]);
    });

    it("devrait filtrer les parties gagnées par Player1", async () => {
        await repo.saveGame(sampleGame);
        const result = await repo.getGamesByPlayer("Player1");
        expect(result.length).toBe(1);
    });
});
