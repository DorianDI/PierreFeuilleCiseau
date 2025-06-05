import { GameRepositoryError } from "../src/errors/GameRepositoryError";
import { describe, it, expect } from "bun:test";

describe("GameRepositoryError", () => {
    it("doit créer une erreur personnalisée avec le bon message", () => {
        const err = new GameRepositoryError("Erreur simulée");
        expect(err.message).toBe("Erreur simulée");
        expect(err.name).toBe("GameRepositoryError");
    });
});
