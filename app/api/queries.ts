import { QueryClient, queryOptions } from "@tanstack/react-query";

import { getCampaign } from "./requests";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
    },
  },
});

export const campaignQuery = (campaignUrl: string) =>
  queryOptions({
    queryKey: ["campaign", campaignUrl],
    queryFn: () => getCampaign(campaignUrl),
  });
