// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const select = document.querySelector("select");
const COUNTRY_LS = "country";

function saveCtry() {
  const currValue = select.options[select.selectedIndex].value;
  localStorage.setItem(COUNTRY_LS, currValue);
}

function loadCtry() {
  const loadStorage = localStorage.getItem(COUNTRY_LS);

  if (loadStorage !== null) {
    select.value = loadStorage;
  }
}

function init() {
  select.addEventListener("change", saveCtry);
  loadCtry();
}
init();
