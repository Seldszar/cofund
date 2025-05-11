import { LoaderFunctionArgs, json } from "@remix-run/node";

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
  const response = await fetch("https://graphql.gofundme.com/graphql", {
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "operationName": "Cofund_GetFundraiser",
      "variables": {
        "slug": params.campaignSlug,
      },
      "query": "query Cofund_GetFundraiser($slug: ID!) { fundraiser(slug: $slug) { id title state fundraiserImageUrl currentAmount { amount } goalAmount { amount currencyCode } } }"
    }),
  });

  let data = null;

  if (response.ok) {
    const {
      data: { fundraiser },
    } = await response.json();

    data = {
      title: fundraiser.title,
      imageUrl: fundraiser.fundraiserImageUrl,
      currencyCode: fundraiser.goalAmount.currencyCode,
      currentAmount: fundraiser.currentAmount.amount,
      goalAmount: fundraiser.goalAmount.amount,
      state: fundraiser.state,

      shortUrl: await shortenUrl(`https://www.gofundme.com/f/${params.campaignSlug}`),
    };
  }

  return json(data, {
    headers: {
      "Cache-Control": "s-maxage=30, stale-while-revalidate=30",
    },
  });
}
