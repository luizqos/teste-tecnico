
# 🚀 Sistema de Gerenciamento de Usuários

Este projeto é composto por um **Backend desenvolvido em NestJS com TypeORM e banco SQLite** e um **Frontend desenvolvido em React (Vite) com NGINX para servir os arquivos estáticos.** A aplicação permite o gerenciamento de usuários, autenticação, controle de permissões, filtros e listagem de usuários ativos/inativos.

---

## 🗂️ Tecnologias Utilizadas

### 🔥 Backend

- NestJS
- TypeORM
- SQLite
- JWT (Autenticação)
- Docker / Docker Compose
- Swagger para documentação

### 🎨 Frontend

- React + Vite
- TailwindCSS
- Axios (requisições HTTP)
- NGINX (para servir o build em produção)
- Docker / Docker Compose

---

## ⚙️ Como Executar o Sistema

### 🔥 Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### 📦 Subindo o ambiente

1️⃣ Clone o projeto:

```bash
git clone https://github.com/luizqos/teste-tecnico.git
cd teste-tecnico
```

2️⃣ Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do backend com:

```env
JWT_SECRET=seuSegredoJWT
DATABASE=database.sqlite
```

> ⚠️ O arquivo `.env` do frontend é usado **apenas em tempo de build**. Se necessário, configure no frontend com variáveis `VITE_` se estiver usando Vite.

3️⃣ Suba os containers:

```bash
docker compose up -d --build
```

> O Docker irá construir e executar tanto o backend quanto o frontend.

---

### 🌐 Acessos

- **Frontend:** [http://localhost](http://localhost)
- **Backend API + Swagger:** [http://localhost:3000/api](http://localhost:3001/api)

### 👥 Usuários Pré-cadastrados

| Email            | Senha      | Permissão     |
| -----------------| -----------| --------------|
| admin@admin.com  | admin@123  | Administrador |
| user@user.com    | user@123   | Usuário       |

---

### 🐳 Principais comandos Docker

- **Ver logs:**

```bash
docker compose logs -f
```

- **Acessar container do backend:**

```bash
docker compose exec backend sh
```

- **Acessar container do frontend:**

```bash
docker compose exec frontend sh
```

- **Derrubar os containers:**

```bash
docker compose down
```

---

## 📄 Documentação da API (Swagger)

Acesse via:

```
http://localhost:3000/api
```

A documentação interativa permite testar todos os endpoints diretamente no navegador.

---

## 🗺️ Estrutura dos Containers

| Serviço   | Porta Local | Descrição               |
| ----------| ------------| ------------------------|
| Frontend  | 80          | Aplicação React + NGINX |
| Backend   | 3000        | API NestJS + Swagger    |

---

## 🏛️ Decisões de Design e Arquitetura

### 🛠️ Backend

- **NestJS:** Arquitetura baseada em módulos, serviços e controladores, que promove escalabilidade, manutenção e facilidade de testes.
- **TypeORM + SQLite:** Banco de dados leve, baseado em arquivo, adequado para desenvolvimento rápido e testes locais. Pode ser facilmente migrado para PostgreSQL, MySQL ou outro.
- **Autenticação JWT:** Implementação robusta e segura para APIs REST.
- **Guarda de rotas por permissão:** Utilização de `RolesGuard` global para proteger rotas baseadas no papel do usuário.
- **Swagger:** Documentação automática da API para fácil integração e testes.
- **Filtros e ordenações dinâmicas:** Implementados de forma a permitir extensibilidade com mínimo esforço.

### 🎨 Frontend

- **React + Vite:** Escolhido por sua performance e tempo de build rápido.
- **TailwindCSS:** Para um desenvolvimento ágil, com design consistente e responsivo.
- **NGINX:** Utilizado para servir os arquivos estáticos em produção, garantindo performance, cache e roteamento eficiente.
- **Gerenciamento de estado local:** Context API para autenticação e informações de sessão.

### 🐳 Docker

- **Backend e Frontend isolados:** Containers separados, comunicação via rede interna do Docker.
- **Banco SQLite persistido:** Volume configurado para que os dados sejam mantidos mesmo após reinício dos containers.
- **Nginx no frontend:** Permite roteamento client-side com fallback adequado (`try_files $uri /index.html;`).

---

## 💾 Volumes e Persistência

O banco de dados SQLite está persistido através de um volume Docker, garantindo que os dados não sejam perdidos ao reiniciar o container.

---

## 👨‍💻 Desenvolvido por

**Luiz Silva**  
[LinkedIn](https://www.linkedin.com/in/luiz-alves-silva) | [GitHub](https://github.com/luizqos/)
