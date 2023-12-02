import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { Project } from "./entities/project.entity";

@Injectable()
export class ProjectsRepository {
  private readonly tableName = 'ProjectSummaries';
  constructor(private readonly client: DynamoDBClient) {

  }

  async getAll(): Promise<Project[]> {
    const result: Project[] = [];

    const command = new ScanCommand({
      TableName: this.tableName
    });

    const response = await this.client.send(command);

    if (response.Items) {
      response.Items.forEach(element => {
        result.push(Project.fromDynamoDBObject(element));
      });
    }

    return result;
  }
}