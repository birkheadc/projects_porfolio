import { ProjectSummary } from "../../types/project/projectSummary";
import { Result, ResultBuilder } from "../../types/result/result";

export default async function getAll(): Promise<Result<ProjectSummary[]>> {

  const dummyProjectA: ProjectSummary = {
    id: "8a4e4c84-2613-425c-a013-03b5cfee781d",
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

  const dummyProjectB: ProjectSummary = {
    id: "ffd62fd8-eb13-4756-aa95-2766d808a7f3",
    title: "Project 2",
    site: "www.project2.com",
    source: "git.project2.com",
    favoriteLevel: 0,
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
    technologies: [ 'css', 'html', 'javascript' ]
  }

  const dummyProjectC: ProjectSummary = {
    id: "16446086-9a46-4c5c-a54f-20c7836df171",
    title: "Project 3",
    site: "www.project3.com",
    source: "git.project3.com",
    favoriteLevel: 0,
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
    technologies: [ 'asp.net', 'c#', 'c++', 'c--' ]
  }
  
  return new ResultBuilder<ProjectSummary[]>()
    .succeed()
    .withBody([ dummyProjectA, dummyProjectB, dummyProjectC])
    .build();
}