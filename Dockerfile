FROM --platform=$BUILDPLATFORM node:20-bookworm-slim AS builder

WORKDIR /opt/open-webapp

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build && npm run build-widgets


FROM clearml/server:2.4.0 AS runtime

RUN rm -rf /usr/share/nginx/html/* /usr/share/nginx/widgets/*

COPY --from=builder /opt/open-webapp/build/browser/ /usr/share/nginx/html/
COPY --from=builder /opt/open-webapp/dist/report-widgets/browser/ /usr/share/nginx/widgets/
