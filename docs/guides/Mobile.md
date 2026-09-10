# Mobile

Thor2D is desktop-first today (Linux AMD64 primary, Windows planned). The API
already carries the mobile-facing surface so games written now won't need
rewrites later — desktop implementations answer honestly where hardware or OS
support doesn't exist yet.

## What works now

- **Touch input** (`Touch_Count`, `Touch_Position`, `Get_Touch_Ids`) — full
  lifecycle on capable backends; desktop reports no touches.
- **Display info** (`Get_Display_Info`, `Get_Safe_Area`, `Get_Display_Orientation`)
  — aspect-derived values where the OS exposes nothing.
- **Power and presence** (`Get_Power_Info`, `Has_Background_Music`) — desktop
  reports sane defaults (`nobattery`, `false`).
- **Safe area** — lay out HUD inside `Get_Safe_Area` and notches/rounded
  corners are handled wherever the platform reports them.

## Honest stubs (mobile-future)

These compile and run everywhere but report `.Unsupported` on desktop:

| Procedure | Desktop behavior |
| --- | --- |
| `Vibrate(seconds)` | `.Unsupported` (no vibration motor) |
| `Set_Display_Sleep_Enabled` | Stored intent, `.Unsupported` |
| `Game.On_Low_Memory` | Never fired (no OS signal); free caches manually |
| `Has_Screen_Keyboard` | `false` |

## Writing portable games today

1. Gate mobile-only calls on return values, not on platform checks.
2. Keep touch and mouse input paths unified (tap = click) via `Action_Map`.
3. Respect `Get_Safe_Area` for HUD and `Window_DPI_Scale` for crispness.
4. Test the headless path in CI — it exercises the same fallbacks servers use.

## Export outlook

Android/iOS export (real vibration, orientation events, screen keyboard,
lifecycle callbacks) is on the roadmap after the desktop editor. See the
[Changelog](../changelog.html) for status.
