import type { GameRepository } from "../src/ports/GameRepository";
import type { GameResult } from "../src/types";
import { GameRepositoryError } from "../src/errors/GameRepositoryError";
import { Database } from "bun:sqlite";

const db = new Database("games.db", { create: true });

db.run(`
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Lisa TEXT NOT NULL,
        Dorian TEXT NOT NULL,
        winner TEXT NOT NULL
    )
`);

export class SqliteGameRepository implements GameRepository {
    async saveGame(result: GameResult): Promise<void> {
        try {
            db.run("INSERT INTO games (Lisa, Dorian, winner) VALUES (?, ?, ?)", [
                result.Lisa,
                result.Dorian,
                result.winner
            ]);
        } catch (err) {
            throw new GameRepositoryError("Erreur SQLite : " + (err as Error).message);
        }
    }

    async getGames(): Promise<GameResult[]> {
        try {
            const rows = db.query("SELECT Lisa, Dorian, winner FROM games").all() as any[];
            return rows.map(r => ({
                Lisa: r.Lisa as GameResult["Lisa"],
                Dorian: r.Dorian as GameResult["Dorian"],
                winner: r.winner as GameResult["winner"]
            }));
        } catch (err) {
            throw new GameRepositoryError("Erreur SQLite : " + (err as Error).message);
        }
    }

    async getGamesByPlayer(player: "Lisa" | "Dorian"): Promise<GameResult[]> {
        try {
            const rows = db
                .query("SELECT Lisa, Dorian, winner FROM games WHERE winner = ?")
                .all(player) as any[];

            return rows.map(r => ({
                Lisa: r.Lisa as GameResult["Lisa"],
                Dorian: r.Dorian as GameResult["Dorian"],
                winner: r.winner as GameResult["winner"]
            }));
        } catch (err) {
            throw new GameRepositoryError("Erreur SQLite : " + (err as Error).message);
        }
    }
}