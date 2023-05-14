import type { GameState } from "./gameState";
import type { Player } from "./player";

export class GameAI implements Player {
    GetMove(state: GameState) : number {
        return state.turnTotal[0] >= 100 ? 1 : 0;
    }
}