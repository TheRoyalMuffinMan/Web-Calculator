const OPERATORS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
};

const lastText = document.querySelector(".last");
const currText = document.querySelector(".current");

const clearBtn = document.querySelector("#CLE");
const deleteBtn = document.querySelector("#DEL");
const enterBtn = document.querySelector("#ent");
const dotBtn = document.querySelector("#dot");
const operatorBtns = document.querySelectorAll(".ops");
const numberBtns = document.querySelectorAll(".num"); 

function enter() {

}

function del() {
    console.log("hi");
}

function clear() {
    lastText.textContent = "";
    currText.textContent = "0";
}

function calculator() {
    clearBtn.addEventListener("click", clear);
    deleteBtn.addEventListener("click", del);
    enterBtn.addEventListener("click", enter);

    operatorBtns.forEach(operator => {
        operator.addEventListener("click", function(event) {
            console.log(event.target.textContent);
        });  
    });

    numberBtns.forEach(number => {
        addEventListener("click", function(event) {

        }); 
    });
}

window.onload = () => {
    calculator();
}