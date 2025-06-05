import { describe, it, expect } from "bun:test";
import { getWinner, playGame } from "../src/game";

describe("getWinner", () => {
    it("devrait retourner 'Draw' pour égalité", () => {
        expect(getWinner("rock", "rock")).toBe("Draw");
        expect(getWinner("scissors", "scissors")).toBe("Draw");
    });

    it("devrait retourner 'Player 1' si P1 gagne", () => {
        expect(getWinner("rock", "scissors")).toBe("Player1");
        expect(getWinner("paper", "rock")).toBe("Player1");
        expect(getWinner("scissors", "paper")).toBe("Player1");
    });

    it("devrait retourner 'Player 2' si P2 gagne", () => {
        expect(getWinner("scissors", "rock")).toBe("Player2");
        expect(getWinner("rock", "paper")).toBe("Player2");
        expect(getWinner("paper", "scissors")).toBe("Player2");
    });
});

describe("playGame", () => {
    it("retourne un résultat structuré", () => {
        const result = playGame("rock", "scissors");
        expect(result).toEqual({
            player1: "rock",
            player2: "scissors",
            winner: "Player1"
        });
    });
});
