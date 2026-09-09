const drawQty = document.getElementById("quantity");
const drawMinValue = document.getElementById("min-value");
const drawMaxValue = document.getElementById("max-value");
const btnSubmit = document.getElementById("btn-submit");
const btnReroll = document.getElementById("btn-reroll");
const drawUniqueNumber = document.getElementById("unique-number");
const form = document.querySelector("form");
const result = document.querySelector(".result");
const resultList = document.getElementById("result-list");

console.log(drawQty);
console.log(drawMinValue);
console.log(drawMaxValue);
console.log(resultList);

drawMinValue.addEventListener("input", () => {
  drawMinValue.setCustomValidity("");
  drawQty.setCustomValidity("");
});

drawMaxValue.addEventListener("input", () => {
  drawMaxValue.setCustomValidity("");
  drawQty.setCustomValidity("");
});

drawQty.addEventListener("input", () => {
  drawQty.setCustomValidity("");
});

drawUniqueNumber.addEventListener("input", () => {
  drawQty.setCustomValidity("");
});

form.onsubmit = (event) => {
  event.preventDefault();

  const drawValue = Number(drawQty.value);
  const minValue = Number(drawMinValue.value);
  const maxValue = Number(drawMaxValue.value);
  const isUniqueNumber = Boolean(drawUniqueNumber.checked);

  if (!validadeForm(drawValue, minValue, maxValue, isUniqueNumber)) {
    return;
  }

  console.log(`drawValue[${drawValue}] minValue[${minValue}] maxValue[${maxValue}]`);

  console.log("Formulário válido");
  drawNumbers(drawValue, minValue, maxValue, isUniqueNumber);

  form.reset();
};

btnReroll.onclick = () => {
  form.classList.remove("hidden");
  result.classList.add("hidden");
  resultList.innerHTML = "";
};

function validadeForm(drawValue, minValue, maxValue, isUniqueNumber) {
  drawMinValue.setCustomValidity("");

  if (minValue >= maxValue) {
    drawMinValue.setCustomValidity(`O valor precisa ser menor que ${drawMaxValue.value}`);
    form.reportValidity();
    return false;
  }

  const availableNumbers = maxValue - minValue + 1 - drawValue;
  console.log(availableNumbers);
  if (isUniqueNumber && availableNumbers < 0) {
    drawQty.setCustomValidity("A quantidade de números sorteados precisa ser menor que os números unicos disponíveis");
    form.reportValidity();
    return false;
  }

  form.classList.add("hidden");
  result.classList.remove("hidden");
  return true;
}

function drawNumbers(drawQty, minValue, maxValue, isUniqueNumber) {
  const drawResults = [];

  if (isUniqueNumber) {
    while (drawResults.length < drawQty) {
      const number = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

      if (!drawResults.includes(number)) {
        drawResults.push(number);
      }
      console.log(drawResults);
    }
  } else {
    for (let i = 0; i < drawQty; i++) {
      const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      drawResults.push(randomNumber);
    }
  }

  console.log(drawResults);
  showResult(drawResults);
}

function showResult(results) {
  resultList.innerHTML = "";
  results.forEach((element) => {
    const item = document.createElement("li");
    item.textContent = String(element).padStart(2, "0");
    resultList.append(item);
  });
}
