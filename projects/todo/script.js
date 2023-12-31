
// clock.js
const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText =
        `${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}`: minutes}`;
        //:${seconds < 10 ? `0${seconds}`: seconds}
}

//To do list.js
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';


let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");

    const check = document.createElement("input"); //ìŠ¤íŽœ ì²´í¬í‘œì‹œ
    check.type = "checkbox";
    const num = toDos.length + 1;
    check.id = "list-" + num;
    check.className = "hidden-box";
    li.appendChild(check);

    const label = document.createElement("label");
    label.htmlFor = "list-" + num;
    label.className = "check-label";
    li.appendChild(label);


    const spanCheck = document.createElement("span"); //TO DO LIST textë‚˜ì—´
    spanCheck.className = "label-box";
    label.appendChild(spanCheck);

    const span = document.createElement("span"); //TO DO LIST textë‚˜ì—´
    span.className = "label-text";
    const newId = toDos.length + 1;
    span.innerText = text;
    label.appendChild(span);

    const delBtn = document.createElement("button"); //ë¦¬ìŠ¤íŠ¸ ì§€ìš°ê¸°ë²„íŠ¼
    delBtn.innerText = "X";
    delBtn.addEventListener('click', deleteToDo)
    li.appendChild(delBtn);

    li.id = newId;
    li.className = "list-item";

    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        })
    };
};

//bg.js
const body = document.querySelector("body"); 
const photoNum = 7;

function callRan() {
    let ranNum = Math.floor((Math.random() * 7) + 1); 
    return ranNum
}

function callPho() {
    let ranNum = callRan();
    /*let url = `img/${ranNum}.jpg`;*/
    let url= `img/4511696.jpg`
    body.style.backgroundImage = `url(${url})`; 
}

// common
function todolistInit() {
    getTime();
    setInterval(getTime, 1000);
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
    callPho();
}

todolistInit();