import { fetchPage } from "../utils/fetchPage.js";
import cheerio from "cheerio";

export const crawlProductHunt = async () => {
  const url = "https://www.producthunt.com/";
  const html = await fetchPage(url);
  const $ = cheerio.load(html);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let products: {
    title: string;
    link: string | undefined;
  }[] = [];
  let count = 0;

  $(`[data-test^="post-item"]`).each((index, element) => {
    if (count < 5) {
      const title = $(element).find(`[data-test^="post-name"]`).text();
      const link = $(element).find("a").attr("href");
      const fullLink = `https://www.producthunt.com${link}`;

      products.push({ title, link: fullLink });
      count++;
    } else {
      return false;
    }
  });

  return products;
};
