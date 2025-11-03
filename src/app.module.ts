import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { usuarioModule } from './usuario/usuario.module';
import { produtoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    usuarioModule,
    produtoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })
  ],
})
export class AppModule {}
