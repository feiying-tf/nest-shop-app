import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { ShopModule } from './modules/shop/shop.module'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { User } from './modules/user/user.entity'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configSchemaValidator } from './utils/validators/config.schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 前面的优先级大于后面的
      envFilePath: ['.env.state.local', `.env.state.${process.env.STATE}`],
      validationSchema: configSchemaValidator,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          // entities: [User],
          autoLoadEntities: true, //  每个通过 forFeature() 注册的实体都将自动的添加到 entities 中
          synchronize: configService.get('DB_SYNC'),
          logging: false,
        }
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
