import { AuthConfig } from "src/auth/auth.config"
import { ProjectsConfig } from "src/projects/projects.config"
import { UploadConfig } from "src/upload/upload.config"

type Configuration = {
  auth: AuthConfig,
  projects: ProjectsConfig,
  upload: UploadConfig
}

export default (): Configuration => ({
  auth: {
    region: 'ap-southeast-2',
    secretId: 'BircheGames/Authentication/SecurityTokenConfig/SecretKey',
    secretName: 'ProjectsPortfolioSecretKey'
  },
  projects: {
    username: 'birkheadc'
  },
  upload: {
    region: 'ap-southeast-2',
    bucketName: 'projects-portfolio-images'
  }
})

// export default (): Configuration => ({
//   auth: {
//     region: 'ap-southeast-2',
//     secretId: 'BircheGames/Authentication/SecurityTokenConfig/SecretKey',
//     secretName: 'ProjectsPortfolioSecretKey'
//   },
//   projects: {
//     region: 'ap-southeast-2',
//     tableName: 'ProjectSummaries'
//   },
//   upload: {
//     region: 'ap-southeast-2',
//     bucketName: 'projects-portfolio-images'
//   }
// })