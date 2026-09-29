export const LIMITS = Object.freeze({
  size: { min: 140, max: 360 },
  stroke: { min: 18, max: 72 }
});

export const CANVAS_PRESETS = Object.freeze(["paper", "ink", "warm"]);

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value)));
}

export function normalizeConfig(input = {}) {
  const size = Math.round(clamp(input.size ?? 240, LIMITS.size.min, LIMITS.size.max));
  const maxStroke = Math.min(LIMITS.stroke.max, Math.floor(size * 0.28));
  const stroke = Math.round(clamp(input.stroke ?? 44, LIMITS.stroke.min, maxStroke));
  const canvas = CANVAS_PRESETS.includes(input.canvas) ? input.canvas : "paper";
  const guides = Boolean(input.guides);

  return { size, stroke, canvas, guides };
}

export function geometryMetrics(config) {
  const normalized = normalizeConfig(config);
  const innerDiameter = normalized.size - normalized.stroke * 2;
  const strokeRatio = normalized.stroke / normalized.size;

  return {
    ...normalized,
    innerDiameter,
    strokeRatio,
    crossbarWidth: Math.round(normalized.size * 0.47),
    crossbarHeight: normalized.stroke
  };
}

export function toCssVariables(config) {
  const metrics = geometryMetrics(config);
  return {
    "--mark-size": `${metrics.size}px`,
    "--mark-stroke": `${metrics.stroke}px`,
    "--crossbar-width": `${metrics.crossbarWidth}px`,
    "--crossbar-height": `${metrics.crossbarHeight}px`
  };
}

export function formatCssSnippet(config) {
  const vars = toCssVariables(config);
  return [
    ".g-mark {",
    ...Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`),
    "}"
  ].join("\n");
}
