//---------- DOM ------------------------------------------------------------
const operationButtons = document.querySelectorAll("[data-operation]");
const numberButtons = document.querySelectorAll("[data-number]");
const acBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

//---------- Functionalities: -----------------------------------------------

// Calculator Class
class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperand = previousOperandText;
    this.currentOperand = currentOperandText;
    // as soon as we create a instance of this class we call clearAll()
    this.clearAll(); // to set all the values to default
  }

  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    // to remove the last character
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  // every single time you click each number button one digit will append to our current number
  appendNumber(number) {
    // the entered number is not allowed to have multiple (.) => (period)
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    // dude we should have two variable to compute them together!
    if (isNaN(prev) || isNaN(current)) return;
    this.operation = this.operation === "÷" ? "/" : this.operation;
    computation = eval(`${prev} ${this.operation} ${current}`);
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString().split(".");
    const integerDigits = parseInt(stringNumber[0]);
    const decimalDigits = stringNumber[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation !== undefined) {
      previousOperandText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      previousOperandText.innerText = "";
    }
  }
}

const calculator = new Calculator(previousOperandText, currentOperandText);

//---------- Event listeners -----------------------------------------------
// number keys clicked
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  });
});

// operation keys clicked
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerHTML);
    calculator.updateDisplay();
  });
});

// all clear button clicked
acBtn.addEventListener("click", () => {
  calculator.clearAll();
  calculator.updateDisplay();
});

// delete button clicked
deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// equals button clicked
equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
