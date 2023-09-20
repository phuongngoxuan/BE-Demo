import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: true,
    example: 'nate',
  })
  @IsOptional()
  lastName: string;

  @ApiProperty({
    required: true,
    example: 'BE ',
  })
  @IsOptional()
  firstName: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsOptional()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    required: true,
    example: '123456789',
  })
  @IsOptional()
  readonly password: string;

  @ApiProperty({
    required: true,
    example: '0337231189',
  })
  @IsOptional()
  readonly phone: string;

  @ApiProperty({
    required: true,
    example: 'https://resq-bucket-2.s3.amazonaws.com/test/1681115579264_c49717abc07d480.jpeg',
  })
  @IsOptional()
  img: string;
}
