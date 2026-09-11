# Thor2D reference

Thor2D is a 2D framework for Odin. Game programs import
`thor2d "thor2d:thor2d"` with the compiler option `-collection:thor2d=src`.
Native graphics, physics and audio libraries are private implementation details.

## Install and download

[Installation](Installation.md) covers source downloads, Linux setup, Windows
compilation requirements and the distinction between source and executable releases.

## API

- [Runtime](thor2d.md): configuration, callbacks and the game loop.
- [Function reference](Complete_API.md): signatures, source comments and implementation links.
- [Function index](Api_Reference.md): alphabetical groups by source file.

## Modules

| Area | Reference |
| --- | --- |
| Rendering | [Graphics](modules/Graphics.md), [Font](modules/Font.md), [Image](modules/Image.md), [Transforms](modules/Transforms.md) |
| Simulation | [Physics](modules/Physics.md), [ECS](modules/ECS.md), [Math](modules/Math.md) |
| Input | [Keyboard](modules/Keyboard.md), [Mouse](modules/Mouse.md), [Joystick](modules/Joystick.md), [Touch](modules/Touch.md) |
| Media | [Audio](modules/Audio.md), [Sound](modules/Sound.md), [Video](modules/Video.md) |
| Runtime services | [Event](modules/Event.md), [Timer](modules/Timer.md), [Window](modules/Window.md), [System](modules/System.md) |
| Data and tools | [Filesystem](modules/Filesystem.md), [Data](modules/Data.md), [Project](modules/Project.md), [Thread](modules/Thread.md), [Net](modules/Net.md) |

## Reading the API

Colors use byte channels (`0–255`). Most runtime operations take `ctx: ^Context`;
standalone math, ECS and data utilities have their own signatures. Fallible
operations return an `Error`, often alongside a result. Check for `.None` before
using a resource. `.Unsupported` and `.Capability_Unavailable` are meaningful
results, particularly for headless execution and optional hardware.

Allocated data and native resources have explicit destruction functions. A
handle belongs to the context that created it; do not send GPU operations to
worker threads.
