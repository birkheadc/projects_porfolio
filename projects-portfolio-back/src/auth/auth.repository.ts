import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import {HttpException, HttpStatus, Injectable } from "@nestjs/common";
import bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  private readonly tableName: string = 'ProjectPortfolioPassword';
  constructor(private readonly client: DynamoDBClient) {

  }
  async getPassword(): Promise<string> {
    const command = new ScanCommand({
      TableName: this.tableName
    });

    try {
      const response = await this.client.send(command);
      if (!response.Items) throw new HttpException('Password not found', HttpStatus.INTERNAL_SERVER_ERROR);

      const password = response.Items[0].password.S;
      if (password == null) throw new HttpException('Password not found', HttpStatus.INTERNAL_SERVER_ERROR);
      
      return password;
    } catch (error) {
      console.log('Error while performing getPassword: ', error);
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}