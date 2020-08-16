const getUserName = document.querySelector(".getUserName"),
  greetToUser = document.querySelector(".greetToUser"),
  userNameForm = document.querySelector(".js-userNameForm"),
  toDoContainer = document.querySelector(".js-toDoContainer");

function paintGreeting() {
  const userName = getUserName.value;
  const loadStroageUserName = loadUserName();
  if (loadStroageUserName !== null) {
    getUserName.hidden = true;
    greetToUser.innerText = `Hello! ${loadStroageUserName}.`;
    toDoContainer.style.display = "block";
  } else if (userName) {
    getUserName.hidden = true;
    greetToUser.innerText = `Hello! ${userName}.`;
    saveUserName(userName);
    toDoContainer.style.display = "block";
  } else {
    getUserName.hidden = false;
    toDoContainer.style.display = "none";
  }
}

function saveUserName(name) {
  localStorage.setItem("userName", name);
}

function handleSubmit(event) {
  event.preventDefault();
  paintGreeting();
}

function loadUserName() {
  return localStorage.getItem("userName");
}

function init() {
  paintGreeting();
  userNameForm.addEventListener("submit", handleSubmit);
}

init();
