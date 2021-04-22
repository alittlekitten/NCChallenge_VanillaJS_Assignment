// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const body = document.querySelector("body");
const h2 = document.querySelector("h2");

function handleResize() {
  const width = window.innerWidth;
  if (width < 500) {
    body.style.backgroundColor = "#2D8ED6";
  } else if (width >= 500 && width < 1000) {
    body.style.backgroundColor = "#904EAD";
  } else {
    body.style.backgroundColor = "#EEBC12";
  }
}

window.addEventListener("resize", handleResize);
