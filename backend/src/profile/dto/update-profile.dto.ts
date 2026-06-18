import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  headline?: string;

  @IsString()
  @IsOptional()
  jobTitle?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;

  @IsUrl()
  @IsOptional()
  xUrl?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
