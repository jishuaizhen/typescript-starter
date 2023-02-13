import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // 自动同步
  autoLoadEntities: true, // 自动加载实体
});
