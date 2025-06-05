import { SqliteGameRepository } from "../infrastructure/SqliteGameRepository";
import { describe, it, expect } from "bun:test";
import type {GameResult} from "../src/types.ts";

const repo = new SqliteGameRepository();

describe("SqliteGameRepository", () => {
    it("devrait sauvegarder et lire un game", async () => {
        const game: GameResult = { player1: "rock", player2: "scissors", winner: "Player1" };
        await repo.saveGame(game);
        const games = await repo.getGames();
        expect(games).toContainEqual(game);
    });
});
