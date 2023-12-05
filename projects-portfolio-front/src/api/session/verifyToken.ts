import helpers from "../../helpers";
import { Result, ResultBuilder } from "../../types/result/result";

export default async function(token: string): Promise<Result> {
  const apiUrl = process.env.API_URL! + '/auth';
  const [ timeout, signal ] = helpers.api.createAbortController();
  try {
    const response = await fetch (apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      signal: signal
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