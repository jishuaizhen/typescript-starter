import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  /** 标题 */
  @Column({ comment: '标题' })
  title: string;

  /** 内容 */
  @Column({ comment: '内容' })
  content: string;

  /** 阅读量 */
  @Column({ comment: '阅读量', default: 0 })
  readCount: number;

  /** 创建时间 */
  @CreateDateColumn()
  createTime: Date;

  /** 是否删除 0 | 1 */
  @Column({ comment: '是否删除', default: 0, select: false })
  isDelete: number;
}
