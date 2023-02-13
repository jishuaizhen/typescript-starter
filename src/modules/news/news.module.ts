import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([News])], // 注册实体
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService], // 如果其他模块需要使用该模块的服务，需要export, 然后在controller中注入
})
export class NewsModule {}
