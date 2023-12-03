import { Result, ResultBuilder } from "../../types/result/result";
import { LoginCredentials } from "../../types/session/loginCredentials/loginCredentials";

export default async function(credentials: LoginCredentials): Promise<Result<string>> {
  await new Promise(r => setTimeout(r, 2000));
  // Dummy logic, api not yet created
  if (credentials.username === 'good_token') {
    return new ResultBuilder<string>()
      .succeed()
      .withBody('good-token')
      .build();
  }
  if (credentials.username === 'bad_token') {
    return new ResultBuilder<string>()
      .succeed()
      .withBody('bad-token')
      .build();
  }
  return new ResultBuilder<string>()
    .fail()
    .withGeneralError(401, 'Credentials do not match')
    .build();
}