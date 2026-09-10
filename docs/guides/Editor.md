# Editor

Thor2D games are data-first: projects, scenes, entities and stable asset ids
are all inspectable without running the game. The full visual editor builds on
that foundation; today you get a CLI inspector that validates the same files
the editor will edit.

## Inspect a project

```sh
./build.sh editor examples/love_port_v08
```

```text
project: thor2d.love-port.v08
name: Thor2D LOVE Port v0.8
assets: 0
scenes: 1
entities: 0
```

Exit code is non-zero with a message on missing manifests, bad JSON or failed
validation — wire it into CI to catch broken content early.

## The data model

- **Project** (`project.json`): id, name, `assets[]`, `scenes[]`.
- **Asset**: stable `u64` id from `Asset_Id_From_Path`, kind, content hash.
- **Scene**: entity records with parent links and component maps.
- **Registry**: the runtime ECS (`ecs.odin`) mirrors scenes 1:1.

Because ids are content-derived (`FNV-1a` over the path), references stay
stable across renames of everything except the asset path itself.

## Direction

The visual editor will be a separate executable consuming `Project`, `Scene`
and `Asset_Id` — never a runtime dependency of games. Until then, the CLI
inspector plus `project-check` are the supported content workflow.
