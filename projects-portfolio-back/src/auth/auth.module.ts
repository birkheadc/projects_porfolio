import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import helpers from '../shared/helpers';

// Todo: Get the secret from aws
// The current secret is just random and is not real so leave me alone
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, {
    provide: DynamoDBClient,
    useFactory: () => {
      return new DynamoDBClient({ region: 'ap-southeast-2' })
    }
  }],
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: await helpers.fetchSecretKey(),
          global: true,
          signOptions: { expiresIn: '1h' }
        }
      }
    })
  ],
  exports: [JwtModule]
})
export class AuthModule {}