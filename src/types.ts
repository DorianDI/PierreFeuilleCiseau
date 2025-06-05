export type Move = 'rock' | 'paper' | 'zizi';

export type Winner = 'Lisa' | 'Dorian' | 'Draw';

export interface GameResult {
    Lisa: Move;
    Dorian: Move;
    winner: Winner;
}

export interface MatchResult {
    rounds: GameResult[];
    matchWinner: Winner;
}