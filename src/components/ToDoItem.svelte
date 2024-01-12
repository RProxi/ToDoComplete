<script>
    import { createEventDispatcher } from 'svelte';
    export let is_done
    export let text
    export let id

    let nodeRef

	const dispatch = createEventDispatcher();

    function onCheckboxChanged() {
        dispatch('change', {status: !is_done, id})
    }

    function onRmBtnPressed() {
        nodeRef.parentNode.removeChild(nodeRef)
        dispatch("remove", {id})
    }
</script>

<div class="list-item" class:list-item__done={is_done} bind:this={nodeRef}>
    <input type="checkbox" checked={is_done} class="list-item__checkbox" on:change={onCheckboxChanged}/>
    <span class="list-item__text">{text}</span>
    <button class="list-item__btn" on:click={onRmBtnPressed}><img class="list-item__img" src="src\img\trash.png" alt="Delete"></button>
</div>

<style>
    .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FFebec;
        border-radius: 15px;
        padding: 0 20px;
        gap: 20px;
    }
    .list-item__text {
        flex-grow: 1;
    }
    .list-item__btn {
        border: 0;
        background: none;
        padding: 0;
    }
    .list-item__img {
        height: 30px;
    }
    .list-item__done {
        background: #eaffec;
        text-decoration: line-through;
    }
</style>