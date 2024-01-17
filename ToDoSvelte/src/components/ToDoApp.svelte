<script>
    import ToDoControl from "./ToDoControl.svelte";
    import ToDoItem from "./ToDoItem.svelte";   
    import { toDoApiModule } from '../lib/api.ts';

    let items = loadData();

    function loadData() {
        return toDoApiModule.getToDos();
    }
    async function createToDo(event) {
        await toDoApiModule.createToDo({
            text: event.detail.inputValue,
            is_done: false
        });
        items = loadData();
    }
    async function removeToDo(event) {
        await toDoApiModule.removeToDo(event.detail.id);
        items = loadData();
    }
    async function updateToDo(event) {
        await toDoApiModule.updateToDo({
            id: event.detail.id,
            is_done: event.detail.status
        });
        items = loadData();
    }
</script>

<div class="todo-app">
    {#await items}
        Loading...
    {:then value}
        <ToDoControl on:addel={createToDo}/>
        <div class = "todo-app__field">
            {#each value as item}
                <ToDoItem id={item.id} text={item.text} bind:is_done={item.is_done} on:remove={removeToDo} on:change={updateToDo}/>
            {/each}
        </div>
    {/await}
</div>

<style>
    .todo-app {
        height: 90vh;
        width: 80%;
        background: #E8E8E8;
        border-radius: 15px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 0 auto;
    }
    .todo-app__field {
        background: white;
        border-radius: 15px;
        flex-grow: 1;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow: auto;
    }
</style>