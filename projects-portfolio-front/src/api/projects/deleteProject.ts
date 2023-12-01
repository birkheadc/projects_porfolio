import { Result, ResultBuilder } from "../../types/result/result";

export default async function(id: string, sessionToken: string | null | undefined): Promise<Result> {
  console.log('Delete project: ', id);
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