### Projeto NestJS - Sistema de Usuários e Autenticação

## 📌 Descrição

Este projeto é uma API RESTful construída com **NestJS**, implementando funcionalidades de cadastro de usuários, autenticação com **JWT**, proteção de rotas por **guards**, e testes unitários com **Jest**. A aplicação se conecta a um banco de dados relacional via **TypeORM**.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [JWT](https://jwt.io/)
- [Jest](https://jestjs.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [TypeScript](https://www.typescriptlang.org/)

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm ou yarn
- Banco de dados (PostgreSQL, MySQL, SQLite, etc.)

---

## ⚙️ Configuração

1. **Clone o projeto:**

```bash
git clone https://github.com/luizqos/teste-tecnico.git
cd teste-tecnico


## Crie o arquivo .env

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=usuario
DATABASE_PASSWORD=senha
DATABASE_NAME=nome_do_banco

JWT_SECRET=sua_chave_jwt
JWT_EXPIRATION=3600s

## Instale as dependências

```bash
$ yarn install
```

## Compilar e executar o projeto

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Executar os testes

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
