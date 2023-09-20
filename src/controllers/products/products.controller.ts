import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from 'src/interfaces/product/product.interface';

import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @HttpCode(200)
  getAllProducts(): Product[] {
    return this.productService.getAllProducts();
  }
  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  createProduct(@Body() producto) {
    this.productService.insertProduct(producto);
    return this.productService.getAllProducts();
  }
  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() body) {
    return this.productService.updateProduct(id, body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProduct(@Param('id') id: number) {
    return 'Hemos borrado el producto ' + id;
  }

  @Get('ruta/sin_contenido')
  @HttpCode(HttpStatus.NOT_FOUND)
  rutaConError404() {
    return 'Esto es un error 404!!!';
  }
}
