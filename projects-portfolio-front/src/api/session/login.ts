import { Result, ResultBuilder } from "../../types/result/result";
import { LoginCredentials } from "../../types/session/loginCredentials/loginCredentials";
import { SessionToken } from "../../types/session/sessionToken/sessionToken";

export default async function login(credentials: LoginCredentials): Promise<Result<SessionToken>> {
  console.log('LOGIN: ', credentials);
  // Dummy logic, api not yet created
  if (credentials.username === 'good_token') {
    return new ResultBuilder<SessionToken>()
      .succeed()
      .withBody({
        token: 'good-token'
      })
      .build();
  }
  if (credentials.username === 'bad_token') {
    return new ResultBuilder<SessionToken>()
      .succeed()
      .withBody({
        token: 'bad-token'
      })
      .build();
  }
  return new ResultBuilder<SessionToken>()
    .fail()
    .withGeneralError(401, 'Credentials do not match')
    .build();
}