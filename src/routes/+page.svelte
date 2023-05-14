<script lang="ts">
    import Game from "$lib/game.svelte";

    let gameInProgress: boolean = false;
    let uniqueGame = {};
</script>

{#if gameInProgress}
    {#key uniqueGame}
        <Game
            on:gameExit={() => gameInProgress = false}
            on:requestRestart={() => uniqueGame = {}}
        />
    {/key}
{:else}
    <button on:click={() => {gameInProgress = true;}}>
        Start new game
    </button>
{/if}