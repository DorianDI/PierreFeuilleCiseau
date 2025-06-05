export type Move = 'rock' | 'paper' | 'zizi';

export type Winner = 'Player1' | 'Player2' | 'Draw';

export interface GameResult {
    player1: Move;
    player2: Move;
    winner: Winner;
}

export interface MatchResult {
    rounds: GameResult[];
    matchWinner: Winner;
}