import { Injectable } from '@nestjs/common';
import { Product } from 'src/interfaces/product/product.interface';

@Injectable()
export class ProductsService {
  private productos: Product[] = [
    { id: 1, name: 'Arroz', cantidad: 20 },
    { id: 2, name: 'Azucar', cantidad: 10 },
    { id: 3, name: 'Frijoles', cantidad: 2 },
  ];

  getAllProducts(): Product[] {
    return this.productos;
  }
  getProduct(id: number): Product {
    return this.productos.find((item: Product) => item.id == id);
  }
  insertProduct(producto: any) {
    this.productos = [
      ...this.productos,
      {
        id: this.lastId() + 1,
        name: producto.name,
        cantidad: producto.cantidad,
      },
    ];
  }

  private lastId(): number {
    return this.productos[this.productos.length - 1].id;
  }

  updateProduct(id: number, body: any) {
    const product: Product = {
      id,
      name: body.name,
      cantidad: body.cantidad,
    };
    this.productos = this.productos.map((item: Product) => {
      console.log(item, id, item.id == id);
      return item.id == id ? product : item;
    });
  }
  deleteProduct(id: number) {
    this.productos = this.productos.filter((item: Product) => item.id != id);
  }
}
