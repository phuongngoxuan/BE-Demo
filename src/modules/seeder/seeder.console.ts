import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/users.schema';
import { Product, ProductDocument } from '../product/schemas/product.schema';
import { Model } from 'mongoose';
import { users } from './data/user.data';
import { products } from './data/product.data';

@Console()
@Injectable()
export class Seeder {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  @Command({
    command: 'seeder',
    description: 'seeder ',
  })
  async start(): Promise<void> {
    try {
      await this.userModel.create(users);
      await this.productModel.create(products);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
