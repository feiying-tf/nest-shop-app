import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
// import { AuthRepository } from './auth.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService')
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(data: RegisterDto) {
    const { mobile, password } = data
    const found = await this.userRepository.findOneBy({
      mobile,
    })
    if (found) {
      throw new InternalServerErrorException('用户已存在')
      // throw new InternalServerErrorException('用户已存在')
    }
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    const user = await this.userRepository.create({
      mobile,
      password: hash,
    })
    user.createAt = new Date()
    user.updateAt = new Date()
    try {
      const result = await this.userRepository.save(user)
      return result
    } catch (error) {
      this.logger.error(
        `Failed to register user: ${JSON.stringify(user)}`,
        error.stack,
      )
      throw new InternalServerErrorException('注册失败')
    }
  }
  async login(data: LoginDto) {
    const { mobile, password } = data
    const found = await this.userRepository.findOneBy({
      mobile,
    })
    console.log('found', found)
    if (!found) {
      throw new InternalServerErrorException('用户不存在')
    }
    const { password: hash, id } = found
    const isMatch = await bcrypt.compare(password, hash)
    if (!isMatch) {
      throw new InternalServerErrorException('账号或密码错误')
    }
    const payload = {
      id,
    }
    return {
      data: found,
      access_token: this.jwtService.sign(payload),
    }
  }
  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id })
  }
}
