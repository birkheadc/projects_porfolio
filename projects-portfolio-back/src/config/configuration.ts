import { AuthConfig } from "src/auth/auth.config"
import { ProjectsConfig } from "src/projects/projects.config"
import { UploadConfig } from "src/upload/upload.config"

type Configuration = {
  projects: ProjectsConfig
}

export default (): Configuration => ({
  projects: {
    username: 'birkheadc'
  }
});