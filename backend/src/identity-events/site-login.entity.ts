import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SiteUser } from './site-user.entity';

@Entity('site_logins')
export class SiteLogin {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'identity_user_id', type: 'uuid' })
  identityUserId!: string;

  @Column({ name: 'occurred_at', type: 'timestamptz' })
  occurredAt!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @ManyToOne(() => SiteUser, (siteUser) => siteUser.logins, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'identity_user_id' })
  siteUser!: SiteUser;
}
