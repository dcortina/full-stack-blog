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
//ver todos los productos
  @Get()
  @HttpCode(200)
  getAllProducts(): Product[] {
    return this.productService.getAllProducts();
  }
  //ver un producto determinado
  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }
  //insertar un nuevo producto
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  createProduct(@Body() producto) {
    this.productService.insertProduct(producto);
    return this.productService.getAllProducts();
  }
  //actualizar un producto
  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() body) {
    return this.productService.updateProduct(id, body);
  }
  //borrar un producto
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
