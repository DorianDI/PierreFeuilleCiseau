import { playGame } from './game.ts';
import type { Move, GameResult, Winner } from './types';
import { FileGameRepository } from "../infrastructure/FileGameRepository.ts";
const repo = new FileGameRepository();

const moves: Move[]= ['rock', 'paper', 'zizi'];

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
}

matchWinner = score["Player1"] === 2 ? "Player1" : "Player2";

const matchResult = {
    rounds,
    matchWinner,
};

await repo.saveMatch(matchResult);

console.log(JSON.stringify(matchResult, null, 2));