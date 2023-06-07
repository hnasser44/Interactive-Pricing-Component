const InputSlider = document.querySelector("input[type='range']");
const Slide = document.querySelector(".slide");
const PageViews = document.querySelector(".page-views");
const price = document.querySelector(".price h2");
const BillingToggle = document.querySelector(".billing .toggle");
const BillingOptionMessage = document.querySelector('.billing-option-message')
let isMonthly = true;

const priceRanges = [
    { pageViews: "10", price: 8 },
    { pageViews: "50", price: 12 },
    { pageViews: "100", price: 16 },
    { pageViews: "500", price: 24 },
    { pageViews: "1", price: 36 },
]

InputSlider.addEventListener("input", (e) => {
  const sliderValue = InputSlider.value;
  Slide.style.width = `${sliderValue}%`;
  const rangeIndex = Math.floor(sliderValue / 20); // Divide by 20 to map the range from 0-100 to index 0-4

  const selectedRange = priceRanges[rangeIndex];

  PageViews.textContent = selectedRange.pageViews;

  if (isMonthly) {
    price.textContent = `$${selectedRange.price}.00`;
  } else {
    const discountedPrice = selectedRange.price * 0.75; // Apply 25% discount
    price.textContent = `$${discountedPrice.toFixed(2)}`;
  }
});

BillingToggle.addEventListener("click", (e) => {
  if (isMonthly) {
    BillingToggle.classList.remove("monthly");
    BillingToggle.classList.add("yearly");
    isMonthly = false;
    BillingOptionMessage.innerHTML = '/ year'

    const currentPrice = parseFloat(price.textContent.slice(1)); // Extract the current price value without the dollar sign
    const discountedPrice = currentPrice * 0.75; // Apply 25% discount to the current price

    price.textContent = `$${discountedPrice.toFixed(2)}`;
  } else {
    BillingToggle.classList.remove("yearly");
    BillingToggle.classList.add("monthly");
    isMonthly = true;
    BillingOptionMessage.innerHTML = '/ month'

    const sliderValue = InputSlider.value;
    const rangeIndex = Math.floor(sliderValue / 20);
    const selectedRange = priceRanges[rangeIndex];

    price.textContent = `$${selectedRange.price}.00`;
  }
});