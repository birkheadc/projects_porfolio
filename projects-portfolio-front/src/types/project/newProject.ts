import { BulletPoint } from "./bulletPoint"
import { ProjectDescription } from "./projectDescription"

export type NewProject = {
  title: string,
  site: string,
  source: string,
  favoriteLevel: number,
  descriptions: {
    bulletPoints: BulletPoint[],
    shortDescriptions: ProjectDescription[],
    longDescriptions: ProjectDescription[]
  },
  technologies: string[]
}

export const BLANK_NEW_PROJECT: NewProject = {
  title: "",
  site: "",
  source: "",
  favoriteLevel: 0,
  descriptions: {
    bulletPoints: [],
    shortDescriptions: [],
    longDescriptions: []
  },
  technologies: []
}