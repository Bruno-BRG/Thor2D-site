# Thor2D Wiki

Thor2D is an Odin-native 2D game framework: an explicit runtime, real
primitives, physics, audio and packaging — designed to be learned in an
afternoon and trusted in production.

Game code imports only `thor2d`:

```odin
package game

import thor2d "thor2d"

draw :: proc(ctx: ^thor2d.Context) {
    thor2d.Clear_Screen(ctx)
    thor2d.Draw_Circle(ctx, thor2d.Vec2{100, 100}, 32, thor2d.Get_Color(ctx))
}

main :: proc() {
    thor2d.Run(thor2d.Default_Config(), thor2d.Game{Draw = draw})
}
```

## Modules

| Wiki page | Covers | Thor2D source |
| --- | --- | --- |
| [thor2d](thor2d.md) | Game lifecycle, `Run`, configuration | `context.odin`, `types.odin` |
| [modules/Audio](modules/Audio.md) | Playback, buses, effects, spatial audio, capture | `audio.odin`, `love_gaps.odin` |
| [modules/Data](modules/Data.md) | Buffers, codecs, hashing, compression | `data.odin`, `love_gaps.odin` |
| [modules/Event](modules/Event.md) | Event queue, polling, callbacks | `context.odin` |
| [modules/Filesystem](modules/Filesystem.md) | Sandboxed files, save data, packages | `filesystem.odin`, `filesystem_extra.odin` |
| [modules/Font](modules/Font.md) | Fonts, text measurement and layout | `graphics.odin`, `graphics_state.odin` |
| [modules/Graphics](modules/Graphics.md) | Drawing, state, canvas, shaders, particles | `graphics.odin`, `graphics_state.odin` |
| [modules/Image](modules/Image.md) | CPU images, pixels, encoding | `image.odin` |
| [modules/Joystick](modules/Joystick.md) | Gamepads, vibration, hats | `input.odin`, `input_extra.odin` |
| [modules/Keyboard](modules/Keyboard.md) | Keys, scancodes, text input | `input.odin`, `input_extra.odin` |
| [modules/Math](modules/Math.md) | Vectors, transforms, RNG, curves | `math.odin`, `random.odin`, `love_gaps.odin` |
| [modules/Mouse](modules/Mouse.md) | Buttons, position, cursors, grab | `input.odin`, `input_extra.odin`, `system.odin` |
| [modules/Net](modules/Net.md) | Non-blocking TCP/UDP networking | `net.odin` |
| [modules/Physics](modules/Physics.md) | Rigid bodies, joints, queries, callbacks | `physics_box2d.odin`, `physics_extra.odin` |
| [modules/Sound](modules/Sound.md) | Sample data, decoders | `audio.odin` |
| [modules/System](modules/System.md) | OS, clipboard, power, version | `system.odin`, `window.odin` |
| [modules/Thread](modules/Thread.md) | Workers, channels | `threads.odin` |
| [modules/Timer](modules/Timer.md) | Delta time, FPS, fixed step | `context.odin`, `system.odin` |
| [modules/Touch](modules/Touch.md) | Touch presses | `input.odin`, `input_extra.odin` |
| [modules/Video](modules/Video.md) | Video streams (optional FFmpeg build) | `video.odin` |
| [modules/Window](modules/Window.md) | Window, displays, cursors | `context.odin`, `system.odin`, `window.odin` |

## Guides

- [Getting_Started](guides/Getting_Started.md) — install, first game, build, test.
- [Core_Concepts](guides/Core_Concepts.md) — Context, handles, errors, headless mode.
- [Graphics_Guide](guides/Graphics_Guide.md) — state, drawing, canvas, shaders, particles.
- [Physics_Guide](guides/Physics_Guide.md) — worlds, bodies, joints, collision callbacks.
- [Audio_Guide](guides/Audio_Guide.md) — sources, buses, effects, spatial audio.
- [Capabilities](guides/Capabilities.md) — `Query_Capability` rules and optional features.
- [Packaging](guides/Packaging.md) — manifests, `.thor` packages, distribution.
- [Networking](guides/Networking.md) — TCP/UDP without blocking the loop.
- [Mobile](guides/Mobile.md) — mobile-facing APIs and export outlook.
- [Editor](guides/Editor.md) — project inspector and editor direction.
- [Api_Reference](Api_Reference.md) — every public procedure, auto-generated.

## Conventions used on every page

- `ctx: ^Context` is always the first argument.
- `Color` channels are `u8` (0–255).
- Functions that can fail return `(T, Error)`; unavailable hardware returns
  `.Unsupported` or `.Capability_Unavailable` — never a fake handle.
- `Headless` contexts run the same lifecycle without a window or GPU.
