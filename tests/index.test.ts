import { describe, it, expect } from "bun:test";
import { getWinner, playGame } from "../src/game";

describe("getWinner", () => {
    it("devrait retourner 'Draw' pour égalité", () => {
        expect(getWinner("rock", "rock")).toBe("Draw");
        expect(getWinner("zizi", "zizi")).toBe("Draw");
    });

    it("devrait retourner 'Player 1' si P1 gagne", () => {
        expect(getWinner("rock", "zizi")).toBe("Lisa");
        expect(getWinner("paper", "rock")).toBe("Lisa");
        expect(getWinner("zizi", "paper")).toBe("Lisa");
    });

    it("devrait retourner 'Player 2' si P2 gagne", () => {
        expect(getWinner("zizi", "rock")).toBe("Dorian");
        expect(getWinner("rock", "paper")).toBe("Dorian");
        expect(getWinner("paper", "zizi")).toBe("Dorian");
    });
});

describe("playGame", () => {
    it("retourne un résultat structuré", () => {
        const result = playGame("rock", "zizi");
        expect(result).toEqual({
            Lisa: "rock",
            Dorian: "zizi",
            winner: "Lisa"
        });
    });
});
