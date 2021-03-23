import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  userName: string;

  @Column({ length: 32 })
  password: string;

  @Column({ length: 16 })
  nickName?: string;

  @Column('datetime')
  createDate: string;

  @Column()
  headImage?: string;
}
