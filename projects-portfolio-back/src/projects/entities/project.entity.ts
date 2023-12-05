import { randomUUID } from "crypto";
import { PutProjectDto } from "../dto/put-project.dto";
import { BulletPoint } from "./bulletPoint";
import { ProjectDescription } from "./projectDescription";
import { AttributeValue } from "@aws-sdk/client-dynamodb";

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
  imageUrls: string[];

  static fromDynamoDBObject(data: any): Project {
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
    project.imageUrls = [];

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

    data.imageUrls.L.forEach((element: any) => {
      project.imageUrls.push(element.S);
    })

    return project;
  }

  static fromPutProjectDto(dto: PutProjectDto): Project {
    let project = new Project();

    project.id = dto.id === '' ? randomUUID() : dto.id;
    project.title = dto.title;
    project.site = dto.site;
    project.source = dto.source;
    project.favoriteLevel = dto.favoriteLevel;
    project.descriptions = dto.descriptions;
    project.technologies = dto.technologies;
    project.imageUrls = [];

    return project;
  }

  toItemObject(): Record<string, AttributeValue> {
    const bulletPoints: AttributeValue[] = [];
    this.descriptions.bulletPoints.forEach(element => {
      const points: AttributeValue[] = [];
      element.content.forEach(point => {
        points.push({ S: point});
      });
      const bulletPoint: AttributeValue = {
        M: {
          content: {
            L: points
          },
          language: {
            S: element.language
          }
        }
      }
      bulletPoints.push(bulletPoint);
    });
    const shortDescriptions: AttributeValue[] = [];
    this.descriptions.shortDescriptions.forEach(element => {
      shortDescriptions.push({
        M: {
          content: {
            S: element.content
          },
          language: {
            S: element.language
          }
        }
      });
    });
    const longDescriptions: AttributeValue[] = [];
    this.descriptions.longDescriptions.forEach(element => {
      longDescriptions.push({
        M: {
          content: {
            S: element.content
          },
          language: {
            S: element.language
          }
        }
      });
    });
    const technologies: AttributeValue[] = [];
    this.technologies.forEach(element => {
      technologies.push({
        S: element
      });
    });

    const imageUrls: AttributeValue[] = [];
    this.imageUrls.forEach(element => {
      imageUrls.push({
        S: element
      });
    });

    const itemObject: Record<string, AttributeValue> = {
      id: {
        S: this.id
      },
      title: {
        S: this.title
      },
      site: {
        S: this.site
      },
      source: {
        S: this.source
      },
      favoriteLevel: {
        N: this.favoriteLevel.toString()
      },
      descriptions: {
        M: {
          bulletPoints: {
            L: bulletPoints
          },
          shortDescriptions: {
            L: shortDescriptions
          },
          longDescriptions: {
            L: longDescriptions
          }
        }
      },
      technologies: {
        L: technologies
      },
      imageUrls: {
        L: imageUrls
      }
    }
    return itemObject;
  }
}
