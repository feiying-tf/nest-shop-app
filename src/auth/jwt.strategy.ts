// import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
// import { AuthService } from './auth.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from './jwt.constants'
// import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any) {
    // 每次请求校验通过会执行，payload主要包含签名的内容，以及过期时间
    // 返回值的内容可以在 controller 中的参数里面拿到（目的是拿到登录人的信息）
    const { id } = payload

    const user = await this.authService.findOne(id)
    return user
  }
}
