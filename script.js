
// Select DOM defined elements for a dynamic and interactive web page
const expressionInput = document.getElementById('expression-input');
const resultDisplay = document.getElementById('result-value');
const evaluateButton = document.getElementById('evaluate');
const clearButton = document.getElementById('clear');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const darkModeToggle = document.getElementById('dark-mode-toggle');


// Add digit or operator to the input field using append
function appendToExpression(value) {
    expressionInput.value += value;
}


// Evaluate prefix or postfix expression based on first index and length of the expression
function evaluateExpression() {
    const expression = expressionInput.value.trim();

    try {
        // Choose evaluation logic based on first character 
        if (isNaN(expression[0]) && expression.split(' ').length > 1) {
            resultDisplay.textContent = evaluatePrefix(expression);
        } else {
            resultDisplay.textContent = evaluatePostfix(expression);
        }// Other unidentified operator or character results an error
    } catch (error) {
        resultDisplay.textContent = 'Error: Invalid Expression';
    }
}


// Evaluate a prefix expression based on LIFO operation
function evaluatePrefix(expression) {
    const tokens = expression.split(' ').reverse();
    const stack = [];

    for (const token of tokens) {
        if (isOperator(token)) {
            const operand1 = stack.pop();
            const operand2 = stack.pop();
            stack.push(operate(token, operand1, operand2));
        } else {
            stack.push(parseFloat(token));
        }
    }
    return stack.pop();
}

// Evaluate a postfix expression based on FIFO operation
function evaluatePostfix(expression) {
    const tokens = expression.split(' ');
    const stack = [];

    for (const token of tokens) {
        if (isOperator(token)) {
            const operand2 = stack.pop();
            const operand1 = stack.pop();
            stack.push(operate(token, operand1, operand2));
        } else {
            stack.push(parseFloat(token));
        }
    }
    return stack.pop();
}

// Check if a token/character is an identified operator or not
function isOperator(token) {
    return ['+', '-', '*', '/'].includes(token);
}

// Perform basic arithmetic operations and throw unidentified operators
function operate(operator, operand1, operand2) {
    switch (operator) {
        case '+': return operand1 + operand2;
        case '-': return operand1 - operand2;
        case '*': return operand1 * operand2;
        case '/': return operand1 / operand2;
        default: throw new Error('Unknown operator');
    }
}

// Delete last elements. Also we can say its LIFO operation
const deleteButton = document.getElementById('delete'); 

// Select necessary elements
deleteButton.id = "delete";
deleteButton.textContent = "Delete";
document.querySelector(".button-grid").appendChild(deleteButton);

// Implement delete function
function deleteLastCharacter() {
    expressionInput.value = expressionInput.value.slice(0, -1);
}
// Add eventlistener to delete button in order to use its corresponding function
deleteButton.addEventListener("click", deleteLastCharacter);


// Clear all input and result display
function clearCalculator() {
    expressionInput.value = '';
    resultDisplay.textContent = '0';
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark');
}

// Add event listeners to all buttons and their functions
evaluateButton.addEventListener('click', evaluateExpression);
clearButton.addEventListener('click', clearCalculator);
darkModeToggle.addEventListener('click', toggleDarkMode);

digitButtons.forEach(button => {
    button.addEventListener('click', () => appendToExpression(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => appendToExpression(` ${button.textContent} `));
});


// Create Print button by defining it and its caller
const printButton = document.createElement("button");
printButton.id = "print";
printButton.textContent = "Print";
document.querySelector(".button-grid").appendChild(printButton);

// Assigning values from the inserted input and its result 
printButton.addEventListener("click", () => {
    const expression = expressionInput.value;
    const result = resultDisplay.textContent;

    // No result in expression or result will return an alert
    if (!expression || !result) {
        alert("Please evaluate an expression first.");
        return;
    }

    // Store data in localStorage
    localStorage.setItem("printExpression", expression);
    localStorage.setItem("printResult", result);

    // Redirect to print.html
    window.location.href = "print.html";
});










