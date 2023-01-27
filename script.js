const allClear = document.querySelector('.all-clear');
const percent = document.querySelector('.percentage');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal');
const calcText = document.getElementById('calc-text');
const num = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const negative = document.querySelector('.negative');


let prevNumber = '';
let operatorCalculation = '';
let currentNumber = '0';

const clearScreen = () => {
    prevNumber = '';
    operatorCalculation = '';
    currentNumber = '0';
}

// function updateResult(number) {
//     calcText.value += number;
//     return number;
// }

// Bentuk lain fungsi updateResult
const updateResult = (number) => {
    calcText.value = number;
}

const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
}

const inputOperator = (operator) => {
    // Jika operator ditekan 2x maka prevNumber tidak akan diubah
    if(operatorCalculation === '') prevNumber = currentNumber;
    operatorCalculation = operator;
    currentNumber = '';
}

const decimalNumber = (dot) => {
    if(currentNumber.includes('.')) return;
    currentNumber += dot;
}

const percentCalculation = () => {
    if(currentNumber === '0') return;
    currentNumber = parseInt(currentNumber) / 100;
}

const negativeTransform = () => {
    if(currentNumber === '0') return;
    currentNumber *= -1;
}

const calculate = () => {
    let result = '';
    switch(operatorCalculation){
        case '+':
            result = parseFloat(prevNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(prevNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(prevNumber) * parseFloat(currentNumber);
            break;
        case '/':
            result = parseFloat(prevNumber) / parseFloat(currentNumber);
            break;
        default:
            return;
    }

    currentNumber = result;
    operatorCalculation = '';
}

allClear.addEventListener('click', function() {
    clearScreen();
    updateResult(currentNumber);
});

num.forEach((numbers) => {
    numbers.addEventListener('click', function(e) {
        inputNumber(e.target.value);
        updateResult(currentNumber);
    });
});

operator.forEach((operators) => {
    operators.addEventListener('click', function(e) {
        inputOperator(e.target.value);
    });
});

equal.addEventListener('click', function() {
    calculate();
    updateResult(currentNumber);
});

decimal.addEventListener('click', (e) => {
    decimalNumber(e.target.value);
    updateResult(currentNumber);
});

percent.addEventListener('click', () => {
    percentCalculation();
    updateResult(currentNumber);
});

negative.addEventListener('click', () => {
    negativeTransform();
    updateResult(currentNumber);
});