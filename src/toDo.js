const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".toDoList"),
  doneList = document.querySelector(".doneList");

let toDos = [],
  dones = [];

function saveDones() {
  localStorage.setItem("dones", JSON.stringify(dones));
}

function saveToDos() {
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function deleteToDos(event) {
  const li = event.target.parentNode;
  const parentNode = li.parentNode;
  const parentClassName = parentNode.className;
  if (parentClassName === "doneList") {
    doneList.removeChild(li);
    const newDones = dones.filter(function (toDo) {
      return toDo.id !== li.id;
    });
    dones = newDones;
    saveDones();
  } else {
    toDoList.removeChild(li);
    const newToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = newToDos;
    saveToDos();
  }
}

function handleCheckboxClick(event) {
  const icon = event.target;
  const li = event.target.parentNode;
  const listContainer = li.parentNode;
  const listClassName = listContainer.className;
  if (listClassName === "doneList") {
    const newDones = dones.filter(function (toDo) {
      return toDo.id !== li.id;
    });
    dones = newDones;
    doneList.removeChild(li);
    paintToDos(li.innerText);
    saveDones();
  } else {
    const newToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = newToDos;
    toDoList.removeChild(li);
    paintDones(li.innerText, li.id);
    saveToDos();
  }
}

function paintDones(value, id) {
  const deleteIcon = document.createElement("i");
  const checkBoxIcon = document.createElement("i");
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = value;
  checkBoxIcon.className = "far fa-check-square";
  checkBoxIcon.addEventListener("click", handleCheckboxClick);
  deleteIcon.className = "far fa-times-circle";
  deleteIcon.addEventListener("click", deleteToDos);
  li.id = id;
  li.appendChild(checkBoxIcon);
  li.appendChild(span);
  li.appendChild(deleteIcon);
  doneList.appendChild(li);
  const done = {
    id: li.id,
    text: value,
  };
  dones.push(done);
  saveDones();
}

function paintToDos(value) {
  const deleteIcon = document.createElement("i");
  const checkBoxIcon = document.createElement("i");
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = value;
  checkBoxIcon.className = "far fa-square";
  checkBoxIcon.addEventListener("click", handleCheckboxClick);
  deleteIcon.className = "far fa-times-circle";
  deleteIcon.addEventListener("click", deleteToDos);
  li.id = toDos.length + 1;
  li.appendChild(checkBoxIcon);
  li.appendChild(span);
  li.appendChild(deleteIcon);
  toDoList.appendChild(li);
  const toDo = {
    id: toDos.length + 1,
    text: value,
  };
  toDos.push(toDo);
  saveToDos();
}

function loadDones() {
  const loadDonesStorage = localStorage.getItem("dones");
  const parseDonesStorage = JSON.parse(loadDonesStorage);
  if (loadDonesStorage !== null) {
    parseDonesStorage.forEach(function (toDo) {
      paintDones(toDo.text, toDo.id);
    });
  }
}

function loadToDos() {
  const loadToDoStorage = localStorage.getItem("toDos");
  const parseToDoStorage = JSON.parse(loadToDoStorage);
  if (loadToDoStorage !== null) {
    parseToDoStorage.forEach(function (toDo) {
      paintToDos(toDo.text);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const value = toDoInput.value;
  paintToDos(value);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  loadDones();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
