import type { Move, GameResult } from "./types";

export function getWinner(p1: Move, p2: Move): 'Player1' | 'Player2' | 'Draw' {
    if (p1 === p2) return 'Draw';
    if (
        (p1 === 'rock' && p2 === 'scissors') ||
        (p1 === 'paper' && p2 === 'rock') ||
        (p1 === 'scissors' && p2 === 'paper')
    ) {
        return 'Player1';
    }
    return  'Player2';
}

export function playGame(p1: Move, p2: Move): GameResult {
    return {
        player1: p1,
        player2: p2,
        winner: getWinner(p1, p2)
    };
}