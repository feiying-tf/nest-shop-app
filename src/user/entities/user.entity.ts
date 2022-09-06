import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    default: '默认',
  })
  name: string

  @Column()
  mobile: string

  @Column()
  @Exclude() // 返回给前端的数据中剔除password
  password: string

  @Column()
  createAt: Date

  @Column()
  updateAt: Date
}
