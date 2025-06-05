export type Move = 'rock' | 'paper' | 'scissors';

export type Winner = 'Player1' | 'Player2' | 'Draw';

export interface GameResult {
    player1: Move;
    player2: Move;
    winner: Winner;
}
