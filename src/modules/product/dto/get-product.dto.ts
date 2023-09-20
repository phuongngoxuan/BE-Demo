import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/shares/dtos/pagination.dto';

export class GetProductDto extends PaginationDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  id?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  producer?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}
