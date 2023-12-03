import { BulletPoint } from "../entities/bulletPoint";
import { ProjectDescription } from "../entities/projectDescription";

export class PutProjectDto {
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
}