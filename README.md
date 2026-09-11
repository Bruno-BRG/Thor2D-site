# Thor2D-site

Official website + documentation browser for [Thor2D](https://github.com/Bruno-BRG/Thor2D), the Odin-native 2D game framework.

- `index.html` — landing page (hero, quickstart, features, download)
- `docs.html` — wiki browser (renders `docs/*.md` client-side)
- `changelog.html` — release history
- `docs/` — copy of the framework's `docs/wiki` (refresh with `sync-docs.sh`)
- `css/`, `assets/` — theme + logo
- `Dockerfile` + `nginx.conf` + `docker-compose.yml` — production container

## Run with Docker (Coolify-ready)

```sh
docker compose up -d --build
# open http://localhost:8080  (override with PORT=3000)
```

On Coolify: New Project → add this repo as a **Docker Compose** (or Dockerfile)
service, set the domain, deploy. No env vars or volumes required; static files
only, healthcheck on `/`, restarts unless-stopped.

## Preview without Docker

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Sync docs from the framework repo

```sh
./sync-docs.sh [/path/to/Thor2D]
```

## Deploy

Any static host works (GitHub Pages, Netlify, nginx). For GitHub Pages, serve from the `main` branch root.
