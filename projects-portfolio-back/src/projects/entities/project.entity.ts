import { BulletPoint } from "./bulletPoint";
import { ProjectDescription } from "./projectDescription";

export class Project {
  id: string;
  title: string;
  site: string;
  source: string;
  favoriteLevel: number;
  descriptions: {
    bulletPoints: BulletPoint[],
    shortDescriptions: ProjectDescription[],
    longDescriptions: ProjectDescription[]
  };
  technologies: string[];

  static fromDynamoDBObject(data: any): Project {
    console.log("Converting to Project: ", data);
    const project = new Project();

    project.id = data.id.S;
    project.title = data.title.S;
    project.site = data.site.S;
    project.source = data.source.S;
    project.favoriteLevel = data.favoriteLevel.N;
    project.descriptions = {
      bulletPoints: [],
      shortDescriptions: [],
      longDescriptions: []
    };
    project.technologies = [];

    data.descriptions.M.bulletPoints.L.forEach((element: any) => {
      const bullet: BulletPoint = {
        language: element.M.language.S,
        content: []
      };
      element.M.content.L.forEach((e: any) => {
        bullet.content.push(e.S);
      });
      project.descriptions.bulletPoints.push(bullet);
    });

    data.descriptions.M.shortDescriptions.L.forEach((element: any) => {
      const description: ProjectDescription = {
        language: element.M.language.S,
        content: element.M.content.S
      };
      project.descriptions.shortDescriptions.push(description);
    });

    data.descriptions.M.longDescriptions.L.forEach((element: any) => {
      const description: ProjectDescription = {
        language: element.M.language.S,
        content: element.M.content.S
      };
      project.descriptions.longDescriptions.push(description);
    });

    data.technologies.L.forEach((element: any) => {
      project.technologies.push(element.S);
    });

    return project;
  }
}
