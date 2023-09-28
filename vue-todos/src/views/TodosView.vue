<script setup>
import { ref, watch, computed } from "vue";
import { uid } from "uid";
import { Icon } from '@iconify/vue';
import TodoCreator from "../components/TodoCreator.vue";
import TodoItem from "../components/TodoItem.vue";

const todoList = ref([]);

watch(todoList, (newValue, oldValue) => {
  setTodoListLocalStorage()
}, {
  deep: true,
});

const todoCompleted = computed(() => {
  return todoList.value.every((todo) => todo.isCompleted)
})

const setTodoListLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value))
}
const getTodoListLocalStorage = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"))
  if (savedTodoList) {
    todoList.value = savedTodoList
  }
}

getTodoListLocalStorage();

const createTodo = (name) => {
  console.log(name)
  todoList.value.push({
    id: uid(),
    name: name,
    isCompleted: false,
    isEditing: false,
  })
}

const toggleTodoComplete = (todoPos) => {
  todoList.value[todoPos].isCompleted = !todoList.value[todoPos].isCompleted
}

const toggleEditTodo = (todoPos) => {
  todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing
}
const updateTodo = (todoValue, todoPos) => {
  todoList.value[todoPos].name = todoValue
}

const deleteTodo = (todoId) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== todoId)
}
</script>

<template>
  <main>
    <h1>Create Todo</h1>
    <TodoCreator @create-todo="createTodo"/>
    <ul class="todo-list" v-if="todoList.length > 0">
      <TodoItem 
          v-for="(todo, index) in todoList" 
          :todo="todo" 
          :index="index" 
          @toggle-complete="toggleTodoComplete"
          @edit-todo="toggleEditTodo"
          @update-todo="updateTodo"
          @delete-todo="deleteTodo"
        />
    </ul>
    <p class="todos-msg" v-else>
      <Icon icon="noto:sad-but-relieved-face" width="22" />
      <span>You have no todos to complete. Add one!</span>
    </p>
    <p v-if="todoCompleted && todoList.length > 0" class="todos-msg">
      <Icon icon="noto:party-popper" width="22" />
      <span>You have completed al your todos!</span>
    </p>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }
  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
