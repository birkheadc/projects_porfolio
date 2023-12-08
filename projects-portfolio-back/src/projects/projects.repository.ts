import { Injectable } from "@nestjs/common";
import { Project } from "./entities/project.entity";
import { ProjectsConfig } from "./projects.config";
import { GithubRepoParser } from '@birkheadc/github-repo-parser';

@Injectable()
export class ProjectsRepository {
  constructor(private readonly config: ProjectsConfig) { }

  async getAll(): Promise<Project[]> {
    const projects: Project[] = [];

    const githubParser = new GithubRepoParser({ username: this.config.username });
    const data = await githubParser.getAllData([ 'images' ]);

    if (data == null) return projects;

    data.forEach(element => {
      projects.push(Project.fromGithubRepoParserResult(element));
    });

    return projects;
  }
}

// @Injectable()
// export class ProjectsRepository {
//   constructor(private readonly client: DynamoDBClient, private readonly config: ProjectsConfig) {
    
//   }

//   async getAll(): Promise<Project[]> {
//     const projects: Project[] = [];

//     const command = new ScanCommand({
//       TableName: this.config.tableName
//     });
//     try {
//       const response = await this.client.send(command);

//       if (response.Items) {
//         response.Items.forEach(element => {
//           projects.push(Project.fromDynamoDBObject(element));
//         });
//       }
//     } catch (error) {
//       console.log('Error while performing getAll: ', error);
//       throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//     return projects;
//   }

//   async put(project: Project): Promise<void> {
//     const itemObject: Record<string, AttributeValue> = project.toItemObject();

//     const command = new PutItemCommand({
//       TableName: this.config.tableName,
//       Item: itemObject
//     })

//     try {
//       await this.client.send(command);
//     } catch (error) {
//       console.log('Error while performing put: ', error);
//       throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async delete(id: string): Promise<void> {
//     const command = new DeleteItemCommand({
//       TableName: this.config.tableName,
//       Key: {
//         id: {
//           S: id
//         }
//       },
//       ReturnConsumedCapacity: 'TOTAL',
//       ReturnValues: 'ALL_OLD'
//     });

//     const result = await this.client.send(command);
//     if (result.Attributes == null) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
//   }
// }