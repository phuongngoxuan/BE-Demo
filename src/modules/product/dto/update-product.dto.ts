import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  img: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  producer: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  inStock?: boolean;
}
