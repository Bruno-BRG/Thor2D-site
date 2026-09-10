# Packaging

Ship one file: code, assets and manifest bundled as a `.thor` archive with
SHA-256 integrity. Players never unpack anything by hand.

## Project layout

Every shippable game is a directory with a `project.json` manifest:

```json
{
  "schema_version": 1,
  "project_id": "studio.mygame",
  "name": "My Game",
  "assets": [],
  "scenes": [{ "id": "main", "name": "Main", "entities": [] }]
}
```

```sh
./build.sh project-check examples/mygame   # validate the manifest
```

## Build the package

```sh
./build.sh pack examples/mygame        # → build/mygame.thor
./build.sh project-run build/mygame.thor   # play it straight from the archive
./build.sh unpack build/mygame.thor        # inspect contents
```

Packing compiles an optimized binary, writes `thor2d-manifest.json` (runtime
version, file sizes, SHA-256 per file) and zips everything. The runner
validates schema, sizes and hashes **before** launching, extracts only the
executable to a temp dir, and mounts the archive read-only.

## How files resolve

At runtime every asset API reads through one lookup order:

```text
save directory → project directory → mounted .thor archive
```

Saves and settings always win over shipped content, and packaged games read
assets in place — no install step, no unpacking.

## Save data

Write player-facing files through the save sandbox (`Write_Save`,
`Create_Directory`, `Append_Save`); they land outside the package in the
per-game save directory and survive updates. See
[Filesystem](../modules/Filesystem.md).
