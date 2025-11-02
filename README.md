# 📚 Estudos NestJS

Um repositório dedicado ao aprendizado e prática do framework **NestJS**.

## 🎯 Objetivo

Este repositório contém projetos, exercícios e exemplos práticos desenvolvidos durante o meu estudo de NestJS.

## 🚀 Tecnologias

- **NestJS** - Framework principal
- **TypeScript** - Linguagem de programação
- **Node.js** - Runtime JavaScript
- **Express** - HTTP server framework

## ⚙️ Inicialização

Siga os passos abaixo para instalar as dependências e iniciar a aplicação.

### 1) Instalar dependências

```powershell
npm install
```

### 2) Executar em desenvolvimento (watch mode)

```powershell
npm run start:dev
```

### 3) Executar em desenvolvimento (sem watch)

```powershell
npm run start
```

### 4) Executar em produção

Primeiro gere o build e depois suba o servidor de produção:

```powershell
npm run build
npm run start:prod
```

## 📖 Documentação da API (Swagger)

A documentação da API é gerada automaticamente usando **Swagger** e está disponível após iniciar a aplicação.

### Como acessar:

1. Inicie a aplicação com `npm run start:dev`
2. Abra seu navegador
3. Acesse: **http://localhost:3000/api**

### O que você encontrará no Swagger:

- **Endpoints disponíveis** - Todos os controllers e rotas
- **Estrutura das requisições** - Dados esperados pelo POST/PUT
- **Respostas de exemplo** - Status codes e corpos de resposta
- **Interface interativa** - Execute requests diretamente no navegador

