FROM node:16-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM node:16-alpine AS builder
WORKDIR /app

ARG BASE_URL=https://admin.ishonch.uz/api
ARG HOST_URL=http://ishonch.uz
ENV BASE_URL=$BASE_URL
ENV HOST_URL=$HOST_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV BASE_URL=https://admin.ishonch.uz/api
ENV HOST_URL=http://ishonch.uz

COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/static ./static
COPY --from=builder /app/nuxt.config.js ./nuxt.config.js
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
RUN touch .env

EXPOSE 3000
CMD ["npm", "run", "start"]
