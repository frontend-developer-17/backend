import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../app/users/user.module';
import { TokenModule } from '../token/token.module';
import { JwtAutchGuards } from 'src/guards/jwtGuards';
import { JwtStrategi } from 'src/strategy';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategi],
})
export class AuthModule {}
