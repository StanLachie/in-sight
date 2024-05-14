import { crawlHackerNews } from "./crawlers/hackerNews";
import { crawlDevTo } from "./crawlers/devTo";
import { crawlProductHunt } from "./crawlers/productHunt";
import nodemailer from "nodemailer";
import axios from "axios";

const sendEmail = async (
  platforms: {
    platform: string;
    articles: {
      title: string;
      link: string | undefined;
    }[];
  }[]
) => {
  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: Number(process.env.PORT),
    secure: Number(process.env.PORT) === 465,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  let htmlContent = `<h1>In-Sight</h1>
  <p>A daily dose of tech news from the best sources.</p>`;

  for (const platform of platforms) {
    htmlContent += `<h2>${platform.platform}</h2>`;
    htmlContent += `<ul>`;

    for (const article of platform.articles) {
      htmlContent += `<li><a href="${article.link}">${article.title}</a></li>`;
    }

    htmlContent += `</ul>`;
  }

  let mailOptions = {
    from: `"In-Sight by Lachie" <${process.env.FROM}>`,
    to: process.env.TO,
    subject: "Your Daily In-Sight",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);

    let embedDescription = "";
    for (const platform of platforms) {
      embedDescription += `**${platform.platform}**\n`;
      for (const article of platform.articles) {
        embedDescription += `[${article.title}](${article.link})\n`;
      }
      embedDescription += `\n`;
    }

    if (process.env.DISCORD_WEBHOOK_URL) {
      await axios(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          embeds: [
            {
              title: "Daily Insight Sent",
              description: `<@${process.env.DISCORD_USER_ID}>, Your daily in-sight has been successfully sent to your email.\n\n${embedDescription}`,
              color: 3066993,
              fields: [
                {
                  name: "Status",
                  value: "✅ Success",
                  inline: true,
                },
              ],
              footer: {
                text: "Check your inbox for more details 📬",
              },
            },
          ],
        },
      });
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const main = async () => {
  const devToArticles = await crawlDevTo();
  const hackerNewsArticles = await crawlHackerNews();
  const productHuntArticles = await crawlProductHunt();

  await sendEmail([
    {
      platform: "Hacker News",
      articles: hackerNewsArticles,
    },
    {
      platform: "Dev.to",
      articles: devToArticles,
    },
    {
      platform: "Product Hunt",
      articles: productHuntArticles,
    },
  ]);
};

main();
