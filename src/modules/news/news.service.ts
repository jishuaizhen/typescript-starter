import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { News } from './news.entity';
import { Images } from './images.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
    @InjectRepository(Images) private imagesRepository: Repository<Images>,
  ) {}

  async create(param) {
    const news = new News();
    news.title = param.title;
    news.content = param.content;
    const { id } = await this.newsRepository.save<News>(news);

    // 存入图片
    if (param.img) {
      const img = new Images();
      img.url = param.img;
      img.newsId = id;
      this.imagesRepository.save(img);
    }

    return { id };
  }

  async findAll(param) {
    const { title, page = 1, pageSize = 10 } = param;

    const take = pageSize || 10;
    const skip = (page - 1) * take;

    const [result = [], total = 0] = await this.newsRepository.findAndCount({
      where: { isDelete: 0, title: title ? Like(`%${title}%`) : undefined },
      order: { id: 'DESC' },
      take,
      skip,
    });

    return { data: result, count: total, page, pageSize };
  }

  async findOne(id: number) {
    this.newsRepository.increment({ id }, 'readCount', 1);
    const { url = '' } =
      (await this.imagesRepository.findOne({ where: { newsId: id } })) || {};
    const res = await this.newsRepository.findOne({ where: { id } });
    return { ...res, imgUrl: url };
  }

  async update(id: number, newsDto) {
    const res = await this.newsRepository.findOne({ where: { id } });
    if (!res) throw new HttpException('新闻不存在', HttpStatus.BAD_REQUEST);
    newsDto.img && delete newsDto.img;

    await this.newsRepository.update({ id }, newsDto);
    return new HttpException('更新成功', HttpStatus.OK);
  }

  remove(id: number) {
    return this.newsRepository.update({ id }, { isDelete: 1 });
  }
}
