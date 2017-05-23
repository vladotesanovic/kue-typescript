# kue-typescript
Kue implementation in TypeScript with Express

- https://github.com/Automattic/kue

## Getting start

Create .env file in folder root, create two variables:

```text
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

```bash
npm install

npm start
npm run kue-dashboard
```

 - http://127.0.0.1:3003 -> Application
 - http://127.0.0.1:3000 -> Kue dashboard