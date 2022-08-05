# BeeJee Todo

### Getting Started

1. Clone the repository
2. Install dependencies

```bash
yarn install
```

### Client

1. Go to `client`
2. Create `.env` file. Use `.env.example` as a template.
3. Run server

```bash
yarn dev
```

### Server

1. Go to `server`
2. Create `.env` file. Use `.env.example` as a template.
3. Sync database

```bash
npx prisma db push
```

4. Seed database

```bash
npx prisma db seed
```

5. Run TS server

```bash
yarn watch
```

6. Run server

```bash
yarn dev
```

### Constraints

- It assumes that all the API calls will be successful.
- Basic JWT authentication is used.
