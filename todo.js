const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function delTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  //filter는 array의 모든 아이템을 통해 함수를 실행하고
  //true인 아이템들만 가지고 새로운 array를 만들고
  const cleanToDos = toDos.filter(function (toDo) {
      //parseInt() : 정수값으로 변환
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  //JSON.stringify 자바스크릡트 오브젝트를 string으로 바꿔줌
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delTodo);
  const span = document.createElement("span");
  span.innerText = text;
  //부모의value에 값을 넣음
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoOj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoOj);
  saveToDos();
}

function toDOHandleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  //input 초기화
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // console.log(loadedToDos);
    //string 을 자바스크립트 obj로 변환
    const parsedToDos = JSON.parse(loadedToDos);
    // console.log(parsedToDos);
    //array에 담겨있는 함수를 한번씩 사용.
    parsedToDos.forEach(function (toDo) {
      // console.log(toDo.text);
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", toDOHandleSubmit);
}

init();
