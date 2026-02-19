import { chromium } from 'playwright'
import { execSync, spawn } from 'child_process'
import { existsSync } from 'fs'
import path from 'path'

const OUT = '/home/keio/Desktop/coding/portfolio/public/screenshots'

async function shot(page, file, width = 1280, height = 800) {
  await page.setViewportSize({ width, height })
  await page.screenshot({ path: path.join(OUT, file), fullPage: false })
  console.log('✓', file)
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext()

  // ── 1. FormFiller (local dev server) ────────────────────────────────────
  console.log('Starting formfiller dev server...')
  const devServer = spawn('npm', ['run', 'dev', '--', '--port', '5174'], {
    cwd: '/home/keio/Desktop/coding/formfiller',
    stdio: 'pipe',
  })
  await new Promise((res) => setTimeout(res, 4000))

  const ff = await ctx.newPage()
  await ff.goto('http://localhost:5174', { waitUntil: 'networkidle', timeout: 15000 })
  await ff.waitForTimeout(1000)
  await shot(ff, 'formfiller.png')
  devServer.kill()
  await ff.close()

  // ── 2. GitHub README pages ───────────────────────────────────────────────
  const repos = [
    { url: 'https://github.com/jussiohag/jobfinder', file: 'jobfinder.png' },
    { url: 'https://github.com/jussiohag/web_scraper', file: 'web-scraper.png' },
    { url: 'https://github.com/jussiohag/linkedin-tool', file: 'linkedin-tool.png' },
  ]

  for (const { url, file } of repos) {
    const p = await ctx.newPage()
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
    await p.waitForTimeout(2000)

    // Hide GitHub header/sticky bars, focus on README
    await p.evaluate(() => {
      const header = document.querySelector('.AppHeader, .Header')
      if (header) header.style.display = 'none'
      const sticky = document.querySelectorAll('[data-sticky], .js-notification-shelf')
      sticky.forEach(el => el.style.display = 'none')
    })

    // Scroll to README
    const readme = await p.$('article.markdown-body, #readme')
    if (readme) {
      await readme.scrollIntoViewIfNeeded()
    }

    await p.setViewportSize({ width: 1280, height: 800 })
    await p.screenshot({ path: path.join(OUT, file) })
    console.log('✓', file)
    await p.close()
    await new Promise(r => setTimeout(r, 2000))
  }

  await browser.close()
  console.log('\nAll done!')
}

main().catch(err => { console.error(err); process.exit(1) })
