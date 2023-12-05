import helpers from "../../helpers";
import { Result, ResultBuilder } from "../../types/result/result";
import { LoginCredentials } from "../../types/session/loginCredentials/loginCredentials";

export default async function(credentials: LoginCredentials): Promise<Result<string>> {
  const apiUrl = process.env.API_URL! + '/auth';
  const [ timeout, signal ] = helpers.api.createAbortController();
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': encodeCredentials(credentials)
      },
      signal: signal
    });
    if (!response.ok) {
      return new ResultBuilder<string>()
        .fail()
        .withGeneralError(response.status)
        .build();
    }
    const data = await response.text();
    return new ResultBuilder<string>()
      .succeed()
      .withBody(data)
      .build();
  } catch {
    return new ResultBuilder<string>()
      .fail()
      .withGeneralError(503)
      .build();
  } finally {
    clearTimeout(timeout);
  }
}

function encodeCredentials(credentials: LoginCredentials): string {
  const code = window.btoa(`${credentials.username}:${credentials.password}`);
  return `Basic ${code}`;
}