# Thor2D-site

Official website + documentation browser for [Thor2D](https://github.com/Bruno-BRG/Thor2D), the Odin-native 2D game framework.

- `index.html` — landing page (hero, quickstart, features, download)
- `docs.html` — wiki browser (renders `docs/*.md` client-side)
- `changelog.html` — release history
- `docs/` — copy of the framework's `docs/wiki` (refresh with `sync-docs.sh`)
- `css/`, `js/` (inline), `assets/` — theme + logo

## Preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Sync docs from the framework repo

```sh
./sync-docs.sh [/path/to/Thor2D]
```

## Deploy

Any static host works (GitHub Pages, Netlify, nginx). For GitHub Pages, serve from the `master` branch root.
