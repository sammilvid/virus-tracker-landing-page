import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

function getSection(source, className) {
  const pattern = new RegExp(
    `<section class="${className}"[\\s\\S]*?<\\/section>`,
    "i"
  );
  return source.match(pattern)?.[0] ?? "";
}

test("hero stays simplified but becomes a presentation cover slide", () => {
  const hero = getSection(html, "hero");

  assert.ok(hero.includes('class="hero-map"'), "hero should include a map layer");
  assert.ok(hero.includes('href="#intro"'), "hero should point into the presentation");
  assert.ok(!hero.includes('class="waitlist-form"'), "hero should not contain the email form");
  assert.ok(!hero.includes('class="hero-metrics"'), "hero should not contain metric cards");
  assert.ok(!hero.includes('class="visual-side"'), "hero should not contain side status cards");
});

test("page includes the required assignment presentation sections", () => {
  assert.ok(
    html.includes('class="presentation-slide intro-slide" id="intro"'),
    "page should include the introduction slide"
  );
  assert.ok(
    html.includes('class="presentation-slide landscape-slide" id="landscape"'),
    "page should include the competitive landscape slide"
  );
  assert.ok(
    html.includes('class="presentation-slide audience-slide" id="audience"'),
    "page should include the persona and value proposition slide"
  );
  assert.ok(
    html.includes('class="presentation-slide media-slide" id="media"'),
    "page should include the media and communications slide"
  );
  assert.ok(
    html.includes('class="presentation-slide closing-slide" id="closing"'),
    "page should include the conclusion slide"
  );
});

test("media section includes every presentation PNG in the gallery", () => {
  const media = getSection(html, "presentation-slide media-slide");
  const galleryMatch = media.match(
    /<div class="media-gallery"[\s\S]*?<\/div>/i
  );
  const gallery = galleryMatch?.[0] ?? "";
  const imageMatches = [
    ...gallery.matchAll(/<img[^>]+src="([^"]+\.png)"/g)
  ].map((match) => match[1]);

  assert.ok(media.includes('class="media-gallery"'), "media section should include a gallery");
  assert.deepEqual(imageMatches, [
    "cycle.png",
    "caregiverdashboard.png",
    "hyperlocal.png",
    "mombaby.png",
    "peaceofmind.png",
    "realisitcbabymom.png",
    "tipoftheday.png"
  ]);
});

test("featured media row uses the requested three images in order", () => {
  const media = getSection(html, "presentation-slide media-slide");
  const featureBlockMatch = media.match(
    /<div class="media-board"[\s\S]*?<\/div>\s*<div class="gallery-intro">/i
  );
  const featureBlock = featureBlockMatch?.[0] ?? "";
  const featureImages = [
    ...featureBlock.matchAll(/<img[^>]+src="([^"]+\.png)"/g)
  ].map((match) => match[1]);

  assert.deepEqual(featureImages, [
    "hyperlocal.png",
    "realisitcbabymom.png",
    "tipoftheday.png"
  ]);
});

test("media gallery heading is simplified", () => {
  const media = getSection(html, "presentation-slide media-slide");

  assert.ok(media.includes("<h3>Media section</h3>"));
  assert.ok(!media.includes("PNG"), "media section should not mention PNG");
});

test("conclusion no longer includes the recommended next step card", () => {
  const closing = getSection(html, "presentation-slide closing-slide");

  assert.ok(!closing.includes("Recommended next step"));
  assert.ok(!closing.includes("Test messaging before pushing pricing."));
});

test("page is no longer a waitlist funnel and styles define full-screen slides", () => {
  assert.ok(!html.includes('id="waitlist"'), "page should not include the waitlist anchor");
  assert.ok(!html.includes("waitlist-form"), "page should not include the waitlist form");
  assert.ok(!html.includes('class="cta-banner"'), "page should not include the old CTA banner");
  assert.ok(html.includes('href="#intro"'), "presentation should start from the intro anchor");
  assert.ok(css.includes(".presentation-slide"), "styles should define presentation slides");
  assert.ok(css.includes("100svh"), "styles should use viewport-height slides");
  assert.ok(css.includes(".intro-shell .slide-lead"), "intro section should have custom full-width lead styling");
});
