let calculation = "";

function updateCalculation(number) {
  calculation += number;
  displayCalculation();
}

function calculateEquation(){
  eval(calculation);
  calculation = eval(calculation);
  displayCalculation();
}

function resetCalculation(){
  calculation = 0;
  displayCalculation();
}

function displayCalculation() {
  document.querySelector('.js-result')
    .innerHTML = calculation;
}