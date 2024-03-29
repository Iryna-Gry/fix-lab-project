ARG NODE_VERSION=18

FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine3.17 as base

ARG PACKAGE_NAME=server
# ARG PNPM_VERSION=8.9.0
ARG SERVICE_PATH=apps/server

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
#     npm i --global --no-update-notifier --no-fund pnpm@${PNPM_VERSION}

FROM base AS dependencies
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY ${SERVICE_PATH}/package.json ./${SERVICE_PATH}/package.json
# --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --filter ${PACKAGE_NAME}

FROM base AS builder
COPY . /app
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/${SERVICE_PATH}/node_modules ./${SERVICE_PATH}/node_modules
COPY ${SERVICE_PATH}/.env.docker.example ./${SERVICE_PATH}/.env

ENV NODE_ENV production

RUN pnpm db:generate
RUN pnpm build:server
RUN pnpm deploy --filter=server --prod /prod/${PACKAGE_NAME}

COPY ${SERVICE_PATH}/migrate-and-start.sh ./prod/${PACKAGE_NAME}/migrate-and-start.sh
RUN chmod +x /prod/${PACKAGE_NAME}/migrate-and-start.sh

FROM base as runner
COPY --chown=node:node --from=builder /prod/${PACKAGE_NAME} /app/${SERVICE_PATH}
COPY --chown=node:node --from=builder /app/${SERVICE_PATH}/.env /app/${SERVICE_PATH}/.env
COPY --chown=node:node --from=builder /app/${SERVICE_PATH}/dist /app/${SERVICE_PATH}/dist
WORKDIR /app
COPY tsconfig.json ./tsconfig.json

WORKDIR /app/${SERVICE_PATH}
USER node

ENV NODE_ENV=production
ENV PORT 3000
ENV HOSTNAME 0.0.0.0
EXPOSE 3000

CMD ["./migrate-and-start.sh"]

FROM base as prisma-runner
COPY --chown=node:node --from=runner /app/${SERVICE_PATH} /app/apps/prisma
WORKDIR /app/apps/prisma

USER node

ENV PORT 5555
ENV HOSTNAME 0.0.0.0

EXPOSE 5555

CMD ["pnpm", "studio"]