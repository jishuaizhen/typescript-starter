import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './modules/news/news.module';
import { UploadModule } from './modules/upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../config/db';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [dbConfig] }), // 加载配置 .env 文件
    TypeOrmModule.forRoot(dbConfig()), // 数据库配置
    NewsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
