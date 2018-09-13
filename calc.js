var oneBtn   = document.getElementById('calc-one');
var twoBtn   = document.getElementById('calc-two');
var threeBtn = document.getElementById('calc-three');
var fourBtn  = document.getElementById('calc-four');
var fiveBtn  = document.getElementById('calc-five');
var sixBtn   = document.getElementById('calc-six');
var sevenBtn = document.getElementById('calc-seven');
var eightBtn = document.getElementById('calc-eight');
var nineBtn  = document.getElementById('calc-nine');
var zeroBtn  = document.getElementById('calc-zero');

var decimalBtn    = document.getElementById('calc-decimal');
var clearBtn      = document.getElementById('calc-clear');
var clearEntryBtn = document.getElementById('calc-clear-entry');
var equalsBtn     = document.getElementById('calc-equals');
var plusBtn       = document.getElementById('calc-plus');
var minusBtn      = document.getElementById('calc-minus');
var divideBtn     = document.getElementById('calc-dicide');
var multiplyBtn   = document.getElementById('calc-multiply');
var negateBtn     = document.getElementById('calc-negate');
var backspaceBtn  = document.getElementById('calc-backspace');

var displayValElement = document.getElementById('calc-display-val');
var historyValElement = document.getElementById('calc-history-val_Inner');

var calcNumBtns      = document.getElementsByClassName("calc-btn-num");
var calcOperatorBtns = document.getElementsByClassName("calc-btn-operator");

var displayVal = '';
var pendingVal;
var historyVal;
var evalStringArray = [];
var clearOnNextClick = true;

var updateDisplayVal = (clickObj) => {
  if (clearOnNextClick) {
    clearBtn.click();
    clearOnNextClick = false;
  }
  let btnText = clickObj.target.innerText;
  displayVal += btnText;
  displayValElement.innerHTML = displayVal;
};
var performOperation = (clickObj) => {
  let operation = clickObj.target.innerText;
  clearOnNextClick = false;

  switch (operation) {
      case '+':
        pendingVal = Number.parseFloat(displayVal);
        displayVal = '';
        displayValElement.innerHTML = displayVal;
        evalStringArray.push(pendingVal);
        historyVal += pendingVal + '+';
        historyValElement.innerHTML = historyVal;

        evalStringArray.push('+');
        break;
      case '−':
        pendingVal = Number.parseFloat(displayVal);
        displayVal = '';
        displayValElement.innerHTML = displayVal;
        evalStringArray.push(pendingVal);
        historyVal += pendingVal + '-';
        historyValElement.innerHTML = historyVal;

        evalStringArray.push('-');
        break;
      case '×':
        pendingVal = Number.parseFloat(displayVal);
        displayVal = '';
        displayValElement.innerHTML = displayVal;
        evalStringArray.push(pendingVal);
        historyVal += pendingVal + '×';
        historyValElement.innerHTML = historyVal;

        evalStringArray.push('*');
        break;
      case '÷':
        pendingVal = Number.parseFloat(displayVal);
        displayVal = '';
        displayValElement.innerHTML = displayVal;
        evalStringArray.push(pendingVal);
        historyVal += pendingVal + '÷';
        historyValElement.innerHTML = historyVal;

        evalStringArray.push('/');
        break;
      case '=':
        pendingVal = Number.parseFloat(displayVal);
        evalStringArray.push(pendingVal);

        historyVal += pendingVal + '=';
        historyValElement.innerHTML = historyVal;

        let evaluation = eval(evalStringArray.join(' '));
        displayValElement.innerHTML = evaluation;

        //console.log('Opperation =', evalStringArray, displayVal);

        clearOnNextClick = true;
        evalStringArray = [];
        displayVal = evaluation;
        pendingVal = undefined;
        break;

      default:
        //console.log('DEFAULT');
        console.log('Something Broke, Sorry...\n Please Let me know \n Bradley Rounds')
        break;
  }
  /*
  console.log('Opperation Done:');
  console.log('  pendingVal', pendingVal);
  console.log('  historyVal', historyVal);
  console.log('  displayVal', displayVal);
  console.log('  evalStringArray', evalStringArray);
  */
};

for (var i = 0; i < calcNumBtns.length; i++)
  calcNumBtns[i].addEventListener('click', updateDisplayVal, false);
for (var i = 0; i < calcOperatorBtns.length; i++)
  calcOperatorBtns[i].addEventListener('click', performOperation, false);

clearBtn.onclick = () => {
  displayVal = '';
  historyVal = '';
  pendingVal = undefined;
  displayValElement.innerHTML = displayVal;
  historyValElement.innerHTML = historyVal;
  evalStringArray = [];
};
clearEntryBtn.onclick = () => {
  displayVal = '';
  displayValElement.innerHTML = displayVal;
};
backspaceBtn.onclick = () => {
  let lengthOfDisplayVal = displayVal.length;
  displayVal = displayVal.slice(0, lengthOfDisplayVal - 1);
  displayValElement.innerHTML = displayVal;
};
negateBtn.onclick = () => {
  let lengthOfDisplayVal = displayVal.length;
  if (displayVal.slice(0,1) === '-')
    displayVal = displayVal.slice(1, lengthOfDisplayVal);
  else
    displayVal = '-' + displayVal;
  displayValElement.innerHTML = displayVal;
}
decimalBtn.onclick = () => {
  displayVal += '.';
  displayValElement.innerHTML = displayVal;
};
