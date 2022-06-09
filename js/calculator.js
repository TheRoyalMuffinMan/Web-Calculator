const lastText = document.querySelector(".last");
const currText = document.querySelector(".current");

const btns = document.querySelectorAll("button");
const clearBtn = document.querySelector("#CLE");
let expression = "";


function clear(event) {
    lastText.textContent = "";
    currText.textContent = "0";
    expression = "";
}

function calculator() {
    clearBtn.addEventListener("click", clear);
}

window.onload = () => {
    calculator();
}