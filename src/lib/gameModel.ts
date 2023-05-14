//import assert from "assert";
import type { GameState } from "./gameState";

export class GameModel {
  numPlayers: number;
  winScore: number;
  jeopardyProb: number;
  scores: number[];
  skipTurns: number[];
  turnTotal: number[];
  restoreTurns: number[]; // restore (skip) turns [afterJeopardy, afterStop]

  constructor(numPlayers: number = 2, winScore: number = 1000, jeopardyProb: number = 0.01, restoreTurns: number[] = [50, 50]) {
    this.numPlayers = numPlayers;
    this.winScore = winScore;
    this.jeopardyProb = jeopardyProb;
    this.restoreTurns = restoreTurns;
    this.scores = Array(this.numPlayers).fill(0);
    this.skipTurns = Array(this.numPlayers).fill(0);
    this.turnTotal = Array(this.numPlayers).fill(0);
  }

  // array with values 0 (continue) or 1 (stop)
  DoMove(...moves: number[]) : void {
    //assert(moves.length === this.numPlayers);
    for (let player = 0; player < this.numPlayers; player++) {
        if (this.skipTurns[player] > 0) {
            // skip turn
            this.skipTurns[player]--;
            continue;
        }
        if (this.scores[player] + this.turnTotal[player] >= this.winScore) {
          // automatically make player win the game if he has the possibility to do so
          moves[player] = 1;
        }
        if (moves[player] === 0) {
            // continue
            let outcome = Math.random() < this.jeopardyProb ? 0 : 1;
            if (outcome == 0) {
                this.turnTotal[player] = 0;
                this.skipTurns[player] = this.restoreTurns[0];
            } else {
                this.turnTotal[player] += outcome;
            }
        } else {
            // stop
            this.scores[player] += this.turnTotal[player];
            this.turnTotal[player] = 0;
            this.skipTurns[player] = this.restoreTurns[1];
        }
    }
  }

  IsTerminal() : boolean {
    return this.scores.some(score => score >= this.winScore);
  }

  Returns() : number[] {
    if (!this.IsTerminal()) {
        return Array(this.numPlayers).fill(0);
    }
    let returns: number[] = Array(this.numPlayers).fill(-1 / (this.numPlayers - 1));
    for (let [player, score] of this.scores.entries()) {
        if (score >= this.winScore) {
            returns[player] = 1;
            return returns;
        }
    }
    throw "Error: nobody has won";
  }

  get state() : GameState {
    // careful: pass by reference
    return {
      scores: this.scores,
      skipTurns: this.skipTurns,
      turnTotal: this.turnTotal
    };
  }

  GetState(player: number) : GameState {
    // careful: pass by reference
    return {
        scores: offset(this.scores, player),
        skipTurns: offset(this.skipTurns, player),
        turnTotal: offset(this.turnTotal, player)
    };
  }

  GetAvailableMoves(player: number) : number[] {
    if (this.skipTurns[player] > 0) {
      return [0];
    }
    return [0, 1];
  }
}

const offset = <T>(arr: T[], offset: number): T[] => [...arr.slice(offset), ...arr.slice(0, offset)];