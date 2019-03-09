const puppeteer = require("puppeteer");
const fs = require("fs-extra");

const cssSelector = "input#viewprofile";
const website = "https://aiamiami.org/membership/members-directory/";
const website2 = "https://aiamiami.org/membership/members-directory/12/";

const scrape = async pageToScrape => {
  // SET UP PUPPETEER
  const browser = await puppeteer.launch({
    devtools: false,
    headless: true,
    args: ["--start-fullscreen"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  // GO TO CORRECT PAGE
  await page.goto(pageToScrape, { waitUntil: "networkidle0" });
  await page.$$eval(cssSelector, el => el[0].click())
  await page.waitForSelector('h2')

  // SCRAPE DATA
  let results = [];
  let name = await page.evaluate(()=> document.querySelector('td strong').innerText)
  let item = {name}
  results.push(item);

  // SAVE DATA TO PIPE SEPARATED CSV
  for (let result of results) {
    await fs.appendFile("results.csv", `${pageToScrape}|${result.name}\n`);
  }

  // CLOSE BROWSER
  await browser.close();
};

const multiPageScrap = async arrayOfPages => {
  for (let page of arrayOfPages) {
    await scrape(page);
  }
};

multiPageScrap([website,website2]);
