import { describe, it, expect } from "bun:test";
import { getWinner, playGame } from "../src/game";

describe("getWinner", () => {
    it("devrait retourner 'Draw' pour égalité", () => {
        expect(getWinner("rock", "rock")).toBe("Draw");
        expect(getWinner("zizi", "zizi")).toBe("Draw");
    });

    it("devrait retourner 'Player 1' si P1 gagne", () => {
        expect(getWinner("rock", "zizi")).toBe("Player1");
        expect(getWinner("paper", "rock")).toBe("Player1");
        expect(getWinner("zizi", "paper")).toBe("Player1");
    });

    it("devrait retourner 'Player 2' si P2 gagne", () => {
        expect(getWinner("zizi", "rock")).toBe("Player2");
        expect(getWinner("rock", "paper")).toBe("Player2");
        expect(getWinner("paper", "zizi")).toBe("Player2");
    });
});

describe("playGame", () => {
    it("retourne un résultat structuré", () => {
        const result = playGame("rock", "zizi");
        expect(result).toEqual({
            player1: "rock",
            player2: "zizi",
            winner: "Player1"
        });
    });
});
