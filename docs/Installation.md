# Installation and downloads

Thor2D is an Odin library compiled into your game, rather than a standalone
editor installer. A source archive contains the framework and examples; a
binary archive contains already-built executables for its stated platform.

## Downloads

| Download | Contents |
| --- | --- |
| [Current source ZIP](https://github.com/Bruno-BRG/Thor2D/archive/refs/heads/master.zip) | Latest framework, documentation and examples; use on Linux or Windows |
| [v0.11 source ZIP](https://github.com/Bruno-BRG/Thor2D/archive/refs/tags/v0.11.zip) | Fixed v0.11 source snapshot |
| [Linux AMD64 binaries — v0.10](https://github.com/Bruno-BRG/Thor2D/releases/download/v0.10/thor2d-v0.10-linux-amd64.tar.gz) | Older prebuilt release; not v0.11 |
| [Release files](https://github.com/Bruno-BRG/Thor2D/releases) | Published versions and binary assets |

At the time this page was updated, v0.11 has source archives but no uploaded
binary assets. A Windows executable is not currently attached to these releases.

## Linux: build from source

Requirements: Linux AMD64, Git, Python 3, a C/C++ toolchain and a graphical
desktop for windowed examples. The scripts install Odin `dev-2026-09` and build
the private miniaudio and Box2D dependencies.

```sh
git clone https://github.com/Bruno-BRG/Thor2D.git
cd Thor2D
./build.sh deps
./build.sh hello
./build.sh build
```

Built examples are written to `bin/`. To use an existing compiler, set
`ODIN_BIN=/absolute/path/to/odin`. The compiler's vendor tree must also contain
the native dependency archives and Thor2D's Box2D bridge.

## Windows: compile a game

Install the Windows Odin toolchain from [Odin releases](https://github.com/odin-lang/Odin/releases).
Use a developer terminal with the native linker/toolchain required by Odin.
Clone or extract the source, then run from the framework root:

```powershell
odin build examples/hello -collection:thor2d=src -out:thor2d-hello.exe -o:speed
.\thor2d-hello.exe
```

This command requires Windows-compatible Raylib, miniaudio and Box2D libraries
in the Odin vendor tree, including the Thor2D Box2D bridge. The repository's
`build.sh deps` is a Linux bootstrap script, not a Windows installer. A missing
`.lib` or bridge symbol is a native dependency setup problem; see
[dependency details](https://github.com/Bruno-BRG/Thor2D/blob/master/docs/dependencies.md).
The Windows build command has not been validated on this Linux documentation host.

## Import and compile your project

```odin
package game
import thor2d "thor2d:thor2d"

draw :: proc(ctx: ^thor2d.Context) {
    thor2d.Clear(ctx, thor2d.Black)
    thor2d.Draw_Circle(ctx, thor2d.Vec2{100, 100}, 24, thor2d.White)
}

main :: proc() {
    err := thor2d.Run(thor2d.Default_Config(), thor2d.Game{Draw = draw})
    assert(err == .None)
}
```

Pass `-collection:thor2d=/path/to/Thor2D/src` when building a project outside
this repository. Optional FFmpeg video requires a separate adapter build;
ordinary rendering and audio do not require FFmpeg.
