# Core concepts

## The Context

Everything flows through `ctx: ^Context`, always the first argument. It owns
the window/backend, audio engine, physics worlds, filesystem sandbox, event
queue and all graphics state. There are no globals: two contexts never share
state, which is what makes headless runs deterministic.

```odin
config := thor2d.Default_Config()
config.Title = "My Game"
config.Width, config.Height = 1280, 720
config.Target_FPS = 60
ctx, err := thor2d.Create(config)
if err != .None { /* handle it */ }
defer thor2d.Destroy(&ctx)
```

Most games never call `Create` directly — `Run(config, game)` owns the whole
lifecycle (see [thor2d](../thor2d.md)).

## Handles, never pointers

Resources are opaque `u64` handles (`Texture`, `Font`, `Audio_Source`,
`Physics_Body`, …). A zero handle is invalid — every type has an `X_Invalid`
checker. Handles are cheap to copy and safe to store in your own structs and
ECS components.

## Errors, never fake resources

Fallible procedures return `(T, Error)`:

```odin
tex, err := thor2d.Load_Texture(ctx, "assets/hero.png")
if err == .File_Not_Found { /* missing asset */ }
```

When hardware or a build option can't provide something, Thor2D returns
`.Unsupported` or `.Capability_Unavailable` instead of a fake handle. Ask
first with `Query_Capability`:

```odin
if thor2d.Query_Capability(ctx, .Video) {
    stream, err := thor2d.Load_Video(ctx, "cutscene.mp4")
}
```

See [Capabilities](Capabilities.md) for the full matrix.

## The game loop

`Run` drives a variable render step plus a fixed 60 Hz update where physics
steps. Put simulation in `Fixed_Update`, presentation in `Update`/`Draw`:

```odin
thor2d.Run(config, thor2d.Game{
    Load         = load,          // once, allocate here
    Fixed_Update = fixed_update,  // 60 Hz: gameplay + physics
    Update       = update,        // per-frame: camera, UI
    Draw         = draw,          // per-frame: draw only
    Shutdown     = shutdown,      // cleanup
    On_Event     = on_event,      // input/window callbacks
    On_Error     = on_error,      // fatal runtime errors
})
```

## Headless mode

`Run_Headless(config, game, max_frames)` runs the identical lifecycle with no
window and no GPU: drawing becomes a no-op, simulation keeps running. Use it
for automated tests, dedicated servers and balance simulations. Anything that
needs the GPU reports it honestly instead of crashing.

## Filesystem sandbox

Games see three read layers — **save directory → project directory → mounted
`.thor` archive** — and may only write to the save directory. Relative paths
stay inside the sandbox (`..` escapes are rejected). See
[Filesystem](../modules/Filesystem.md) and [Packaging](Packaging.md).
