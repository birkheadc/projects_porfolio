import { AttributeValue, DeleteItemCommand, DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { Project } from "./entities/project.entity";

@Injectable()
export class ProjectsRepository {
  private readonly tableName = 'ProjectSummaries';
  constructor(private readonly client: DynamoDBClient) {

  }

  async getAll(): Promise<Project[]> {
    const projects: Project[] = [];

    const command = new ScanCommand({
      TableName: this.tableName
    });
    try {
      const response = await this.client.send(command);

      if (response.Items) {
        response.Items.forEach(element => {
          projects.push(Project.fromDynamoDBObject(element));
        });
      }
    } catch (error) {
      console.log('Error while performing getAll: ', error);
    }

    return projects;
  }

  async put(project: Project): Promise<boolean> {
    const itemObject: Record<string, AttributeValue> = project.toItemObject();

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: itemObject
    })

    try {
      await this.client.send(command);
      return true;
    } catch (error) {
      console.log('Error while performing put: ', error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: {
        id: {
          S: id
        }
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_OLD'
    });

    const result = await this.client.send(command);
    return (result.Attributes != null);
  }
}