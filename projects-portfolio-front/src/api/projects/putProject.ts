import { ProjectSummary } from "../../types/project/projectSummary";
import { Result, ResultBuilder } from "../../types/result/result";

export default async function(projectSummary: ProjectSummary, sessionToken: string | null | undefined): Promise<Result> {
  const apiUrl = process.env.API_URL! + '/projects';
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 2000);
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      body: JSON.stringify(projectSummary),
      headers: {
        'Content-Type': 'application/json'
      },
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
  } finally {
    clearTimeout(timeout);
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

const dummyProjectA: ProjectSummary = {
  id: "",
  title: "Project 1",
  site: "www.project1.com",
  source: "git.project1.com",
  favoriteLevel: 50,
  descriptions: {
    bulletPoints: [{ 
      language: 'en',
      content: ['This is a bullet point', 'This is another bullet point', 'And one last point']
    }],
    shortDescriptions: [{
      language: 'en',
      content: 'This is a short description. I think it needs a few more sentences though. Just so I can test the layout.'
    }],
    longDescriptions: [{
      language: 'en',
      content: 'This is a longer description. I will copy and paste it a few times to make sure of it. This is a longer description. I will copy and paste it a few times to make sure of it. This is a longer description. I will copy and paste it a few times to make sure of it. This is a longer description. I will copy and paste it a few times to make sure of it.'
    }]
  },
  technologies: [ 'js', 'ts']
}