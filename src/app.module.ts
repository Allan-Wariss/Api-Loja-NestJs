import { Module } from '@nestjs/common';
import { usuarioModule } from './usuario/usuario.module';
import { produtoModule } from './produto/produto.module';

@Module({
  imports: [usuarioModule, produtoModule],
})
export class AppModule {}
