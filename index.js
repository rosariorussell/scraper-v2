const puppeteer = require('puppeteer')

const cssSelector = 'input#viewprofile'

const website = 'https://aiamiami.org/membership/members-directory/'

const scrape = async (pageToScrape) => {
  // SET UP PUPPETEER
  const browser = await puppeteer.launch({ devtools: false, headless: true, args: ['--start-fullscreen'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768 })

  // START SCRAPING
  await page.goto(pageToScrape, { 'waitUntil': 'networkidle0' })

  const results = []

  await page.$$eval(cssSelector, el => el[0].click())
  await page.waitForSelector('h2')
  let name = await page.evaluate(()=> document.querySelector('td strong').innerText)
  let company = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[1].innerText)
  let phone = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[7].innerText)
  let email = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[13].innerText)
  let website = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[16].innerText)

  let person = {
    name, company, phone, email, website
  }

  results.push(person)
  await page.goBack()


  await page.$$eval(cssSelector, el => el[1].click())
  await page.waitForSelector('h2')
  name = await page.evaluate(()=> document.querySelector('td strong').innerText)
  company = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[1].innerText)

  phone = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[7].innerText)
  email = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[13].innerText)
  website = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[16].innerText)

  person = {
    name, company, phone, email, website
  }

  results.push(person)
  await page.goBack()


  await page.$$eval(cssSelector, el => el[2].click())
  await page.waitForSelector('h2')
  name = await page.evaluate(()=> document.querySelector('td strong').innerText)
  company = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[1].innerText)

  phone = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[7].innerText)
  email = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[13].innerText)
  website = await page.evaluate(()=> Array.from(document.querySelectorAll('tr td'))[16].innerText)

  person = {
    name, company, phone, email, website
  }

  results.push(person)
  await page.goBack()



  const fs = require('fs-extra')
  for (let result of results) {
    await fs.appendFile('results.csv', `${result.name},${result.company},${result.phone},${result.email},${result.website}\n`)
  }


  await browser.close()

}

scrape(website)
