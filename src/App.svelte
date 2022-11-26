<script>
  import wordlist from './lib/wordlist'
  import Chars from './lib/Chars.svelte'

  let solved = "....."

  let guesses = ['.....']

  let possibles = [];
  let alphafreq = [];

  let badletters = "";

  let pct = Array.from(new Array(26)).reduce((p, c, i) => (p[String.fromCharCode(i + 97)] = 0, p), {})

  function dofilter() {
    let goodletters = "";
    let words = wordlist.split(/\W+/);
    let re = new RegExp("^" + solved + "$", "i")
    words = words.filter((word) => re.test(word))
    guesses.forEach((miss) => {
      if(miss != '.....') {
        let rex = new RegExp("^" + miss.replaceAll(/(\w)/g, "[^$1]") + "$", 'i')
        console.log(rex)
        words = words.filter((word) => {
          return rex.test(word)
        })
      }
      goodletters += miss.replaceAll('.', '')
    })
    console.log('goodletters: ' + goodletters)
    re = new RegExp("[" + badletters + "]")
    console.log(re)
    words = words.filter((word) => !re.test(word))
    let goods = goodletters.split('')
    goods.forEach((good) => words = words.filter((word) => word.indexOf(good) != -1))

    possibles = []
    words.forEach((word) => possibles = [...possibles, {word: word, hits: 0}])

    pct = Array.from(new Array(26)).reduce((p, c, i) => (p[String.fromCharCode(i + 97)] = 0, p), {})
    possibles.forEach((word) => {
      let letters = [...new Set(word.word.split(''))]
      letters.forEach((letter) => pct[letter] = pct[letter] +1)
    })

    alphafreq = [];
    console.log(pct)
    for (var p in pct) {
      alphafreq.push({letter: p, freq: pct[p]});
    }
    alphafreq.sort((a, b) => b.freq - a.freq)
    let totalwords = alphafreq[0].freq
    //alphafreq = alphafreq.map((cur)=> {return {letter: cur.letter, freq: Math.floor(cur.freq/totalwords * 100) }})
    let newalpha = {}
    alphafreq.forEach((e)=> newalpha[e.letter] = e.freq)

    possibles = possibles.map((cur) => {
      let hits = 0
      cur.word.split('').forEach((l) => hits += newalpha[l] == totalwords ? 0 : newalpha[l])
      return {word: cur.word, hits: hits}
    })
    possibles.sort((a,b) => b.hits-a.hits)
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
<button on:click={dofilter}>Compute</button>
</div>
<div class="col-3"></div>
</div>
</section>

<section>
  <div class="row">
    <div class="col">
  <ul>
    {#each possibles as possible}
      <li>{possible.word} - {possible.hits}</li>
    {/each}
  </ul>
  </div>
  <div class="col">
    <ul>
      {#each alphafreq as alpha}
        <li><b>{alpha.letter}:</b> {alpha.freq}</li>
      {/each}
    </ul>
    </div>
</section>


</main>

<style>
</style>
