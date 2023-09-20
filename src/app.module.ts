import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import Modules from 'src/modules';
import { LoggerMiddleware } from 'src/shares/middlewares/logger.middleware';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [...Modules, ProductModule],
  controllers: [],
  providers: [Logger],
})
export class AppModules {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).exclude('/api/v1/ping').forRoutes('/');
  }
}
