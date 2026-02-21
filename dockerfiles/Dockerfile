FROM node:24.10.0-slim as build-stage

WORKDIR /app

# (Opcional) Si tu repo NO trae .yarn/releases/yarn-*.cjs y dependés de corepack,
# dejá estas 2 líneas. Si tu repo SÍ trae Yarn dentro de .yarn/releases,
# corepack no es necesario pero no molesta.
RUN corepack enable

#  Copiar manifests primero para cache
COPY package.json yarn.lock ./

#  Postinstall ahora llama a scripts/postinstall.js -> debe existir antes del install
COPY scripts/ ./scripts/

#  Dependencias locales (porque tenés file:local-packages/...)
COPY local-packages/ ./local-packages/

# Instalar dependencias (en CI seteamos CI=true para que tu postinstall no haga nada)
ENV CI=true
RUN yarn install --immutable

# Copiar el resto del proyecto
COPY . .

# build del paquete codegen sin depender del yarn v1 del paquete
RUN node ./node_modules/typescript/bin/tsc -p node_modules/@codegen/inspector-core-api/tsconfig.json

# Build explícito (ya no lo hacemos en postinstall)
RUN yarn quasar prepare
RUN yarn build

FROM nginx:1.17.9-alpine

# Listen port overridable
ENV LISTEN_PORT=80

# Application version environmental variable
ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION

CMD mkdir /etc/nginx/ssl

COPY --from=build-stage /app/dist/spa/ /usr/share/nginx/html
COPY ./dockerfiles/default.conf.template /etc/nginx/conf.d/default.conf.template

COPY ./dockerfiles/start.sh /usr/share/nginx/start.sh
RUN chmod +x /usr/share/nginx/start.sh

ENTRYPOINT ["/usr/share/nginx/start.sh"]
