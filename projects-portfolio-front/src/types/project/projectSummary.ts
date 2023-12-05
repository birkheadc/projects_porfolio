import { BulletPoint } from "./bulletPoint"
import { ProjectDescription } from "./projectDescription"

export type ProjectSummary = {
  id: string,
  title: string,
  site: string,
  source: string,
  favoriteLevel: number,
  descriptions: {
    bulletPoints: BulletPoint[],
    shortDescriptions: ProjectDescription[],
    longDescriptions: ProjectDescription[]
  },
  technologies: string[],
  imageUrls: string[]
}