import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // 注入表后就可以进行使用
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto)
    user.createAt = new Date()
    user.updateAt = new Date()
    return this.usersRepository.save(user)
  }

  findAll() {
    return this.usersRepository.find()
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // const res = await this.usersRepository.update(id, updateUserDto)
    // console.log('res', res)
    // return this.findOne(id)
    const user = await this.findOne(id)
    for (const key in updateUserDto) {
      user[key] = updateUserDto[key]
    }
    return this.usersRepository.save(user)
  }

  async remove(id: number) {
    return this.usersRepository.delete(id)
  }
}
