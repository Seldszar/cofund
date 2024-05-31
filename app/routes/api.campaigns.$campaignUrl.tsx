import { LoaderFunctionArgs, json } from "@remix-run/node";
import { parse } from "node-html-parser";

async function shortenUrl(url: string) {
  const response = await fetch("https://gofund.me/url-shortener/v1/shortenUrl", {
    body: JSON.stringify({ long_url: url }),
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return (await response.json()).shortUrl;
  }

  return null;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`https://www.gofundme.com/f/${params.campaignUrl}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
  });

  let data = null;

  if (response.ok) {
    const element = parse(await response.text())
      .getElementById("__NEXT_DATA__");

    if (element) {
      const { props } = JSON.parse(element.textContent);
      const { campaign } = JSON.parse(props.pageProps.donorJourneyNewStateSerialized);

      data = {
        url: campaign["url"],
        name: campaign["fund_name"],
        currencyCode: campaign["currencycode"],
        imageUrl: campaign["campaign_image_url"],
        currentAmount: campaign["current_amount"],
        goalAmount: campaign["goal_amount"],
        state: campaign["state"],

        shortUrl: await shortenUrl(response.url),
      };
    }
  }

  return json(data, {
    headers: {
      "Cache-Control": "s-maxage=30, stale-while-revalidate=30",
    },
  });
}
