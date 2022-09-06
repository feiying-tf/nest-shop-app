import {
  Controller,
  Post,
  Body,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common'
import { AuthService } from './auth.service'
// import { CreateAuthDto } from './dto/create-auth.dto'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { Public } from 'src/utils/decorators/public'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
// import { UpdateAuthDto } from './dto/update-auth.dto'

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  private logger = new Logger('AuthController')
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  @ApiOperation({ summary: '注册' }) // 对接口进行描述
  register(@Body() regesterDto: RegisterDto) {
    this.logger.log(`Registering user: ${regesterDto.mobile}`)
    return this.authService.register(regesterDto)
  }

  @Public()
  @Post('/login')
  @ApiOperation({ summary: '登录' }) // 对接口进行描述
  login(@Body() loginDto: LoginDto) {
    this.logger.log(`Logging in user: ${loginDto.mobile}`)
    return this.authService.login(loginDto)
  }
}
