import { Result, ResultBuilder } from "../../types/result/result";

export default async function(id: string, sessionToken: string | null | undefined): Promise<Result> {
  const apiUrl = process.env.API_URL! + `/projects/${id}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 2000);
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      signal: controller.signal
    });
    if (response.status === 200) {
      return new ResultBuilder()
        .succeed()
        .build();
    }
    return new ResultBuilder()
      .fail()
      .withGeneralError(response.status)
      .build();
  } catch {
    return new ResultBuilder()
      .fail()
      .withGeneralError(503)
      .build();
  } finally {
    clearTimeout(timeout);
  }
  await new Promise(r => setTimeout(r, 2000));
  if (sessionToken == null || sessionToken === 'bad-token') {
    return new ResultBuilder()
      .fail()
      .withGeneralError(401)
      .build();
  }

  return new ResultBuilder()
    .succeed()
    .build();
}