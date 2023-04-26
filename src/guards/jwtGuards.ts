import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Injectable()
export class JwtAutchGuards extends AuthGuard('jwt'){

}