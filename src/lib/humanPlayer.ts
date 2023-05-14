import type { GameState } from "./gameState";
import type { Player } from "./player";

export class HumanPlayer implements Player {
    nextMove: number = 0;

    GetMove(state: GameState) : number {
        if (this.nextMove === 1) {
            this.nextMove = 0;
            return 1;
        }
        return this.nextMove;
    }
}