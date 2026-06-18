ARG NODE_VERSION=23.11.0
FROM node:${NODE_VERSION}-slim AS base
LABEL fly_launch_runtime="NestJS"
WORKDIR /app
ENV NODE_ENV="production"
ARG PNPM_VERSION=11.1.3
RUN npm install -g pnpm@$PNPM_VERSION

FROM base AS build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false --ignore-scripts
RUN pnpm exec playwright install chromium --with-deps
COPY . .
RUN pnpm run build

FROM base
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 \
    libxfixes3 libxrandr2 libgbm1 libasound2 && \
    rm -rf /var/lib/apt/lists/*
COPY --from=build /app /app
COPY --from=build /root/.cache/ms-playwright /root/.cache/ms-playwright
EXPOSE 4001
CMD [ "pnpm", "run", "start:prod" ]
