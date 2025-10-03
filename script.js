const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let shouldResetDisplay = false;

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const btn = event.currentTarget;
    btn.classList.add("pressed");

    let value = btn.value || btn.getAttribute("data-value") || btn.textContent;

    if (value === "X") value = "*";
    if (value === "DEL") value = "DE";

    handleInput(value);

    setTimeout(() => btn.classList.remove("pressed"), 150);
  });
});

function handleInput(value) {
  if (!value) return;

  if (value === "AC") {
    currentInput = "";
    display.value = "";
  } else if (value === "DE") {
    currentInput = currentInput.toString().slice(0, -1);
    display.value = currentInput;
  } else if (value === "=") {
    try {
      if (isValidExpression(currentInput)) {
        const result = eval(currentInput).toString();
        currentInput = result;
        display.value = currentInput;
        shouldResetDisplay = true;
      } else {
        display.value = "Error";
        currentInput = "";
      }
    } catch (error) {
      display.value = "Error";
      currentInput = "";
    }
  } else {
    if (shouldResetDisplay && !isOperator(value)) {
      currentInput = "";
      shouldResetDisplay = false;
    }

    if (
      value === "." &&
      currentInput.includes(".") &&
      !isOperator(currentInput.slice(-1))
    ) {
      return;
    }

    if (isOperator(value) && isOperator(currentInput.slice(-1))) {
      return;
    }

    currentInput += value;
    display.value = currentInput;
  }
}

function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

function isValidExpression(expr) {
  const validChars = /^[0-9+\-*/ ]+$/;
  return validChars.test(expr);
}
