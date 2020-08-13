const activitiesUrls = [
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-1-hello-world-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-1-hello-world-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-2-geometry-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-2-geometry-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-3-array-of-multiples-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-3-array-of-multiples-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-4-get-budget-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-4-get-budget-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-5-broken-keyboard-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-5-broken-keyboard-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-6-highest-occurrence-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-6-highest-occurrence-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-7-word-search-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-7-word-search-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/extra-web-activity",
];

import dotenv from "dotenv";
import puppeteer from "puppeteer";
import csvWriter from "csv-writer";
import { login, getActivityUsers } from "./utils/utils.js";

dotenv.config();
process.setMaxListeners(Infinity);
const createCsvWriter = csvWriter.createObjectCsvWriter;

const activityUrl = activitiesUrls[0];

const main = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(240000);
    await page.setViewport({ width: 1920, height: 926 });

    await page.goto(activityUrl);

    await login(page);
    const availableActivities = await getActivityUsers(page);

    await browser.close();

    const csvWriter = createCsvWriter({
      path: `./output/${availableActivities[0].activityTitle
        .trim()
        .split(" ")
        .join("_")}.csv`,
      header: [
        { id: "activityTitle", title: "Actividad" },
        { id: "userName", title: "Usuario" },
        { id: "description", title: "Descripción" },
      ],
    });

    await csvWriter.writeRecords(availableActivities);
  } catch (error) {
    console.log("valió vrg", error);
  }
};

main();
