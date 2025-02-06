import { IsString, IsEmail, IsEnum, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user (at least 6 characters)',
    example: 'password123',
  })
  @IsString()
  @Length(6)
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: ['user', 'admin'],
    example: 'user',
  })
  @IsEnum(['user', 'admin'])
  role: 'user' | 'admin';

  constructor(email: string, password: string, role: 'user' | 'admin') {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
