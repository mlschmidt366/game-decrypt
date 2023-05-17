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
    <h3>Decrypt!</h3>
    <h5>Introduction</h5>
    <p>
        The Pentagon's decryption keys were stolen! As the Pentagon naturally
        encrypts all their files, they are now no longer able to read any of their most important files.
        In their desperation they contact all Quantum Computer engineers to assist
        them in computing their decryption keys.
    </p>
    <p>
        In "Decrypt!", you take on the role of a Quantum engineer competing to be the fastest
        to provide the decryption keys for the Pentagon. Due to the complexity of the decryption algorithm,
        the Quantum Computer needs a minimum of 24366 QBits to operate! You are stretching the limits of existing
        Quantum Computers and manage to run such a Computer, but due to its short coherence time it can quickly
        become instable and its wave function collapses. Reinitializing the state of the Quantum Computer takes a lot of time, so you will need to optimize
        the timing of backups. However, measuring the state of the Quantum computer inevitably results in the collapse of its wave function, too.
        Therefore, even though creating the backup itself does not take a large amount of time, restoring the backup does.
        Only if you time your backups wisely will you have a chance to be the first to compute the decryption keys
        for the Pentagon.
    </p>
    <h5>Rules</h5>
    <p>
        Each player has a separate decryption progress that increases with a constant speed. Each second there is a
        chance that the Quantum Computer's state collapses and they have to restore the last backup again.
        Players may choose to create
        a Quantum backup at any time, given that a backup operation is not currently in progress.
        If they do so, the progress that they have accumulated so far will be stored in the backup, making it impossible
        to loose progress made until that point.
        Whenever a player creates a backup, they also directly have to restore the backup.
        Restoring a backup pauses the progress towards computing the decryption keys for a fixed amount of time.
    </p>
    <h5>Game End</h5>
    <p>
        The player to reach a 100% progress wins the game and the game ends immediately.
    </p>
    <button on:click={() => {gameInProgress = true;}}>
        Start new game
    </button>
{/if}