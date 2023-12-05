import helpers from "../../helpers";
import { Result, ResultBuilder } from "../../types/result/result";

export default async function(id: string, sessionToken: string | null | undefined): Promise<Result> {
  const apiUrl = process.env.API_URL! + `/projects/${id}`;
  const [ timeout, signal ] = helpers.api.createAbortController();
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      signal: signal,
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });
    if (!response.ok) {
      return new ResultBuilder()
        .fail()
        .withGeneralError(response.status)
        .build();
    }
    return new ResultBuilder()
      .succeed()
      .build();
  } catch {
    return new ResultBuilder()
      .fail()
      .withGeneralError(503)
      .build();
  } finally {
    clearTimeout(timeout);
  }
}