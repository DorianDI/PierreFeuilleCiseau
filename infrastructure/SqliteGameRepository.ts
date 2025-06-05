import type { GameRepository } from "../src/ports/GameRepository";
import type { GameResult } from "../src/types";
import { GameRepositoryError } from "../src/errors/GameRepositoryError";
import { Database } from "bun:sqlite";

const db = new Database("games.db", { create: true });

db.run(`
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player1 TEXT NOT NULL,
        player2 TEXT NOT NULL,
        winner TEXT NOT NULL
    )
`);

export class SqliteGameRepository implements GameRepository {
    async saveGame(result: GameResult): Promise<void> {
        try {
            db.run("INSERT INTO games (player1, player2, winner) VALUES (?, ?, ?)", [
                result.player1,
                result.player2,
                result.winner
            ]);
        } catch (err) {
            throw new GameRepositoryError("Erreur SQLite : " + (err as Error).message);
        }
    }

    async getGames(): Promise<GameResult[]> {
        try {
            const rows = db.query("SELECT player1, player2, winner FROM games").all() as any[];
            return rows.map(r => ({
                player1: r.player1 as GameResult["player1"],
                player2: r.player2 as GameResult["player2"],
                winner: r.winner as GameResult["winner"]
            }));
        } catch (err) {
            throw new GameRepositoryError("Erreur SQLite : " + (err as Error).message);
        }
    }

    async getGamesByPlayer(player: "Player1" | "Player2"): Promise<GameResult[]> {
        try {
            const rows = db
                .query("SELECT player1, player2, winner FROM games WHERE winner = ?")
                .all(player) as any[];

            return rows.map(r => ({
                player1: r.player1 as GameResult["player1"],
                player2: r.player2 as GameResult["player2"],
                winner: r.winner as GameResult["winner"]
            }));
        } catch (err) {
            throw new GameRepositoryError("Erreur SQLite : " + (err as Error).message);
        }
    }
}