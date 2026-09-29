import {
  CANVAS_PRESETS,
  LIMITS,
  formatCssSnippet,
  geometryMetrics,
  normalizeConfig,
  toCssVariables
} from "./geometry.js";

const sizeInput = document.querySelector("#size");
const strokeInput = document.querySelector("#stroke");
const canvasInput = document.querySelector("#canvas");
const guidesInput = document.querySelector("#guides");
const resetButton = document.querySelector("#reset");
const copyButton = document.querySelector("#copy-css");
const mark = document.querySelector(".g-mark");
const canvas = document.querySelector(".mark-canvas");
const codeOutput = document.querySelector("#css-output");
const sizeValue = document.querySelector("[data-size-value]");
const strokeValue = document.querySelector("[data-stroke-value]");
const innerValue = document.querySelector("[data-inner-value]");
const ratioValue = document.querySelector("[data-ratio-value]");
const status = document.querySelector("[data-status]");

const DEFAULTS = normalizeConfig({
  size: 240,
  stroke: 44,
  canvas: "paper",
  guides: false
});

let config = { ...DEFAULTS };

sizeInput.min = String(LIMITS.size.min);
sizeInput.max = String(LIMITS.size.max);
strokeInput.min = String(LIMITS.stroke.min);
strokeInput.max = String(LIMITS.stroke.max);

function announce(message) {
  status.textContent = "";
  requestAnimationFrame(() => {
    status.textContent = message;
  });
}

function render() {
  config = normalizeConfig(config);
  const metrics = geometryMetrics(config);
  const vars = toCssVariables(config);

  for (const [name, value] of Object.entries(vars)) {
    mark.style.setProperty(name, value);
  }

  canvas.dataset.canvas = config.canvas;
  canvas.classList.toggle("show-guides", config.guides);

  sizeInput.value = String(config.size);
  strokeInput.max = String(Math.min(LIMITS.stroke.max, Math.floor(config.size * 0.28)));
  strokeInput.value = String(config.stroke);
  canvasInput.value = config.canvas;
  guidesInput.checked = config.guides;

  sizeValue.textContent = `${metrics.size}px`;
  strokeValue.textContent = `${metrics.stroke}px`;
  innerValue.textContent = `${metrics.innerDiameter}px`;
  ratioValue.textContent = `${(metrics.strokeRatio * 100).toFixed(1)}%`;

  codeOutput.textContent = formatCssSnippet(config);
}

sizeInput.addEventListener("input", () => {
  config = { ...config, size: Number(sizeInput.value) };
  render();
});

strokeInput.addEventListener("input", () => {
  config = { ...config, stroke: Number(strokeInput.value) };
  render();
});

canvasInput.addEventListener("change", () => {
  config = {
    ...config,
    canvas: CANVAS_PRESETS.includes(canvasInput.value) ? canvasInput.value : "paper"
  };
  render();
});

guidesInput.addEventListener("change", () => {
  config = { ...config, guides: guidesInput.checked };
  render();
});

resetButton.addEventListener("click", () => {
  config = { ...DEFAULTS };
  render();
  announce("Geometry reset to defaults.");
});

copyButton.addEventListener("click", async () => {
  const snippet = formatCssSnippet(config);

  try {
    await navigator.clipboard.writeText(snippet);
    announce("CSS variables copied.");
  } catch {
    announce("Clipboard access is unavailable. Select the CSS snippet manually.");
  }
});

render();
