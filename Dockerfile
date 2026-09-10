# Thor2D-site — production image (static nginx, ~10 MB)
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="Thor2D-site" \
      org.opencontainers.image.description="Official Thor2D website + wiki browser" \
      org.opencontainers.image.url="https://github.com/Bruno-BRG/Thor2D-site" \
      org.opencontainers.image.source="https://github.com/Bruno-BRG/Thor2D-site"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html docs.html changelog.html .nojekyll ./
COPY css/ ./css/
COPY assets/ ./assets/
COPY docs/ ./docs/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
