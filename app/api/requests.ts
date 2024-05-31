export class RequestError {
  constructor(readonly response: Response) {}
}

async function request<T>(path: string) {
  const response = await fetch(path);

  if (response.ok) {
    return response.json() as T;
  }

  throw new RequestError(response);
}

export async function getCampaign(fundraiserId: string) {
  return request<any>(`/api/campaigns/${fundraiserId}`);
}
