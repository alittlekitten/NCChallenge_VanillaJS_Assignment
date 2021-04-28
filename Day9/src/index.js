// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const h3 = document.querySelector("h3"),
  slider = document.querySelector(".slider"),
  input = document.querySelector(".set_number"),
  play = document.querySelector(".play"),
  result1 = document.querySelector(".result1"),
  result2 = document.querySelector(".result2");

let max = 50;

function show_question(range) {
  const text = `Generate a number between 0 and ${range}`;
  h3.innerHTML = text;
}

function setMax(event) {
  const slider = event.target;
  max = parseInt(slider.value);
  show_question(max);
}

function playClick(event) {
  const input_value = parseInt(input.value); // 문자형태의 input.value를 숫자형태로 바꿔준다
  const answer = Math.floor(Math.random() * max);
  result1.innerHTML = `You chose: ${input_value}, the machine chose: ${answer}`;

  if (answer === input_value) {
    result2.innerHTML = `You won!`;
  } else {
    result2.innerHTML = `You lost!`;
  }
}

function init() {
  slider.addEventListener("change", setMax);
  play.addEventListener("click", playClick);
}

init();
