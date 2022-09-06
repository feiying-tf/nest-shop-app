import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

// PartialType 转换为可选属性
export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number
}
