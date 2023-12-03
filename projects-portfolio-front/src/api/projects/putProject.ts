import { ProjectSummary } from "../../types/project/projectSummary";
import { Result, ResultBuilder } from "../../types/result/result";

export default async function(projectSummary: ProjectSummary, sessionToken: string | null | undefined): Promise<Result> {
  console.log('PUT PROJECT: ', projectSummary);
  const apiUrl = process.env.API_URL! + '/projects';
  const controller = new AbortController();
  setTimeout(() => {
    controller.abort();
  }, 2000);
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      body: JSON.stringify({projectSummary}),
      signal: controller.signal
    });
    if (response.status === 200) {
      const projects = await response.json();
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
  }
  // await new Promise(r => setTimeout(r, 2000));
  // if (sessionToken == null || sessionToken === 'bad-token') {
  //   return new ResultBuilder()
  //     .fail()
  //     .withGeneralError(401)
  //     .build();
  // }

  // return new ResultBuilder()
  //   .succeed()
  //   .build();
}