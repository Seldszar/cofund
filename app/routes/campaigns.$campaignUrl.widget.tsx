import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";

import { campaignQuery, queryClient } from "~/api/queries";
import { useCurrencyFormat } from "~/hooks/currency";
import { styled } from "~/styled-system/jsx";

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const campaignUrl = params.campaignUrl as string;

  return {
    campaign: await queryClient.ensureQueryData(campaignQuery(campaignUrl)),
  };
}

export default function Component() {
  const loaderData = useLoaderData<typeof clientLoader>();

  const { data } = useQuery({
    ...campaignQuery(loaderData.campaign.url),

    initialData: loaderData.campaign,
    refetchInterval: 60_000,
  });

  const currencyFormat = useCurrencyFormat(data.currencyCode);

  return (
    <styled.div css={{ bg: "white", display: "flex", overflow: "hidden", rounded: "md" }}>
      <styled.img css={{ aspectRatio: "square", flex: "none", objectFit: "cover", w: 28 }} src={data.imageUrl} />
      <styled.div css={{ flex: 1, p: 4, pb: 2 }}>
        <styled.div css={{ fontSize: "xl", fontWeight: "bold", truncate: true }}>{data.name}</styled.div>
        <styled.div css={{ fontSize: "lg" }}>{currencyFormat.format(data.currentAmount)} <styled.span css={{ color: "#767676", fontSize: "xs" }}>raised of {currencyFormat.format(data.goalAmount)} goal</styled.span></styled.div>
        <styled.div css={{ bg: "#e6f6ef", mt: 1, rounded: "full" }}>
          <styled.div css={{ bg: "#02a95c", h: 1, rounded: "full" }} style={{ width: `${Math.min(data.currentAmount / data.goalAmount * 100, 100)}%` }} />
        </styled.div>
        <styled.div css={{ color: "#767676", fontSize: "xs", mt: 4 }}>{data.shortUrl}</styled.div>
      </styled.div>
    </styled.div>
  );
}
