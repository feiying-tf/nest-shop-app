import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
// import { AuthGuard } from '@nestjs/passport'
// import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { Logger } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule)

  // 设置全局路由前缀，这个必须当道swagger前面，swagger才会修改
  app.setGlobalPrefix('admin', {
    exclude: [`/auth/:path`],
  })

  // 生成 swagger 文档
  const config = new DocumentBuilder()
    .setTitle('店铺管理系统')
    .setDescription('店铺管理系统API文档')
    .setVersion('1.0')
    .addBearerAuth() // 添加权限，用默认配置
    // .addTag('shop')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)

  // 注册全局验证器
  app.useGlobalPipes(new ValidationPipe())

  const port = 3000
  await app.listen(port)
  logger.log(`Application listening on port ${port}`)
}
bootstrap()
