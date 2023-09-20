import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../auth.constants';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from '../auth.service';
import express from 'express';
import { PayloadAccessTokenDto } from 'src/shares/dtos/payload-access-token.dto';
import { httpErrors } from 'src/shares/exceptions';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.accessTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: express.Request, args: PayloadAccessTokenDto): Promise<any> {
    const accessToken = req.headers['authorization']?.split(' ')[1] || '';
    const authenticatedUser = await this.authService.decodeAccessToken(accessToken);
    if (!authenticatedUser) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }

    const user = await this.usersService.findById(args.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!user.verified) {
      throw new UnauthorizedException(httpErrors.USER_UNVERIFIED);
    }

    return user;
  }
}
