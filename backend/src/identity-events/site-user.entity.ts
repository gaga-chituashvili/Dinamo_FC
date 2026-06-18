import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { SiteLogin } from './site-login.entity';

@Entity('site_users')
export class SiteUser {
  @PrimaryColumn({ name: 'identity_user_id', type: 'uuid' })
  identityUserId!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt!: Date | null;

  @Column({ name: 'first_seen_at', type: 'timestamptz' })
  firstSeenAt!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @OneToMany(() => SiteLogin, (login) => login.siteUser)
  logins!: SiteLogin[];
}
