<svelte:head>
    <!--<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
</svelte:head>

<script lang="ts">
	export let progress: number;
  export let staged: number;
  export let text: string;
</script>
<!--
<div class="w3-light-grey flex-container">
  <div class="w3-green w3-center inline-progress" style:width="{progress*100}%">{progress*100}%</div>
  <div class="w3-grey w3-center inline-progress" style:width="{staged*100}%"></div>
</div>

<style>
  .flex-container {
    display: flex,
  }

  .flex-container > .inline-progress {
    display: inline-flex
  }
</style>-->

<div class="container">
  <div class="progress" style:text-align="center" style:position="relative">
    <div class="progress-bar progress-bar-success" role="progressbar" style:width="{progress*100}%">
      <!--{(progress*100).toFixed(1)}%-->
    </div>
    <div class="progress-bar progress-bar-warning" role="progressbar" style:width="{staged*100}%" style:transition="none">
    </div>
      <p class="doCenter" style:font-weight="bold">{text}</p>
  </div>
</div>

<style>
  .doCenter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>