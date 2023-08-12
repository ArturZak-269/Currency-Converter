const currencies = {
  PLN: "Polski złoty",
  GBP: "Brytyjski Funt",
  EUR: "Euro",
  TRY: "Turecka Lira",
  USD: "Dolar Amerykański",
};

const currencies2 = {
  USD: "Dolar Amerykański",
  TRY: "Turecka Lira",
  EUR: "Euro",
  GBP: "Brytyjski Funt",
  PLN: "Polski złoty",
};

let exchangeRates = {};

const primaryCurrency = document.getElementById("primary");
const secondaryCurrency = document.getElementById("secondary");
primaryCurrency.innerHTML = getOptions(currencies);
secondaryCurrency.innerHTML = getOptions(currencies2);

primaryCurrency.addEventListener("change", fetchCurrencies);

function getOptions(data) {
  return Object.entries(data)
    .map(
      ([country, currency]) =>
        `<option value="${country}">${country} | ${currency}</option>`
    )
    .join("");
}

function fetchCurrencies() {
  const primary = primaryCurrency.value;
  const secondary = secondaryCurrency.value;

  if (exchangeRates[primary]) {
    displayCurrency(exchangeRates[primary], primary, secondary);
  } else {
    fetch(
      "https://v6.exchangerate-api.com/v6/084cf46afd18beaf45e76f4d/latest/" +
        primary
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then((data) => {
        console.log(data);
        exchangeRates[primary] = data;
        displayCurrency(data, primary, secondary);
      })
      .catch((error) => console.error("FETCH ERROR:", error));
  }
}

function displayCurrency(data, primary, secondary) {
  const amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount) || amount <= 0) {
    // Show error message
    alert("Please enter a valid positive amount.");
    return;
  }

  const calculated = amount * data.conversion_rates[secondary];
  document.getElementById("result").style.display = "block";
  document.getElementById("txt-primary").innerText =
    amount + " " + primary + " = ";
  document.getElementById("txt-secondary").innerText =
    calculated.toFixed(2) + " " + secondary;
}

document
  .getElementById("btn-convert")
  .addEventListener("click", fetchCurrencies);
