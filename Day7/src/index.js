// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoPending = document.querySelector(".js-toDoPending"),
  toDoFinished = document.querySelector(".js-toDoFinished");

const TODOS_LS = "toDos";
const FINISHED_LS = "finished";

let toDos = [];
let finished = [];

// finished array 추가, paintFinished 생성, move버튼들 생성, movePending, deleteFinished, saveFinished 생성

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode; // 지워야할 li
  toDoFinished.removeChild(li);
  // filter는 forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행됨 - id가 아닌것만 골라서 return
  const cleanFinished = finished.filter(function (finished) {
    return finished.id !== parseInt(li.id); // string을 int로 바꿈
  });
  finished = cleanFinished; // toDos가 let이어야 바꿀 수 있다 (const면 안됨)
  saveFinished();
}

function movePending(event) {
  // finished에서 pending으로 이동
  const movePending = event.path[1].childNodes[0].innerHTML;
  deleteFinished(event);
  paintToDo(movePending);
}

function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const notDone = document.createElement("button");
  const span = document.createElement("span");
  const newId = Date.now();
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteFinished);
  notDone.innerHTML = "⏪";
  notDone.addEventListener("click", movePending);
  span.innerText = text; // 안에 적은 내용 가져오기
  li.appendChild(span); // li 안에 자식들 넣기
  li.appendChild(delBtn); // li 안에 삭제버튼 넣기
  li.appendChild(notDone);
  li.id = newId;
  toDoFinished.appendChild(li); // toDoFinished에 li넣기
  const finishedObj = {
    text: text,
    id: newId
  };
  finished.push(finishedObj); // toDos 리스트에 push하기
  saveFinished();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode; // 지워야할 li
  toDoPending.removeChild(li);
  // filter는 forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행됨 - id가 아닌것만 골라서 return
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); // string을 int로 바꿈
  });
  toDos = cleanToDos; // toDos가 let이어야 바꿀 수 있다 (const면 안됨)
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // JSON.stringify는 object를 string으로 변환
}

function moveFinished(event) {
  const moveFinished = event.path[1].childNodes[0].innerHTML;
  deleteToDo(event);
  paintFinished(moveFinished);
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const done = document.createElement("button");
  const span = document.createElement("span");
  const newId = Date.now();
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  done.innerHTML = "✅";
  done.addEventListener("click", moveFinished);
  span.innerText = text; // 안에 적은 내용 가져오기
  li.appendChild(span); // li 안에 자식들 넣기
  li.appendChild(delBtn); // li 안에 삭제버튼 넣기
  li.appendChild(done);
  li.id = newId;
  toDoPending.appendChild(li); // toDoPending에 li넣기
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj); // toDos 리스트에 push하기
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // 작성창을 비워주는 역할
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const finishedToDos = localStorage.getItem(FINISHED_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // Javascript Object Notation 사용 (JSON)
    parsedToDos.forEach(function (toDo) {
      // forEach는 Array를 위한 함수
      paintToDo(toDo.text); // 하나하나 출력해줌
    }); // array에 담겨있는 것들을 하나하나 함수에 넣어줌
  }
  if (finishedToDos !== null) {
    const parsedFinished = JSON.parse(finishedToDos); // Javascript Object Notation 사용 (JSON)
    parsedFinished.forEach(function (toDo) {
      // forEach는 Array를 위한 함수
      paintFinished(toDo.text); // 하나하나 출력해줌
    }); // array에 담겨있는 것들을 하나하나 함수에 넣어줌
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
