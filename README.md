This Playwright automation project was created for Crawling of the webpage https://www.polovniautomobili.com/ . For the purpouse of collecting data in the avaliable listings.


Before running the tests, make sure you have the following installed:
-Node.js v18+ 
-npm (comes with Node.js)
-Playwright CLI (npm install -D @playwright/test)
-Browser dependencies: npx playwright install
-Optional: Use Visual Studio Code for better TypeScript support


**Configuration and running the tests**
  Install dependencies
    npm install npx playwright install
  Make sure to be in the project directory before running the project

Run the project from the CMD (The CMD comands are given with chrome browser, you can change it to firefox for FireFox, webkit for Safari)
  npx playwright test -g "Data Crawling" --project=chromium --headed
Let the script do its thing, the maximum duration is 30min. You can change the duration by changing the timeout in the config file if you need more data extracted
Once compleated, or once you stop the execution of the script, a csv file will be created in the project folder by the name "results.csv" and it will contain the relevant information of the Lisings from the webpage

Enjoy...

----This script was made for personal academic purpouses----

