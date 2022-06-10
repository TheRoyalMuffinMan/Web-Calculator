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
let number = "7", expression = []

// isNumber Script
function isNumber(num) {
    if (isNaN(num)) {
        lastText.textContent = "SYNTAX ERROR";
        currText.textContent = "0";
        number = "";
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

// Key Convert Script
function convert(key) {
    return String.fromCharCode((96 <= key && key <= 105) ? key-48 : key)
}

// Calculating Functions
function calculate(expr) {
    return round(OPERATORS[expr[1]](parseFloat(expr[0]), parseFloat(expr[2])), 4);
}


function enter() {
    if (number && expression.length == OPERATOR_EXPRESSION && isNumber(number)) {
        let a = parseFloat(expression[0]), op = expression[1], b = parseFloat(number);
        let res = round(OPERATORS[op](a, b), 4);
        lastText.textContent = `${a} ${op} ${b} = `
        currText.textContent = `${res}`
        expression = [];
        number = res.toString();
    }
}

function del() {
    number = number.slice(0, -1);
    currText.textContent = `${number}`;
}

function clear() {
    lastText.textContent = "";
    currText.textContent = "0";
    number = "", expression = [];
}

function dot(event) {
    let key = (event.keyCode === undefined) ? event.target.textContent : convert(event.keyCode);
    number += key;
    currText.textContent = number;
}

function operator(event) {
    let key = (event.keyCode === undefined) ? event.target.value : convert(event.keyCode);
    if (!isNumber(number)) return;

    if (number) expression.push(number);
    if (expression.length == MAX_EXPRESSION) {
        number = calculate(expression).toString();
        expression = [number];

    }

    if (expression.length == MIN_EXPRESSION) {
        expression.push(key);
        lastText.textContent = `${number} ${key}`
        currText.textContent = "";
    }
    number = "";
}

function operand(event) {
    let key = (event.keyCode === undefined) ? event.target.textContent : convert(event.keyCode);
    if (number[0] != '0') {
        number += key;
    } else {
        number = key;
    }
    currText.textContent = number
}

// Main Calculator
function calculator() {
    document.addEventListener("keypress", function(event) {
        console.log(event.keyCode);
        if (event.keyCode >= 48 && event.keyCode <= 57) {
            operand(event); return;
        }
        switch (event.keyCode) {
            case 13: enter(); return; // enter
            case 42: // multiplication
            case 43: // addition
            case 45: // subtraction
            case 47: // divison
            case 99: // exponentiation
                operator(event); return;
            case 46: dot(event); return; // dot
            case 126: clear(); return; // ~
            case 127: del(); // backspace
        }
    });

    clearBtn.addEventListener("click", clear);
    deleteBtn.addEventListener("click", del);
    enterBtn.addEventListener("click", enter);
    dotBtn.addEventListener("click", dot);

    operatorBtns.forEach(op => {
        op.addEventListener("click", operator);  
    });

    numberBtns.forEach(num => {
        num.addEventListener("click", operand);
    });
}

window.onload = () => {
    calculator();
}