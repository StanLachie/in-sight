import { fetchPage } from "../utils/fetchPage.js";
import cheerio from "cheerio";

export const crawlHackerNews = async () => {
  const url = "https://news.ycombinator.com/";
  const html = await fetchPage(url);
  const $ = cheerio.load(html);

  let articles: {
    title: string;
    link: string | undefined;
  }[] = [];
  let count = 0;

  $(".athing").each((index, element) => {
    if (count < 5) {
      const titleElement = $(element).find(".titleline > a");
      const title = titleElement.text().trim();
      const link = titleElement.attr("href");

      articles.push({ title, link });
      count++;
    } else {
      return false;
    }
  });

  return articles;
};
