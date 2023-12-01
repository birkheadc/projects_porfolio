import { ProjectSummary } from "../../types/project/projectSummary";
import { Result, ResultBuilder } from "../../types/result/result";

export default async function(projectSummary: ProjectSummary, sessionToken: string | null | undefined): Promise<Result> {
  console.log('PUT PROJECT: ', projectSummary);
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