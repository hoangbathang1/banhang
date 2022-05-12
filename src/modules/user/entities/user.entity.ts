import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from '../contants';
@Entity('account')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  birthdate: Date;
  @Column()
  gender: string;
  @Column()
  phone: string;
  @Column()
  bio: string;
  @Column({
    type: 'enum',
    nullable: true,
    enum: RoleType,
    default: RoleType.user,
  })
  role: RoleType;
  @Column()
  avatar: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
