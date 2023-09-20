import { Controller, Get, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/shares/decorators/http.decorators';
import { ResPagingDto } from 'src/shares/dtos/pagination.dto';
import { GetProductDto } from './dto/get-product.dto';
import { UserRole } from 'src/shares/enums/user.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { IdDto, IdsDto } from 'src/shares/dtos/param.dto';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  @ApiOperation({ summary: '[ ADMIN ] Update product by id' })
  async findOne(@Param() { id }: IdDto): Promise<void> {
    await this.productService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product info and paging' })
  async findAll(@Query() query: GetProductDto): Promise<ResPagingDto<Product[]>> {
    return this.productService.find(query);
  }

  @Post()
  @ApiBearerAuth()
  @UserAuth([UserRole.ADMIN])
  @ApiOperation({ summary: '[ ADMIN ] create new product' })
  async create(@Body() createProductDto: CreateProductDto, @UserID() userId: string): Promise<void> {
    console.log(userId);
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UserAuth([UserRole.ADMIN])
  @ApiOperation({ summary: '[ ADMIN ] Update product by id' })
  async update(@Param() param: IdDto, @Body() updateUserDto: UpdateProductDto): Promise<void> {
    await this.productService.findByIdAndUpDate(param.id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UserAuth([UserRole.ADMIN])
  @ApiOperation({ summary: 'Delete product by id' })
  async deleteOne(@Param() { id }: IdDto): Promise<void> {
    await this.productService.deleteById(id);
  }

  @Delete()
  @ApiBearerAuth()
  @UserAuth([UserRole.ADMIN])
  @ApiOperation({ summary: '[ ADMIN ] delete many products' })
  async deleteMany(@Body() body: IdsDto): Promise<void> {
    await this.productService.deleteIds(body.ids);
  }
}
