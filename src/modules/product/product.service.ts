import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { GetProductDto } from './dto/get-product.dto';
import { ResPagingDto } from 'src/shares/dtos/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { httpErrors } from 'src/shares/exceptions';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async find(param: GetProductDto): Promise<ResPagingDto<Product[]>> {
    const { sort, page, limit } = param;

    const query = this.buildQuery(param);

    const [result, total] = await Promise.all([
      this.productModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: sort }),
      this.productModel.find(query).countDocuments(),
    ]);

    return {
      result,
      total,
      lastPage: Math.ceil(total / limit),
    };
  }

  buildQuery(param: GetProductDto): any {
    const { id, title, color, producer, price, inStock } = param;
    const query: any = {};
    query.deleted = false;

    if (id) {
      query.id = id;
    }

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (color) {
      query.color = { $regex: color, $options: 'i' };
    }

    if (producer) {
      query.producer = { $regex: color, $options: 'i' };
    }

    if (price) {
      query.price = price;
    }

    if (inStock) {
      query.inStock = inStock;
    }

    return query;
  }

  async create(payload: CreateProductDto): Promise<void> {
    const { img, title, color, producer, price, inStock } = payload;
    await this.productModel.create({
      img,
      title,
      color,
      producer,
      price,
      inStock,
    });
  }

  async findByIdAndUpDate(id: string, payload: UpdateProductDto): Promise<void> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
    }

    await this.productModel.findOneAndUpdate({ _id: id }, payload);
  }

  async deleteById(_id: string): Promise<void> {
    const product = await this.productModel.findOne({ _id });
    if (!product) {
      throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
    }

    await this.productModel.findOneAndUpdate({ _id }, { deleted: true });
  }

  async deleteIds(ids: string[]): Promise<void> {
    await Promise.all(
      ids.map(async (id) => {
        const product = await this.productModel.findById(id);

        if (!product) {
          throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
        }

        await this.productModel.findOneAndUpdate({ _id: id }, { deleted: true });
      }),
    );
  }

  async findById(id: string): Promise<void> {
    await this.productModel.findOne({ _id: id, deleted: false });
  }
}
