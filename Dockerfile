FROM node:22-alpine AS base

WORKDIR /app

RUN apk add --no-cache bash netcat-openbsd

COPY package*.json ./

FROM base AS development

RUN npm install

COPY . .

RUN chmod +x ./wait-for-db.sh

EXPOSE 3000

CMD ["sh", "-c", "./wait-for-db.sh && npm run start:dev"]

FROM base AS build

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

RUN apk add --no-cache bash netcat-openbsd

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/wait-for-db.sh ./wait-for-db.sh
COPY --from=build /app/.env.example ./.env.example

RUN chmod +x ./wait-for-db.sh

EXPOSE 3000

CMD ["sh", "-c", "./wait-for-db.sh && npm run migration:run && node dist/main"]
