# Install dependencies only when needed
FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./

RUN npm install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ARG DB_USER=null
ARG DB_PASSWORD=null
ARG DB_CLUSTER=null
ARG DB_NAME=null
ARG JWT_ACCESS_KEY=null
ARG JWT_ACCESS_KEY_TIME=null
ARG JWT_REFRESH_KEY=null
ARG JWT_REFRESH_KEY_TIME=null
ARG NEXT_PUBLIC_AUTH_HEADER=null
ARG NEXT_PUBLIC_S3_BUCKET=null
ARG NEXT_PUBLIC_SERVER_URL=null
ARG NEXT_PUBLIC_HTTP=null

ENV DB_USER $DB_USER
ENV DB_PASSWORD $DB_PASSWORD
ENV DB_CLUSTER $DB_CLUSTER
ENV DB_NAME $DB_NAME
ENV JWT_ACCESS_KEY $JWT_ACCESS_KEY
ENV JWT_ACCESS_KEY_TIME $JWT_ACCESS_KEY_TIME
ENV JWT_REFRESH_KEY $JWT_REFRESH_KEY
ENV JWT_REFRESH_KEY_TIME $JWT_REFRESH_KEY_TIME
ENV NEXT_PUBLIC_AUTH_HEADER $NEXT_PUBLIC_AUTH_HEADER
ENV NEXT_PUBLIC_S3_BUCKET $NEXT_PUBLIC_S3_BUCKET
ENV NEXT_PUBLIC_SERVER_URL $NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_HTTP $NEXT_PUBLIC_HTTP
ENV NEXT_PUBLIC_NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./  
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 80

ENV PORT 80


CMD ["node", "server.js"]