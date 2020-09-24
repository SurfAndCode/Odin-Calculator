
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => (b === 0) ? "Cannot divide by zero" : a / b;
const numbers = document.querySelectorAll(".number");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");
let displayValue = "";
let a,b,method;


function operate(a, b, operator) {
    switch(operator) {
        case "add":
          return add(a,b);
          break
        case "subtract":
          return subtract(a,b);
          break
        case "multiply":
          return multiply(a,b);
          break
        case "divide":
          return divide(a,b);
          break
        default:
          console.log("Something went wrong!");
      }
}

function updateDisplay(displayValue) {
    const display = document.querySelector(".display");
    display.innerText = displayValue;
}

numbers.forEach(number => number.addEventListener("click", (e)=> {
    displayValue = parseFloat(displayValue + e.target.value);
    updateDisplay(displayValue);
    }));

clear.addEventListener("click", () => {
    displayValue = "0";
    a = "";
    b = "";
    updateDisplay(displayValue);
});

del.addEventListener("click", () => {
    displayValue = displayValue.toString()
    displayValue = displayValue.substr(0, displayValue.length - 1);
    displayValue.length > 0 ? updateDisplay(parseFloat(displayValue)) : updateDisplay("0");
});

operators.forEach(operator => operator.addEventListener("click", (e) => {
    if (a) {
        b = displayValue;
        let subresult = operate(a, b, method);
        updateDisplay(parseFloat(subresult.toFixed(7)));
        method = e.target.value;
        a = subresult;
        displayValue = "";
    } else {
        a = displayValue;
        method = e.target.value;
        displayValue = "";
    }
}));

equal.addEventListener("click", ()=> {
    let result = operate(a, displayValue, method);
    updateDisplay(parseFloat(result.toFixed(7)));
    displayValue = "";
    a = "";
    b = "";
});

decimal.addEventListener("click", ()=> {
    displayValue = displayValue.toString()
    if (!displayValue.includes(".")) {
        displayValue = displayValue + ".";
        updateDisplay(displayValue);
    }
});

// Need to implement division by 0 and keyboard support