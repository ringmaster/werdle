<script>
  import wordlist from './lib/wordlist'
  import Chars from './lib/Chars.svelte';

  let solved = "....."

  let guesses = ['.....']

  let possibles = [];
  let sortable = [];

  let badletters = "";

  let pct = Array.from(new Array(26)).reduce((p, c, i) => (p[String.fromCharCode(i + 97)] = 0, p), {})

  function dofilter() {
    let goodletters = "";
    let words = wordlist.split(/\W+/);
    let re = new RegExp("^" + solved + "$", "i")
    words = words.filter((word) => re.test(word))
    guesses.forEach((miss) => {
      if(miss != '.....') {
        let re = new RegExp("^" + miss.replaceAll(/(\w)/g, "[^$1]") + "$", 'i')
        words = words.filter((word) => {
          return re.test(word)
        })
      }
      goodletters += miss.replaceAll('.', '')
    })
    re = new RegExp("[" + badletters + "]")
    console.log(re)
    words = words.filter((word) => !re.test(word))
    let goods = goodletters.split('')
    goods.forEach((good) => words = words.filter((word) => word.indexOf(good) != -1))
    possibles = words

    pct = Array.from(new Array(26)).reduce((p, c, i) => (p[String.fromCharCode(i + 97)] = 0, p), {})
    possibles.forEach((word) => {
      let letters = [...new Set(word.split(''))]
      letters.forEach((letter) => pct[letter] = pct[letter] +1)
    })

    sortable = [];
    for (var p in pct) {
        sortable.push([p, pct[p]]);
    }
    sortable.sort((a, b) => b[1] - a[1])
  }
</script>

<main class="container">
<section>
<h1>Werdle</h1>

<Chars bind:value={solved} color="correct" on:change="{dofilter}" />

<div class="row">
  <div class="col-3"></div>
  <div class="col-5 card chars">
<input type="text" bind:value={badletters} on:keyup="{dofilter}">
  </div>
  <div class="col-3"></div>
</div>

{#each guesses as guess}
<Chars bind:value={guess} color="misplaced" on:change="{dofilter}" />
{/each}
<div class="row">
<div class="col-3"></div>
<div class="col-5">
<button on:click={()=>guesses = [...guesses, '.....']}>Add Miss</button>
</div>
<div class="col-3"></div>
</div>
</section>

<section>
  <div class="row">
    <div class="col">
  <ul>
    {#each possibles as possible}
      <li>{possible}</li>
    {/each}
  </ul>
  </div>
  <div class="col">
    <ul>
      {#each sortable as [l, v]}
        <li><b>{l}:</b> {v}</li>
      {/each}
    </ul>
    </div>
</section>


</main>

<style>
</style>
