import { Result, ResultBuilder } from "../../types/result/result";

export default async function deleteProject(id: string, sessionToken: string | null | undefined): Promise<Result> {
  console.log('Delete project: ', id);
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