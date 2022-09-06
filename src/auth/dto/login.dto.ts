import { IsNotEmpty, Length, Matches } from 'class-validator'
import { RegisterDto } from './register.dto'

export class LoginDto extends RegisterDto {
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string
}
