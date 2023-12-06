import { BulletPoint } from "./bulletPoint"
import { OldImageStatus } from "./oldImageStatus"
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
  oldImages: OldImageStatus[],
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
  oldImages: [],
  images: null
}