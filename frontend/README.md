
# Frontend - User Management

Este é o **Frontend** da aplicação de gerenciamento de usuários, desenvolvido em **React** com **Styled-Components** para estilização. Este projeto permite cadastro, edição, filtro, ordenação e visualização de usuários. O frontend consome a API REST desenvolvida em NestJS (disponível no repositório backend).

## 🧠 Tecnologias e Ferramentas

- **React**
- **Vite**
- **Styled-Components**
- **Axios**
- **React Router**
- **Docker**
- **Nginx** (para servir a aplicação em ambiente de produção)

## 📦 Pré-requisitos

- Docker e Docker Compose instalados na máquina.

## 🚀 Executando o projeto

### ✅ Via Docker (Recomendado)

1. Crie um arquivo `.env` na raiz do projeto frontend, com o seguinte conteúdo:

```env
VITE_REACT_APP_API_URL=http://backend:3000
```

> ⚠️ Ajuste o valor da variável `VITE_REACT_APP_API_URL` de acordo com onde o backend está rodando (pode ser IP ou domínio).

2. Execute o comando:

```bash
docker compose up --build
```

3. Acesse no navegador:

```plaintext
http://localhost
```

### ✅ Localmente (sem Docker)

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env`:

```env
VITE_REACT_APP_API_URL=http://localhost:3000
```

3. Execute o projeto:

```bash
npm run dev
```

4. Acesse via navegador:

```plaintext
http://localhost:5173
```

## 🐳 Estrutura de Docker

O frontend está configurado para rodar com **Nginx** em produção. O Dockerfile realiza:

- Build da aplicação React.
- Geração dos arquivos estáticos na pasta `dist`.
- Servindo via Nginx com um arquivo `nginx.conf` customizado para tratar rotas do React (evita erro 404 em rotas como `/register` ou `/login`).

## 📁 Estrutura de pastas (simplificada)

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.tsx
├── .env
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
└── README.md
```

## 🔧 Variáveis de Ambiente

| Nome           | Descrição                          | Exemplo                      |
| ---------------| ---------------------------------- | ---------------------------- |
| `VITE_REACT_APP_API_URL` | URL da API backend (NestJS)       | `http://localhost:3000`      |

## 🏗️ Decisões de Arquitetura e Design

- O projeto foi construído utilizando **React + Vite** para garantir velocidade no desenvolvimento e build.
- O layout foi feito com **Styled-Components**, priorizando responsividade e simplicidade.
- Utilização do **React Context API** para controle de autenticação.
- As chamadas à API são centralizadas no serviço `api.ts` utilizando **Axios**.
- O roteamento foi implementado com **React Router**, garantindo navegação SPA fluida.
- A aplicação foi preparada para produção com Nginx, incluindo configuração para fallback de rotas (`try_files`) evitando erros 404 em páginas acessadas diretamente.
- A utilização do Docker permite consistência de ambiente, tanto em desenvolvimento quanto produção.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou enviar pull requests.

---

### 🧠 Autor

Desenvolvido por Luiz Silva 🚀
