import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('collect')
export class CollectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ default: 0, comment: '为0时为默认分组' })
    groupId: number;

    @Column({ default: 0, comment: '0:图片\r\n1:文本\r\n2:链接' })
    type: number;

    @Column({ default: '', type: 'text', nullable: true })
    content: string;

    @Column({ default: '', comment: '来源', nullable: true })
    origin: string;

    @Column({ default: '', comment: '描述', nullable: true })
    desc: string;

    @Column({ default: 1, comment: '0 不显示 1 显示' })
    isShow: number;

    @Column({ type: 'datetime' })
    createDate: string;
}
