import { DatePicker } from "./date-picker.js";

customElements.define('date-picker', DatePicker);

document.addEventListener("change", (e) => {
  console.log(e);
})