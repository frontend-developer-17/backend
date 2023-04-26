import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async generateJwtToken(user: { name: string; email: string }) {
    return this.jwtService.sign(
      { user },
      {
        secret: this.configService.get('token_secret'),
        expiresIn: this.configService.get('token_expirient'),
      },
    );
  }
}
