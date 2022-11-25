<script>
    import {focusNextElement} from './utils'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

	export let value = '     '
    export let color = 'white'

    let values = [' ',' ',' ',' ',' ']

    function dochange(e) {
        value = values.map(oe).join('')
    }

    function oe(v) {
        return /\w/.test(v) ? v : '.'
    }

    function onselect(e) {
        e.target.select()
    }

    function keypress(e) {
        dochange(e)
        switch(e.key) {
            case 'Backspace':
                dispatch('change')
                break;
            case 'Tab':
            case 'Shift':
                break;
            default:
                focusNextElement()
                dispatch('change')
                console.log(e)
        }
    }

</script>


<div class="row">
<div class="col-3"></div>
<div class="col-5 card chars">
    {#each values as v}
    <input 
        type="text" 
        class:correct="{/\w/.test(v) && color == 'correct'}" 
        class:misplaced="{/\w/.test(v) && color == 'misplaced'}" 
        bind:value={v} 
        maxlength="1" 
        on:keyup="{keypress}" 
        on:focus="{onselect}" 
        on:click="{onselect}" 
        on:change="{dochange}"
    >
    &nbsp;
    {/each}
</div>
<div class="col-3"></div>
</div>

<style>
.chars {
    text-align: center;
}
.chars input {
    width: 3em !important;
    display: inline-block !important;
    text-align: center;
    text-transform: uppercase;
}
.correct {
    background-color: #00ff00;
}
.misplaced {
    background-color: yellow;
}
</style>