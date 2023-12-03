import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  getPassword(): string {
    // Todo: Connect to dynamo, get the real hashed password from ProjectPortfolioPassword table
    const password = '12345678';

    const saltRounds = 10;

    return bcrypt.hashSync(password, saltRounds);
  }
}