const drawQty = document.getElementById("quantity");
const drawMinValue = document.getElementById("min-value");
const drawMaxValue = document.getElementById("max-value");
const btnSubmit = document.getElementById("btn-submit");
const form = document.querySelector("form");

console.log(drawQty);
console.log(drawMinValue);
console.log(drawMaxValue);

drawMinValue.addEventListener("input", () => {
  drawMinValue.setCustomValidity("");
});

drawMaxValue.addEventListener("input", () => {
  drawMinValue.setCustomValidity("");
});

form.onsubmit = (event) => {
  event.preventDefault();
  if (!validadeForm()) {
    return;
  }
  const drawValue = Number(drawQty.value);
  const minValue = Number(drawMinValue.value);
  const maxValue = Number(drawMaxValue.value);
  console.log(`drawValue[${drawValue}] minValue[${minValue}] maxValue[${maxValue}]`);

  console.log("Formulário válido");
  drawNumbers(drawValue, minValue, maxValue);
  form.reset();
};

function validadeForm() {
  drawMinValue.setCustomValidity("");

  if (Number(drawMinValue.value) >= Number(drawMaxValue.value)) {
    drawMinValue.setCustomValidity(`O valor precisa ser menor que ${drawMaxValue.value}`);
    form.reportValidity();
    return false;
  }

  return true;
}

function drawNumbers(drawQty, minValue, maxValue) {
  const drawResults = [];

  for (let i = 0; i < drawQty; i++) {
    const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    drawResults.push(randomNumber);
  }

  console.log(drawResults);
}
