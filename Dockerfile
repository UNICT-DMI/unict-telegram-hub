FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /unict-telegram-hub
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn --immutable

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /unict-telegram-hub
COPY --from=deps /unict-telegram-hub/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /unict-telegram-hub

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Create cache directories and set the correct permissions
RUN mkdir cachedData
RUN mkdir cachedData/bachelor
RUN mkdir cachedData/master
RUN chown -R nextjs:nodejs cachedData
RUN chown -R nextjs:nodejs cachedData/bachelor
RUN chown -R nextjs:nodejs cachedData/master

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /unict-telegram-hub/public ./public
COPY --from=builder --chown=nextjs:nodejs /unict-telegram-hub/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /unict-telegram-hub/.next/static ./.next/static

USER nextjs

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]