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

const primaryCurrency = document.getElementById("primary");
const secondaryCurrency = document.getElementById("secondary");
primaryCurrency.innerHTML = getOptions(currencies);
secondaryCurrency.innerHTML = getOptions(currencies2);

function getOptions(data) {
  return Object.entries(data)
    .map(([country, currency]) => `<option value="${country}">${country} | ${currency}</option>`)
    .join("");
}



document.getElementById("btn-convert").addEventListener("click", fetchCurrencies);

function fetchCurrencies() {
  const primary = primaryCurrency.value;
  const secondary = secondaryCurrency.value;
  const amount = document.getElementById("amount").value;
  // Important: Include your API key below
  fetch("https://v6.exchangerate-api.com/v6/084cf46afd18beaf45e76f4d/latest/" + primary)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      displayCurrency(data, primary, secondary, amount);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}
function displayCurrency(data, primary, secondary, amount) {
  const calculated = amount * data.conversion_rates[secondary];
  document.getElementById("result").setAttribute("style", "display:block");
  document.getElementById("txt-primary").innerText = amount + " " + primary + " = ";
  document.getElementById("txt-secondary").innerText = calculated.toFixed(2) + " " + secondary;
}