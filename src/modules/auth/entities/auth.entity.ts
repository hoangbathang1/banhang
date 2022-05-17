import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/modules/user/entities/user.entity';
@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  password: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
