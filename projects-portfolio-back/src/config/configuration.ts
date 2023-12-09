import { ProjectsConfig } from "src/projects/projects.config"

type Configuration = {
  projects: ProjectsConfig
}

export default (): Configuration => ({
  projects: {
    username: 'birkheadc'
  }
});