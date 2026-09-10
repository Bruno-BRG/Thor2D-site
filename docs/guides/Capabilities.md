# Capabilities

Optional hardware and build features are never assumed — you ask first with
`Query_Capability`, then use the API or take a fallback path. An unavailable
feature returns `.Unsupported` or `.Capability_Unavailable`, never a fake
handle.

```odin
if thor2d.Query_Capability(ctx, .GPU_Mesh) {
    // custom meshes take the fast path
}
```

## The matrix

| Capability | Meaning | When true |
| --- | --- | --- |
| `.Headless` | No window/GPU context | Headless `Context` |
| `.Archive_Mount` | `.thor` packages mountable | Always |
| `.Video` | FFmpeg decode available | Built with the video adapter |
| `.Audio_Capture` | Microphone input | Live device present |
| `.Audio_Effects` / `.Audio_Spatial` / `.Audio_Decoder` / `.Audio_Buses` | Engine features | Live miniaudio backend supports them |
| `.GPU_Mesh` | Fast mesh path | Live non-headless GPU backend |
| `.Instancing` | Instanced mesh drawing | Same as above |
| `.Fullscreen` / `.Gamepad` / `.Touch` | Window features | Live window backend |
| `.Stencil` / `.Color_Mask` | Advanced GPU state | Not yet — setters store + report `.Unsupported` |
| `.System_Cursor` / `.Gamepad_Mapping` | OS integration | Live window backend |

## Headless mode

Headless contexts report `.Headless` and only the capabilities that don't need
hardware. Drawing calls become safe no-ops, simulation (physics, particles,
audio state, networking) keeps running. Write your tests and servers against
`Run_Headless` and branch on capabilities — the same game binary behaves on
both paths.

## Optional builds

Video is capability-gated at build time: the default binary doesn't link
FFmpeg, and `Load_Video` reports `.Capability_Unavailable` there. Enable it
explicitly (see [Video](../modules/Video.md)) and gate usage on
`Query_Capability(ctx, .Video)`.
