import { SqliteGameRepository } from "../infrastructure/SqliteGameRepository";
import { GameRepositoryError } from "../src/errors/GameRepositoryError";
import { describe, it, expect, beforeEach } from "bun:test";
import type {GameResult} from "../src/types.ts";
import { Database } from "bun:sqlite";

beforeEach(() => {
    const db = new Database("games.db");
    db.exec("DROP TABLE IF EXISTS games");
    db.exec(`
        CREATE TABLE games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player1 TEXT NOT NULL,
            player2 TEXT NOT NULL,
            winner TEXT NOT NULL
        )
    `);
});


class BadSqliteRepo extends SqliteGameRepository {
    override async getGames(): Promise<any> {
        throw new GameRepositoryError("Erreur DB");
    }
}

class BrokenTableRepo extends SqliteGameRepository {
    constructor() {
        super();
        // on remplace la table par une version cassée
        const db = new Database("games.db");
        db.exec("DROP TABLE IF EXISTS games");
        db.exec("CREATE TABLE games (fail INT)");
    }
}


class ExplodingSqliteRepo extends SqliteGameRepository {
    override async saveGame(_: GameResult): Promise<void> {
        throw new GameRepositoryError("Erreur écriture SQLite");
    }

    override async getGamesByPlayer(_: "Player1" | "Player2"): Promise<GameResult[]> {
        throw new GameRepositoryError("Erreur lecture SQLite");
    }
}


const repo = new SqliteGameRepository();

describe("SqliteGameRepository", () => {
    it("devrait sauvegarder et lire un game", async () => {
        const game: GameResult = { player1: "rock", player2: "scissors", winner: "Player1" };
        await repo.saveGame(game);
        const games = await repo.getGames();
        expect(games).toContainEqual(game);
    });

    it("devrait gérer une erreur simulée", async () => {
        const repo = new BadSqliteRepo();
        await expect(repo.getGames()).rejects.toThrow(GameRepositoryError);
    });

    it("devrait lever une erreur si la sauvegarde échoue", async () => {
        const repo = new ExplodingSqliteRepo();
        await expect(repo.saveGame({ player1: "rock", player2: "paper", winner: "Player2" }))
            .rejects.toThrow(GameRepositoryError);
    });

    it("devrait lever une erreur si la lecture échoue", async () => {
        const repo = new ExplodingSqliteRepo();
        await expect(repo.getGamesByPlayer("Player1"))
            .rejects.toThrow(GameRepositoryError);
    });

    it("devrait gérer une erreur dans saveGame", async () => {
        const repo = new BrokenTableRepo();
        await expect(repo.saveGame({
            player1: "rock",
            player2: "paper",
            winner: "Player1"
        })).rejects.toThrow(GameRepositoryError);
    });

    it("devrait gérer une erreur dans getGames", async () => {
        const repo = new BrokenTableRepo();
        await expect(repo.getGames()).rejects.toThrow(GameRepositoryError);
    });

    it("devrait gérer une erreur dans getGamesByPlayer", async () => {
        const repo = new BrokenTableRepo();
        await expect(repo.getGamesByPlayer("Player1")).rejects.toThrow(GameRepositoryError);
    });

    it("devrait retourner les parties gagnées par Player1", async () => {
        const game: GameResult = { player1: "rock", player2: "scissors", winner: "Player1" };
        await repo.saveGame(game);

        const games = await repo.getGamesByPlayer("Player1");

        expect(games).toEqual([game]); // ou expect length === 1
    });
});
