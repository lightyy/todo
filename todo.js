(() => {
  const form = document.querySelector(".toDoForm");
  const input = form.querySelector("input");
  const pendingUl = document.querySelector(".pendingUl");
  const finishedUl = document.querySelector(".finishedUl");

  let pendingArray = [];
  let finishedArray = [];

  function saveTask() {
    localStorage.setItem("PENDING", JSON.stringify(pendingArray));
    localStorage.setItem("FINISHED", JSON.stringify(finishedArray));
    hideAndShow();
  }

  function hideAndShow() {
    if (pendingArray.length === 0) {
      pendingUl.parentNode.classList.add("hide");
      pendingUl.parentNode.classList.remove("showing");
    } else {
      pendingUl.parentNode.classList.add("showing");
      pendingUl.parentNode.classList.remove("hide");
    }
    if (finishedArray.length === 0) {
      finishedUl.parentNode.classList.add("hide");
      finishedUl.parentNode.classList.remove("showing");
    } else {
      finishedUl.parentNode.classList.add("showing");
      finishedUl.parentNode.classList.remove("hide");
    }
  }

  function delTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    if (li.parentNode.className === "pendingUl") {
      pendingUl.removeChild(li);
      const cleanTask = pendingArray.filter((task) => {
        return task.id !== parseInt(li.id);
      });
      pendingArray = cleanTask;
    } else if (li.parentNode.className === "finishedUl") {
      finishedUl.removeChild(li);
      const cleanTask = finishedArray.filter((task) => {
        return task.id !== parseInt(li.id);
      });
      finishedArray = cleanTask;
    }
    saveTask();
  }

  function paintFinishiTask(text) {
    const newId = finishedArray.length + 1;
    const li = document.createElement("li");
    li.className = "li";
    li.id = newId;
    const span = document.createElement("span");
    span.textContent = `${text}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", delTask);
    const rewindBtn = document.createElement("button");
    rewindBtn.textContent = "⏪";
    rewindBtn.addEventListener("click", (e) => {
      paintTask(span.textContent);
      finishedUl.removeChild(li);
      const cleanTask = finishedArray.filter((task) => {
        return task.id !== parseInt(li.id);
      });
      finishedArray = cleanTask;
      saveTask();
    });
    li.appendChild(rewindBtn);
    li.appendChild(delBtn);
    li.appendChild(span);
    finishedUl.appendChild(li);
    input.value = "";
    taskObj = {
      text: text,
      id: newId,
    };
    finishedArray.push(taskObj);
    saveTask();
  }

  function paintTask(text) {
    const newId = pendingArray.length + 1;
    const li = document.createElement("li");
    li.className = "li";
    li.id = newId;
    const span = document.createElement("span");
    span.textContent = `${text}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", delTask);
    const finishBtn = document.createElement("button");
    finishBtn.textContent = "✅";
    finishBtn.addEventListener("click", (e) => {
      paintFinishiTask(span.textContent);
      pendingUl.removeChild(li);
      const cleanTask = pendingArray.filter((task) => {
        return task.id !== parseInt(li.id);
      });
      pendingArray = cleanTask;
      saveTask();
    });
    li.appendChild(finishBtn);
    li.appendChild(delBtn);
    li.appendChild(span);
    pendingUl.appendChild(li);
    input.value = "";
    taskObj = {
      text: text,
      id: newId,
    };
    pendingArray.push(taskObj);
    saveTask();
  }

  function handleSubmit() {
    event.preventDefault();
    const currentValue = input.value;
    paintTask(currentValue);
    input.value = "";
  }

  function loadTask() {
    const loadedPending = localStorage.getItem("PENDING");
    const loadedFinish = localStorage.getItem("FINISHED");
    if (loadedPending !== null) {
      const parsedPending = JSON.parse(loadedPending);
      parsedPending.forEach((task) => {
        paintTask(task.text);
      });
    }
    if (loadedFinish !== null) {
      const parsedFinish = JSON.parse(loadedFinish);
      parsedFinish.forEach((task) => {
        paintFinishiTask(task.text);
      });
    }
  }

  function init() {
    loadTask();
    form.addEventListener("submit", handleSubmit);
  }
  init();
})();

// const toDoForm = document.querySelector(".js-toDoForm"),
//   toDoInput = toDoForm.querySelector("input"),
//   toDoList = document.querySelector(".js-toDoList");

// const TODOS_LS = "toDos";

// let toDos = [];

// function delTodo(event) {
//   const btn = event.target;
//   const li = btn.parentNode;
//   toDoList.removeChild(li);
//   //filter는 array의 모든 아이템을 통해 함수를 실행하고
//   //true인 아이템들만 가지고 새로운 array를 만들고
//   const cleanToDos = toDos.filter(function (toDo) {
//       //parseInt() : 정수값으로 변환
//     return toDo.id !== parseInt(li.id);
//   });
//   toDos = cleanToDos;
//   saveToDos();
// }

// function saveToDos() {
//   //JSON.stringify 자바스크릡트 오브젝트를 string으로 바꿔줌
//   localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
// }

// function paintToDo(text) {
//   const li = document.createElement("li");
//   const delBtn = document.createElement("button");
//   const newId = toDos.length + 1;
//   delBtn.innerText = "❌";
//   delBtn.addEventListener("click", delTodo);
//   const span = document.createElement("span");
//   span.innerText = text;
//   //부모의value에 값을 넣음
//   li.appendChild(delBtn);
//   li.appendChild(span);
//   li.id = newId;
//   toDoList.appendChild(li);
//   const toDoOj = {
//     text: text,
//     id: newId,
//   };
//   toDos.push(toDoOj);
//   saveToDos();
// }

// function toDOHandleSubmit(event) {
//   event.preventDefault();
//   const currentValue = toDoInput.value;
//   paintToDo(currentValue);
//   //input 초기화
//   toDoInput.value = "";
// }

// function loadToDos() {
//   const loadedToDos = localStorage.getItem(TODOS_LS);
//   if (loadedToDos !== null) {
//     // console.log(loadedToDos);
//     //string 을 자바스크립트 obj로 변환
//     const parsedToDos = JSON.parse(loadedToDos);
//     // console.log(parsedToDos);
//     //array에 담겨있는 함수를 한번씩 사용.
//     parsedToDos.forEach(function (toDo) {
//       // console.log(toDo.text);
//       paintToDo(toDo.text);
//     });
//   }
// }

// function init() {
//   loadToDos();
//   toDoForm.addEventListener("submit", toDOHandleSubmit);
// }

// init();
