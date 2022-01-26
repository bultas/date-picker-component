export class DatePicker extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("input", (e) => {
      e.stopPropagation()
    })

    this.addEventListener("change", (e) => {
      validate(e, this.getAttribute("invalid-class"));
    })
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = `
      <slot>
    `;
  }
}

function isValid(node) {
  return node.validity.valid && isMinValid(node) && isMaxValid(node);
}

function isMaxValid(node) {
  const max = node.getAttribute("max");

  if (max === null) {
    return true;
  }

  return node.valueAsDate < new Date(max);
}

function isMinValid(node) {
  const min = node.getAttribute("min");

  if (min === null) {
    return true;
  }

  return node.valueAsDate > new Date(min);
}

function validate(e, invalidClass) {
  if (isValid(e.target)) {
    e.target.classList.remove(invalidClass);
  } else {
    e.target.classList.add(invalidClass);
    e.stopPropagation();
  }
}