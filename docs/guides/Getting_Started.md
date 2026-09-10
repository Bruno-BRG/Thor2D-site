# Getting started

## Requirements

- Odin `dev-2026-09` (the build script installs the pinned toolchain for you)
- Linux AMD64 (primary target), a desktop OpenGL environment for windowed games
- Git

## Install

```sh
git clone https://github.com/Bruno-BRG/Thor2D.git
cd Thor2D
./build.sh deps     # installs Odin + builds Box2D/miniaudio bridges
```

`ODIN_BIN=/path/to/odin` overrides the compiler location.

## Your first game

```odin
package game

import thor2d "thor2d"

position := thor2d.Vec2{160, 180}

update :: proc(ctx: ^thor2d.Context, delta: f32) {
    speed: f32 = 240
    if thor2d.Key_Down(ctx, .Right) { position.X += speed * delta }
    if thor2d.Key_Down(ctx, .Left)  { position.X -= speed * delta }
    if thor2d.Key_Pressed(ctx, .Escape) { thor2d.Quit(ctx) }
}

draw :: proc(ctx: ^thor2d.Context) {
    thor2d.Clear_Screen(ctx)
    thor2d.Draw_Rect(ctx, thor2d.Rect{position.X, position.Y, 96, 96}, thor2d.Blue)
}

main :: proc() {
    config := thor2d.Default_Config()
    config.Title = "My Game"
    thor2d.Run(config, thor2d.Game{Update = update, Draw = draw})
}
```

Run it with any example layout: put it in `examples/mygame/main.odin` and

```sh
./build.sh project-run examples/mygame
```

## Daily commands

```sh
./build.sh check          # type-check framework + every example
./build.sh test           # full test suite (headless, single-threaded)
./build.sh parity-check   # check + test + manifests + wiki coverage
./build.sh hello pong showcase   # run bundled examples
./build.sh love-port      # windowed smoke test (needs a display)
./build.sh pack examples/mygame      # build a distributable .thor package
./build.sh project-check examples/mygame
```

## Next steps

- [Core_Concepts](Core_Concepts.md) — Context, handles, errors, headless mode
- [Graphics_Guide](Graphics_Guide.md) — draw your world
- [Physics_Guide](Physics_Guide.md) — bodies, joints, collisions
- [Packaging](Packaging.md) — ship the game
