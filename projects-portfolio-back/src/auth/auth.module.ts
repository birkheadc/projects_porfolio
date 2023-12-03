import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';

// Todo: Get the secret from aws
// The current secret is just random and is not real so leave me alone
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'jw+gkSu8v8LQiOgmXQ9HgmG6nnLul/hrA+g0XI8l/GM=',
      signOptions: { expiresIn: '1h' }
    })
  ]
})
export class AuthModule {}