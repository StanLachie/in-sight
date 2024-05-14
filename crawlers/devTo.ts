import { fetchPage } from "../utils/fetchPage.js";
import cheerio from "cheerio";

export const crawlDevTo = async () => {
  const url = "https://dev.to/top/week";
  const html = await fetchPage(url);
  const $ = cheerio.load(html);

  let articles: {
    title: string;
    link: string | undefined;
  }[] = [];
  let count = 0;

  $(".crayons-story").each((index, element) => {
    if (count < 5) {
      const title = $(element).find(".crayons-story__title a").text().trim();
      if (!title) return;
      const link =
        "https://dev.to/top/week" +
        $(element).find(".crayons-story__title a").attr("href");

      articles.push({ title, link });
      count++;
    } else {
      return false;
    }
  });

  return articles;
};
