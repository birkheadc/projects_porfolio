import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { HttpException, HttpStatus } from "@nestjs/common";

export const fetchSecretKey = async () => {
  const client = new SecretsManagerClient({
    region: 'ap-southeast-2'
  });

  try {
    const command = new GetSecretValueCommand({
      SecretId: 'BircheGames/Authentication/SecurityTokenConfig/SecretKey'
    });
    const response = await client.send(command);
    const secrets = response.SecretString;
    if (secrets == null) throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    const secret = JSON.parse(secrets).ProjectsPortfolioSecretKey;
    return secret;
  } catch (error) {
    console.log('Error while fetching secret key: ', error);
    throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}