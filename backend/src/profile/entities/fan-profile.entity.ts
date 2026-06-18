import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('fan_profiles')
export class FanProfile {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ type: 'text', nullable: true })
  bio!: string | null;

  @Column({ type: 'varchar', nullable: true })
  headline!: string | null;

  @Column({ name: 'job_title', type: 'varchar', nullable: true })
  jobTitle!: string | null;

  @Column({ type: 'varchar', nullable: true })
  company!: string | null;

  @Column({ type: 'varchar', nullable: true })
  location!: string | null;

  @Column({ name: 'website_url', type: 'varchar', nullable: true })
  websiteUrl!: string | null;

  @Column({ name: 'github_url', type: 'varchar', nullable: true })
  githubUrl!: string | null;

  @Column({ name: 'linkedin_url', type: 'varchar', nullable: true })
  linkedinUrl!: string | null;

  @Column({ name: 'x_url', type: 'varchar', nullable: true })
  xUrl!: string | null;

  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  avatarUrl!: string | null;

  @Column({ type: 'text', array: true, default: '{}' })
  skills!: string[];

  @Column({ type: 'text', array: true, default: '{}' })
  tags!: string[];

  @Column({ type: 'text', array: true, default: '{}' })
  roles!: string[];

  @Column({ name: 'is_verified', type: 'boolean', default: false })
  isVerified!: boolean;

  @Column({ name: 'completion_score', type: 'int', default: 0 })
  completionScore!: number;

  // Loyalty
  @Column({ name: 'loyalty_xp', type: 'int', default: 0 })
  loyaltyXp!: number;

  @Column({ name: 'loyalty_level', type: 'varchar', default: 'Bronze' })
  loyaltyLevel!: string;

  @Column({ name: 'loyalty_xp_to_next', type: 'int', default: 1000 })
  loyaltyXpToNext!: number;

  // Matches
  @Column({ name: 'matches_attended', type: 'int', default: 0 })
  matchesAttended!: number;

  @Column({ name: 'season_matches_attended', type: 'int', default: 0 })
  seasonMatchesAttended!: number;

  @Column({ name: 'season_matches_total', type: 'int', default: 0 })
  seasonMatchesTotal!: number;

  // Membership
  @Column({ name: 'membership_type', type: 'varchar', nullable: true })
  membershipType!: string | null;

  @Column({
    name: 'membership_expires_at',
    type: 'timestamptz',
    nullable: true,
  })
  membershipExpiresAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
