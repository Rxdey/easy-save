import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('group')
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  name: string;

  @Column({ length: 16, default: 1 })
  sort?: string;
}
