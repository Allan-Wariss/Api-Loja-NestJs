import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CriaProdutoDTO } from '../src/produto/dto/CriaProduto.dto';

describe('App e2e', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /produtos cria produto', async () => {
    const payload: CriaProdutoDTO = {
      nome: 'Produto Teste',
      descricao: 'Descricao teste',
      valor: 10.5,
      quantidade: 5,
    };

    const response = await request(app.getHttpServer())
      .post('/produtos')
      .send(payload)
      .expect(201);

    expect(response.body.produto).toBeDefined();
    expect(response.body.produto.nome).toBe(payload.nome);
  });

  it('GET /produtos lista produtos', async () => {
    const response = await request(app.getHttpServer())
      .get('/produtos')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
