import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('user_group')
export class UserGroupEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '分组Id',
        name: 'groupId',
    })
    groupId: number;

    @Column({
        comment: '用户Id',
        name: 'userId',
    })
    userId: number;

    @Column({ default: 0 })
    private: number;

    @Column({ length: 32 })
    password?: string;
}
