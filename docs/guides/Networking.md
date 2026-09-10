# Networking

The `Net` module gives you non-blocking TCP and UDP with zero dependencies.
Sockets never block the game loop: empty reads report `.Not_Ready`, so you poll
them like events.

## Echo client in ten lines

```odin
server, _ := thor2d.TCP_Listen(ctx, thor2d.Net_Address{Host = "127.0.0.1", Port = 17421})
stream, _ := thor2d.TCP_Connect(ctx, thor2d.Net_Address{Host = "127.0.0.1", Port = 17421})
conn, cerr := thor2d.TCP_Accept(ctx, server)   // .Not_Ready until a client arrives
if cerr == .None {
    thor2d.TCP_Send(ctx, stream, transmute([]u8)string("ping"))
}
```

See `examples/net_echo_v09` for the complete loopback demo (runs headless).

## Patterns

- **Authoritative server:** run the simulation under `Run_Headless` on the
  server, broadcast snapshots over UDP, send reliable events over TCP.
- **Lobby / matchmaking:** plain TCP to your backend; JSON helpers live in
  the [Data](../modules/Data.md) module.
- **LAN discovery:** UDP broadcast via `UDP_Send_To` / `UDP_Receive_From`.

## Rules

- Prefer IP literals in-game; `Net_Resolve` does OS DNS and may take time.
- Every receive path returns bytes-read plus `Error` — `(0, .None)` means the
  peer closed gracefully, `.Not_Ready` means "try again next frame".
- Closes are nil-safe and idempotent; close what you open, even on errors.

See [Net](../modules/Net.md).
