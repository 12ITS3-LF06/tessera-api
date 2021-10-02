import { AggregateRoot } from '@nestjs/cqrs';
import { UserRegisteredEvent } from './events/impl/user-registered.event';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends AggregateRoot {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  register() {
    this.apply(new UserRegisteredEvent(this));
  }
}
