const taskList = document.querySelector(".task-list");
const newListItem = document.getElementById("new-list-name");
const newTaskItem = document.getElementById("new-task-name");
const createListBtn = document.getElementById("create-list");
const createTodoBtn = document.getElementById("create-todo");
const todoList = document.querySelector(".tasks");
const todoTitle = document.querySelector(".list-title");
const clearTask = document.getElementById("clear-task");
const delList = document.getElementById("delete-list");
const taskCount = document.querySelector(".task-count");

let getList;

const todoListData = {
  Study: ["JavaScript", "HTML", "CSS"],
  Workout: ["push-ups", "jogging", "sit-ups"],
};

// Add to MyList
const addMyList = function (listName, type) {
  if (!listName) return;
  if (type === newListItem.id) {
    const node = document.createElement("li");
    node.classList.add("list-name");
    const listValue = document.createTextNode(listName);
    node.appendChild(listValue);
    taskList.appendChild(node);

    newListItem.value = "";
  }

  if (type === newTaskItem.id) {
    const category = todoTitle.textContent;
    todoListData[category].push(listName);
    todoList.replaceChildren();
    renderTaskList(category);
    newTaskItem.value = "";
  }
};

// Render My Lists
const renderMyLists = function () {
  if (Object.keys(todoListData).length === 0) return;

  Object.keys(todoListData).forEach((list) => addMyList(list, newListItem.id));
  if (!taskList.hasChildNodes()) return;
  taskList.querySelector("li:first-child").classList.add("active-list");
};

// Render Element Helper
const renderTodoHelper = function (listTodo, index) {
  const task = document.createElement("div");
  task.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-${index + 1}`;

  const label = document.createElement("label");
  label.htmlFor = `task-${index + 1}`;
  label.innerHTML = `<span class="custom-checkbox"></span> ${listTodo}`;

  task.appendChild(checkbox);
  task.appendChild(label);
  todoList.appendChild(task);
};

// Display todo list based on category
const renderTaskList = function (category) {
  if (!category) {
    taskCount.textContent = `no available task`;
    return;
  }
  //   console.log(Object.keys(todoListData));
  todoTitle.textContent = category;
  const taskRemaining = todoListData[`${category}`]?.length;
  taskCount.textContent = `${
    taskRemaining !== 0 ? taskRemaining : 0
  } tasks remaining`;
  todoListData[`${category}`]?.map((todo, i) => {
    renderTodoHelper(todo, i);
  });
};

// App Init
const init = () => {
  renderMyLists();
  renderTaskList(Object.keys(todoListData)[0]);
};

init();

// Event Listener
createListBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newItem = newListItem.value;

  addMyList(newListItem.value, newListItem.id);

  todoListData[`${newItem}`] = [];

  selectingMyList();

  if (Object.keys(todoListData).length === 1) {
    todoTitle.textContent = Object.keys(todoListData)[0];
    taskList.querySelector("li:first-child").classList.add("active-list");
  }
});

createTodoBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addMyList(newTaskItem.value, newTaskItem.id);
});

const selectedLink = function () {
  taskList.querySelectorAll("li").forEach((e) => {
    e.classList.remove("active-list");
  });
};

const selectingMyList = function () {
  taskList.querySelectorAll("li").forEach((e) => {
    e.addEventListener("click", () => {
      selectedLink();
      e.classList.add("active-list");

      todoList.replaceChildren();
      renderTaskList(e.textContent);
    });
  });
};

// Delete Stuff
const todoListHelper = function () {
  const category = todoTitle.textContent;

  todoList.querySelectorAll(".task input[type=checkbox]").forEach((list, i) => {
    if (!list.checked) return;

    const delTitle = list.nextElementSibling.textContent.trim();
    console.log(delTitle);
    todoListData[`${category}`] = todoListData[`${category}`].filter(
      (value) => value !== delTitle
    );

    const taskRemaining = todoListData[`${category}`]?.length;
    taskCount.textContent = `${
      taskRemaining !== 0 ? taskRemaining : 0
    } tasks remaining`;
    list.parentElement.remove();
  });
};

clearTask.addEventListener("click", todoListHelper);

delList.addEventListener("click", () => {
  const category = todoTitle.textContent;
  if (!category) return;
  delete todoListData[`${category}`];
  console.log(category);
  todoList.replaceChildren();
  taskList.replaceChildren();
  todoTitle.textContent = "";

  init();
  selectingMyList();
});

selectingMyList();

// // Codewars
// function sumArr(a, b) {
//   let arr1 = [];

//   for (let i = 0; i < a.length; i++) {
//     let result = +a[i] + +b[i];
//     arr1.push(`${result}`);
//   }

//   return arr1;
// }

// console.log(sumArr(test1, test2));
