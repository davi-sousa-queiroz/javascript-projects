function add() {
  const firstInput = document.getElementById('firstNumber');
  const secondInput = document.getElementById('secondNumber');

  const num1 = Number(firstInput.value);
  const num2 = Number(secondInput.value);

  return num1 + num2;
}

function showResult(result) {
  const box = document.getElementById('resultValue');
  box.textContent = result;
}

const adderForm = document.getElementById('adder-form');

adderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const result = add();
  showResult(result);
});