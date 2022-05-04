export default function makeSlider(labelLetter, id, colorValue) {
  function changeValue(event, id2) {
    let element = event.target;
    let value = document.querySelector(`#${id2}`);
    value.innerHTML = element.value;
    document.querySelector(`#mainColor`);
  }

  let container = document.createElement("div");
  container.className = "sliderContainer";
  let label1 = document.createElement("label");
  label1.innerHTML = labelLetter;
  label1.className = "labelLetter";
  let element = document.createElement("input");
  element.type = "range";
  element.min = 0;
  element.max = 255;
  element.id = id;
  element.value = 255;
  let label2 = document.createElement("label");
  label2.for = "rColor";
  label2.id = colorValue;
  label2.innerText = "255";
  container.appendChild(label1);
  container.appendChild(element);
  container.appendChild(label2);

  document.querySelector(".body").appendChild(container);
  document
    .querySelector(`#${id}`)
    .addEventListener("input", (event) => changeValue(event, colorValue));
}

export function makeMainColor() {
  let COLOR = document.createElement("div");
  COLOR.id = "mainColor";
  COLOR.dataset.rColor = 255;
  COLOR.dataset.gColor = 255;
  COLOR.dataset.bColor = 255;
  COLOR.style.background = "rgb(255,255,255)";
  COLOR.style.borderRadius = "0.5rem";
  document.querySelector(".body").appendChild(COLOR);
}
export function makeRGBInfluence() {
  document
    .querySelector(".body")
    .addEventListener("input", (event) =>
      changeMainColor(event.target.id, event.target.value)
    );

  function changeMainColor(data, value) {
    let COLOR = document.querySelector("#mainColor");
    COLOR.dataset[data] = value;
    COLOR.style.background = `rgb(${COLOR.dataset.rColor},${COLOR.dataset.gColor},${COLOR.dataset.bColor})`;
    console.log(
      RGBToHSL(COLOR.dataset.rColor, COLOR.dataset.gColor, COLOR.dataset.bColor)
    );
  }
}

export function RGBToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  let result = [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
  return [Math.floor(result[0]), Math.floor(result[1]), Math.floor(result[2])];
}
