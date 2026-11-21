const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

async function render(browser, artwork) {
  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
  await page.setContent(`<body style="margin:0">${artwork}</body>`);
  await page.evaluate(() => document.fonts.ready);
  const issues = await page.evaluate(() => {
    const fields = Array.from(document.querySelectorAll('svg text'), text => ({
      text: text.textContent, box: text.getBoundingClientRect(),
    }));
    const issues = [];
    for (const [i, { text, box: a }] of fields.entries()) {
      const leftPage = a.left < 512;
      if (a.left < (leftPage ? 36 : 530) || a.right > (leftPage ? 500 : 994) ||
          a.top < 25 || a.bottom > 996) issues.push(`outside page: ${text}`);
      for (const { text: other, box: b } of fields.slice(i + 1)) {
        const width = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (width > 3 && height > 3) issues.push(`overlap: ${text} / ${other}`);
      }
    }
    return issues;
  });
  assert.deepEqual(issues, []);
  const png = await page.screenshot();
  await page.context().close();
  return png;
}

(async () => {
  const artwork = fs.readFileSync(process.argv[2], 'utf8');
  const browser = await chromium.launch({ headless: true, channel: 'chromium' });
  try {
    const first = await render(browser, artwork);
    assert(first.equals(await render(browser, artwork)), 'Independent renders differ');
    assert(first.length <= 1_048_576, 'PNG exceeds the bounty limit');
    fs.writeFileSync(process.argv[3] || 'entry.png', first);
    console.log(`1024 × 1024, ${first.length} bytes, two identical renders`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
