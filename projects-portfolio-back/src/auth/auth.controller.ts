import { Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetTokenDto } from './dto/get-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post()
  async getToken(@Headers('authorization') authorization: string): Promise<string> {
    const dto: GetTokenDto = GetTokenDto.fromBasicAuth(authorization);
    const jwt: string = await this.service.getToken(dto);
    return jwt;
  }
}
