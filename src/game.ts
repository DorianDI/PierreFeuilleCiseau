import type { Move, GameResult } from "./types";

export function getWinner(p1: Move, p2: Move): 'Lisa' | 'Dorian' | 'Draw' {
    if (p1 === p2) return 'Draw';
    if (
        (p1 === 'rock' && p2 === 'zizi') ||
        (p1 === 'paper' && p2 === 'rock') ||
        (p1 === 'zizi' && p2 === 'paper')
    ) {
        return 'Lisa';
    }
    return  'Dorian';
}

export function playGame(p1: Move, p2: Move): GameResult {
    return {
        Lisa: p1,
        Dorian: p2,
        winner: getWinner(p1, p2)
    };
}