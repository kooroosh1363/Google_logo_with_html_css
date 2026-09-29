import test from "node:test";
import assert from "node:assert/strict";
import {
  LIMITS,
  formatCssSnippet,
  geometryMetrics,
  normalizeConfig,
  toCssVariables
} from "../assets/geometry.js";

test("normalization clamps size and stroke into valid geometry", () => {
  const config = normalizeConfig({ size: 80, stroke: 200, canvas: "nope", guides: 1 });

  assert.equal(config.size, LIMITS.size.min);
  assert.equal(config.stroke, Math.floor(LIMITS.size.min * 0.28));
  assert.equal(config.canvas, "paper");
  assert.equal(config.guides, true);
});

test("geometry metrics stay internally consistent", () => {
  const metrics = geometryMetrics({ size: 240, stroke: 44 });

  assert.equal(metrics.innerDiameter, 152);
  assert.equal(metrics.crossbarHeight, 44);
  assert.equal(metrics.crossbarWidth, 113);
  assert.equal(Number(metrics.strokeRatio.toFixed(3)), 0.183);
});

test("CSS variables reflect normalized geometry", () => {
  assert.deepEqual(toCssVariables({ size: 240, stroke: 44 }), {
    "--mark-size": "240px",
    "--mark-stroke": "44px",
    "--crossbar-width": "113px",
    "--crossbar-height": "44px"
  });
});

test("generated snippet is deterministic", () => {
  const snippet = formatCssSnippet({ size: 200, stroke: 40 });

  assert.match(snippet, /--mark-size: 200px;/);
  assert.match(snippet, /--mark-stroke: 40px;/);
  assert.match(snippet, /--crossbar-width: 94px;/);
});
