import { playGame } from './game.ts';
import type { Move, GameResult, Winner } from './types';
import { SqliteGameRepository  } from "../infrastructure/SqliteGameRepository.ts";
const repo = new SqliteGameRepository();

const moves: Move[]= ['rock', 'paper', 'scissors'];

function getRandomMove(): Move {
    const move = moves[Math.floor(Math.random() * moves.length)];
    if (!move) throw new Error('Failed to pick a random move');
    return move;
}

const rounds: GameResult[] = [];
let score = {
    'Player1': 0,
    'Player2': 0,
};

let matchWinner: Winner = 'Draw';

while (score['Player1'] < 2 && score['Player2'] < 2) {
    const p1 = getRandomMove();
    const p2 = getRandomMove();
    const result = playGame(p1, p2);

    if (result.winner !== 'Draw') {
        score[result.winner]++;
    }

    rounds.push(result);

    await repo.saveGame(result);
}

matchWinner = score["Player1"] === 2 ? "Player1" : "Player2";

const matchResult = {
    rounds,
    matchWinner,
};

console.log(JSON.stringify(matchResult, null, 2));