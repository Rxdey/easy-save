import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity('save_group')
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ length: 16 })
  name: string;

  @Column({ length: 16, default: 0 })
  sort: string;

  @Column({ default: 0 })
  isPrivate: number;

  @Column({ length: 32, nullable: true })
  password: string;
}
