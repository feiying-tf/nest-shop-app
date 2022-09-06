import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { HttpExceptionFilter } from '../utils/filters/http-exception.filter'
import { GetUser } from 'src/utils/decorators/user'
import { User } from './entities/user.entity'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
// import { JoiValidationPipe } from '../utils/pipes/validation.pipe'

@Controller('user')
@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
// @ApiBearerAuth('token') // 放到这儿就是针对所有API，必须带上 main.ts 中 addBearerAuth 的第二个参数 'token'
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto)
  // }

  @Get()
  @ApiBearerAuth() // 放到这儿针对单个 api
  @ApiOperation({ summary: '用户列表' }) // 对接口进行描述
  findAll(@GetUser() user: User) {
    // 打印请求的用户
    console.log('请求的user', user)
    return this.userService.findAll()
  }
  /**
   * 使用Bind处理
  @Get()
  @Bind(GetUser(), Req())
  findAll(user: User, req: any) {
    // 打印请求的用户
    console.log('请求的user', user)
    console.log('请求的req', req)
    return this.userService.findAll()
  }
   */

  @Get(':id')
  @ApiOperation({ summary: '用户详情' }) // 对接口进行描述
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }
  // 请求地址是/user/updateUser
  @Post('updateUser')
  @ApiOperation({ summary: '更新用户' }) // 对接口进行描述
  // @UseFilters(new HttpExceptionFilter())
  @UseFilters(HttpExceptionFilter) // 两种写法都行
  update(@Body() updateUserDto: UpdateUserDto) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    )
    return this.userService.update(+updateUserDto.id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' }) // 对接口进行描述
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
