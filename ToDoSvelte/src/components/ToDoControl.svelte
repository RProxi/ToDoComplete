<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let inputValue = ''

    function onBtnClicked() {
        dispatch("addel", {inputValue})
        inputValue = ''
    }
</script>

<div class="todo-control">
    <input type="text" class="todo-control__input" bind:value={inputValue}/>
    <button class="todo-control__btn" on:click={onBtnClicked}>Add</button>
</div>

<style>
    .todo-control {
        display: grid;
        grid-template-columns: 80% 20%;
    }
    .todo-control__input {
        border: 0;
        border-radius: 15px 0 0 15px;
        padding: 0 15px;
    }

    .todo-control__btn {
        border: 0;
        padding: 10px 10px;
        background: #F1C83A;
        border-radius: 0 15px 15px 0;
    }
</style>