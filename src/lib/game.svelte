<script lang="ts">
    import { GameModel } from "$lib/gameModel";
    import { GameAI } from "$lib/gameAI";
    import type { Player } from "./player";
    import { createEventDispatcher, onMount } from "svelte";
    import { HumanPlayer } from "./humanPlayer";
    import Progressbar from "./progressbar.svelte";

    const dispatch = createEventDispatcher();
    const tickTime = 20;

    let gameModel = new GameModel();
    let humanPlayer = new HumanPlayer();
    let players: Player[] = [new GameAI(), humanPlayer];
    $: state = gameModel.state;
    let showResults = false;

    function SimulateTurn() : void {
        gameModel.DoMove(...players.map((player, idx) => player.GetMove(gameModel.GetState(idx))));
        gameModel = gameModel;
    }

    function RunGame() : void {
        let timer = setInterval(() => {
            SimulateTurn();
            if (gameModel.IsTerminal()) {
                clearInterval(timer);
                showResults = true;
            }
        }, tickTime);
    }

    onMount(() => RunGame());
</script>

<h3>
    AI
</h3>
<Progressbar
    progress={state.scores[0] / gameModel.winScore}
    staged={state.turnTotal[0] / gameModel.winScore}
    text={state.skipTurns[0] > 0 ? "Applying backup..." : "Decrypting..."}
/>
<!--<p>Score: {state.scores[0]}, Turn Total: {state.turnTotal[0]}, Skip turns left: {state.skipTurns[0]}</p>-->
<hr>

<h3>
    You
</h3>
<Progressbar
    progress={state.scores[1] / gameModel.winScore}
    staged={state.turnTotal[1] / gameModel.winScore}
    text={state.skipTurns[1] > 0 ? "Applying backup..." : "Decrypting..."}
/>
<!--<p>Score: {state.scores[1]}, Turn Total: {state.turnTotal[1]}, Skip turns left: {state.skipTurns[1]}</p>-->

{#if showResults}
    <hr>
    <h3>{gameModel.Returns()[0] === 1 ? "The AI has won!" : "Congratulations! You have won!"}</h3>
    <button on:click={() => dispatch('requestRestart')}>
        Restart
    </button>
    <button on:click={() => dispatch('gameExit')}>
        Exit
    </button>
{:else}
    <button style:display="block" style:margin="auto" style:width="auto" disabled={gameModel.GetAvailableMoves(1).length < 2} on:click={() => {humanPlayer.nextMove = 1;}}>
        Create Quantum Backup
    </button>
{/if}

<style>
    button:disabled {
        color: #666
    }
</style>