import { ApiProperty } from '@nestjs/swagger'
import { Length, Matches } from 'class-validator'

export class RegisterDto {
  @Matches(/1[0-9]{10}/, {
    message: '手机号不合法',
  })
  @ApiProperty({
    type: String,
    default: '18380449035',
    description: '手机号',
  })
  mobile: string

  @Length(6, 20)
  @ApiProperty({
    type: String,
    default: 'a462787828',
    description: '密码',
  })
  password: string
}
