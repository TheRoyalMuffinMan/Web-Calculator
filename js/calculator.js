const MIN_EXPRESSION = 1, OPERATOR_EXPRESSION = 2, MAX_EXPRESSION = 3;
const OPERATORS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "/": (a, b) => a / b,
    "^": (a, b) => a ** b
};

const lastText = document.querySelector(".last");
const currText = document.querySelector(".current");

const clearBtn = document.querySelector("#CLE");
const deleteBtn = document.querySelector("#DEL");
const enterBtn = document.querySelector("#ent");
const dotBtn = document.querySelector("#dot");
const operatorBtns = document.querySelectorAll(".ops");
const numberBtns = document.querySelectorAll(".num");

let operand = "7", expression = []

// isNumber Script
function isNumber(num) {
    if (isNaN(num)) {
        lastText.textContent = "SYNTAX ERROR";
        currText.textContent = "0";
        operand = "";
        return false;
    }
    return true;
}

// Rounding Script
function round(num, scale) {
    if (!("" + num).includes("e")) {
        return +(Math.round(num + "e+" + scale)  + "e-" + scale);
    } else {
        let arr = ("" + num).split("e");
        let sig = ""
        if (+arr[1] + scale > 0) {
            sig = "+";
        }
        return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
}

// Calculating Functions
function calculate(expr) {
    return round(OPERATORS[expr[1]](parseFloat(expr[0]), parseFloat(expr[2])), 4);
}

function enter() {
    if (operand && expression.length == OPERATOR_EXPRESSION && isNumber(operand)) {
        let a = parseFloat(expression[0]), op = expression[1], b = parseFloat(operand);
        let res = round(OPERATORS[op](a, b), 4);
        lastText.textContent = `${a} ${op} ${b} = `
        currText.textContent = `${res}`
        expression = [];
        operand = res.toString();
    }
}

function del() {
    operand = (operand.length > 1) ? operand.slice(0, -1) : "";
    currText.textContent = `${(operand) ? parseFloat(operand) : ""}`;
}

function clear() {
    lastText.textContent = "";
    currText.textContent = "0";
    operand = "", expression = [];
}

// Main Calculator
function calculator() {
    clearBtn.addEventListener("click", clear);
    deleteBtn.addEventListener("click", del);
    enterBtn.addEventListener("click", enter);
    dotBtn.addEventListener("click", function(event) {
        operand += event.target.textContent;
        currText.textContent = operand;
    });

    operatorBtns.forEach(operator => {
        operator.addEventListener("click", function(event) {
            if (!isNumber(operand)) return;

            if (operand) expression.push(operand);
            if (expression.length == MAX_EXPRESSION) {
                operand = calculate(expression).toString();
                expression = [operand];

            }

            if (expression.length == MIN_EXPRESSION) {
                expression.push(event.target.value);
                lastText.textContent = `${parseFloat(operand)} ${event.target.value}`
                currText.textContent = "";
            }
            operand = "";
        });  
    });

    numberBtns.forEach(number => {
        number.addEventListener("click", function(event) {
            operand += event.target.textContent;
            currText.textContent = operand
        }); 
    });
}

window.onload = () => {
    calculator();
}