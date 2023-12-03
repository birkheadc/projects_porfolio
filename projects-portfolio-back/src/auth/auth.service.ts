import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { GetTokenDto } from './dto/get-token.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly repository: AuthRepository, private readonly jwtService: JwtService ) { }

  async getToken(dto: GetTokenDto): Promise<string> {
    const hash = await this.repository.getPassword();
    if (this.verifyPassword(dto.password, hash)) {
      const payload = { sub: 'admin' };
      const token = await this.jwtService.signAsync(payload);
      return token;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  verifyPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
