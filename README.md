# Momesso

Monorepo com backend (NestJS) e frontend (Angular). 

## Estrutura

```
momesso/
├── backend/   # API em NestJS + TypeORM + PostgreSQL
└── frontend/  # SPA em Angular + Tailwind
```

## Tecnologias

**Backend**
- NestJS 11
- TypeORM
- PostgreSQL (`pg`)
- JWT (`@nestjs/jwt`)
- Swagger (`@nestjs/swagger`)

**Frontend**
- Angular 21
- Tailwind CSS 4

## Backend

```bash
cd backend
npm install
```

Configure um `.env` na raiz de `backend/` com as variáveis do PostgreSQL e o segredo JWT (ver [backend/src/database/config/data-source.ts](backend/src/database/config/data-source.ts)).

Rode as migrations:

```bash
npm run migration:run
```

Seed inicial:

```bash
npm run seed
```

Rodar em modo dev:

```bash
npm run start:dev
```

Swagger fica disponível em `http://localhost:3000/swagger`.

### Migrations

Ficam em [backend/src/database/migrations/](backend/src/database/migrations/):

- `1779549902560-Init.ts` — schema inicial

>  As **policies de Row Level Security (RLS)** estão na migration [`1779549902561-Rls.ts`](backend/src/database/migrations/1779549902561-Rls.ts).

## Frontend

```bash
cd frontend
npm install
npm start
```

Roda em `http://localhost:4200`

