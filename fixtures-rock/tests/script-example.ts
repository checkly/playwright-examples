import { chromium } from "playwright"

const browser = await chromium.launch()
const context = await browser.newContext()
const page = await context.newPage()
await page.goto("https://www.checklyhq.com")
