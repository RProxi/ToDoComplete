<script>
    import { onMount } from "svelte"
    import ToDoControl from "./ToDoControl.svelte";
    import ToDoItem from "./ToDoItem.svelte";

    let fieldEl;

    let itemList = []
    let currentID = 0

    onMount(() => {
        if (localStorage.key('itemList')) {
            itemList = JSON.parse(localStorage.getItem('itemList'))
            itemList.forEach((i) => {
                if (currentID < i.id) {
                    currentID = i.id
                }
            })
            currentID++
        }
    })

    function onChange(event) {
        for (let i = 0; i < itemList.length; ++i) {
            if (itemList[i].id == event.detail.id) {
                itemList[i].isDone = event.detail.status
            }
        }
        localStorage.setItem('itemList', JSON.stringify(itemList))
    }

    function onRemove(event) {
        for (let i = 0; i < itemList.length; ++i) {
            if(itemList[i].id == event.detail.id) {
                itemList.splice(i, 1)
            }
        }
        localStorage.setItem('itemList', JSON.stringify(itemList))
    }

    function onAdd(event) {
        const newItem = {
            id: currentID++,
            text: event.detail.inputValue,
            isDone: false
        }
        itemList.push(newItem)
        itemList = itemList
        localStorage.setItem('itemList', JSON.stringify(itemList))
    }
</script>

<div class="todo-app">
    <ToDoControl on:addel={onAdd}/>
    <div class="todo-app__field" bind:this={fieldEl}>
        {#each itemList as item}
            <ToDoItem id={item.id} text={item.text} isDone={item.isDone} on:change={onChange} on:remove={onRemove}/>
        {/each}
    </div>
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