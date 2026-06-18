import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  fullName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  subject: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  message: string;
}
