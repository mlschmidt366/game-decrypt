import type { GameState } from "./gameState";

export interface Player {
    GetMove(state: GameState) : number;
}