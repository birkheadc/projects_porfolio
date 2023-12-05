import { BulletPoint } from "./bulletPoint"
import { ProjectDescription } from "./projectDescription"

export type NewProject = {
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
  images: FileList | null,
  [key: string]: string | number | {} | null
}

export const BLANK_NEW_PROJECT: NewProject = {
  id: "",
  title: "",
  site: "",
  source: "",
  favoriteLevel: 0,
  descriptions: {
    bulletPoints: [],
    shortDescriptions: [],
    longDescriptions: []
  },
  technologies: [],
  images: null
}