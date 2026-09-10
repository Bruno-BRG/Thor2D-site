# Audio guide

Thor2D audio runs on a private miniaudio engine: pick a playback device once,
then play static, streamed or queue-fed sources through buses and effects.

## Sources

```odin
sfx, _    := thor2d.Load_Audio_Source(ctx, "sfx/jump.wav", .Static)
music, _  := thor2d.Load_Audio_Source(ctx, "music/theme.ogg", .Stream)
voice, _  := thor2d.Create_Queueable_Source(ctx)   // feed realtime PCM
thor2d.Play_Audio_Source(ctx, music)
thor2d.Set_Audio_Source_Volume(ctx, music, 0.8)
thor2d.Set_Audio_Source_Looping(ctx, music, true)
```

Generated and decoded audio start as `Sound_Data` (sine fills, file loads,
format conversion, resampling), then become sources. Stream position, looping,
pitch, pan, seek/tell and full state getters (`Audio_Source_Is_Looping`,
`Get_Volume`, …) are all available. `Play/Pause/Stop_All_Audio` drive global
transport for pause menus and cutscenes.

## Buses and effects

```odin
bus, _ := thor2d.Create_Audio_Bus(ctx, "music")
thor2d.Set_Source_Bus(ctx, music, bus)
thor2d.Set_Audio_Bus_Volume(ctx, bus, 0.7)
fx, _ := thor2d.Create_Audio_Effect(ctx, .Reverb)
thor2d.Attach_Audio_Effect(ctx, bus, fx)
```

Route categories (music/sfx/voice) to buses, mix per-bus volume, attach volume,
delay and filter effects. `Is_Audio_Effects_Supported` guards the pipeline.

## Spatial audio

```odin
thor2d.Set_Audio_Listener(ctx, pos, vel)
thor2d.Set_Audio_Orientation(ctx, forward, up)
thor2d.Set_Audio_Source_Position(ctx, sfx, pos)
thor2d.Set_Audio_Distance_Model(ctx, .Inverse_Clamped)
```

2D positions with distance attenuation, cones, direction and doppler — enough
for top-down and side-view worlds with real depth cues.

## Capture

```odin
if thor2d.Query_Capability(ctx, .Audio_Capture) {
    thor2d.Start_Audio_Capture(ctx)
    // … later:
    data, _ := thor2d.Read_Audio_Capture(ctx)
}
```

Microphone input lands in a ring buffer you drain as `Sound_Data` — voice chat,
level meters, audio-reactive visuals. Device enumeration
(`Audio_Recording_Devices`) tells you what's plugged in.

See [Audio](../modules/Audio.md), [Sound](../modules/Sound.md).
