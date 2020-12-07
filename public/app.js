$(document).ready(() => {
  $.getJSON("/api/todos").then(addTodos).catch(handleError);

  $("#todoInput").keypress((e) => {
    if (e.which === 13) {
      createTodo();
    }
  });

  $(".list").on("click", "li", (e) => {
    updateTodo($(e.currentTarget));
  });

  $(".list").on("click", "span", (e) => {
    e.stopPropagation();
    removeTodo($(e.currentTarget).parent());
  });
});

function addTodos(todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

function addTodo(todo) {
  let newTodo = $(`<li>${todo.name}<span>X</span></li>`);
  newTodo.addClass("task");
  newTodo.data("id", todo._id);
  newTodo.data("completed", todo.completed);
  if (todo.completed) {
    newTodo.addClass("done");
  }
  $(".list").append(newTodo);
}

function handleError(err) {
  console.log(err);
  alert("Error Try Again!!");
}

function createTodo() {
  let useInput = $("#todoInput").val();
  $.post("/api/todos", { name: useInput })
    .then((newTodo) => {
      $("#todoInput").val("");
      addTodo(newTodo);
    })
    .catch(handleError);
}

function updateTodo(todo) {
  let updateUrl = `/api/todos/${todo.data("id")}`,
    isDone = todo.data("completed"),
    updateData = { completed: !isDone };

  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData,
  })
    .then((updatedTodo) => {
      console.log(updatedTodo);
      todo.toggleClass("done");
      todo.data("completed", !isDone);
    })
    .catch(handleError);
}

function removeTodo(todo) {
  let clickedId = todo.data("id"),
    deleteUrl = `/api/todos/${clickedId}`;
  $.ajax({
    method: "DELETE",
    url: deleteUrl,
  })
    .then((data) => {
      todo.remove();
    })
    .catch(handleError);
}
