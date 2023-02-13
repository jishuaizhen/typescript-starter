import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  /** 图片地址 */
  @Column({ comment: '图片地址' })
  url: string;

  /** news id */
  @Column({ comment: 'news id' })
  newsId: number;
}
