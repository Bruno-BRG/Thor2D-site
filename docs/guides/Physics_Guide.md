# Physics guide

Thor2D physics is fixed-step Box2D: pixel units, deterministic stepping,
polled events plus optional callbacks. Work happens in `Fixed_Update`.

## Worlds and bodies

```odin
world, _ := thor2d.Create_Physics_World(ctx, thor2d.Default_Physics_World_Def())
def := thor2d.Default_Physics_Body_Def()
def.Type = .Dynamic
def.Position = thor2d.Vec2{400, 100}
body, _ := thor2d.Create_Physics_Body(ctx, world, def)
```

Body kinds are `.Static`, `.Kinematic`, `.Dynamic`. Tune velocity, damping,
gravity scale, sleep and bullet (CCD) in the def, or at runtime
(`Physics_Body_Set_Linear_Velocity`, `Set_Active`, `Set_Bullet`, …).
`Pixels_Per_Meter` in `Config` sets the internal length scale; gameplay code
stays in pixels.

## Shapes

```odin
shape_def := thor2d.Default_Physics_Shape_Def()  // density, friction, restitution
box, _ := thor2d.Create_Box_Shape(ctx, body, 64, 32, shape_def)
ball, _ := thor2d.Create_Circle_Shape(ctx, body, 16)
```

Box, circle, segment, capsule, polygon and chain (loops for static ground).
Shapes can be added to a live body at any time. Friction, restitution, density
and collision filters are adjustable at runtime
(`Physics_Shape_Set_Friction`, `Physics_Shape_Set_Filter`, …). Mark sensors for
trigger volumes.

## Stepping and collisions

```odin
fixed_update :: proc(ctx: ^thor2d.Context, dt: f32) {
    thor2d.Step_All_Physics(ctx, dt)
    for thor2d.Poll_Physics_Event(ctx, world) -> (ev, ok) {
        if ev.Kind == .Contact_Begin { /* … */ }
    }
}
```

Or register World callbacks once and get called after every step:

```odin
thor2d.Set_Physics_Callbacks(ctx, world, on_begin, on_end, nil, on_hit)
```

Callbacks run post-step (outside the solver), so creating or destroying bodies
inside them is safe. Sensors report through begin/end events.

## Joints, queries, debug

Distance, revolute, weld, motor, mouse, prismatic and wheel joints via
`Create_Physics_Joint` (limits and motors included, plus anchors/reaction
introspection). AABB overlap, closest/all raycasts and circle shape-casts cover
line-of-sight, bullets and AI senses. `Draw_Physics_Debug` renders every body
for tuning. Link bodies to your ECS with `Rigid_Body_2D` + `Sync_Physics_Entity`.

Two honest boundaries: pulley/rope/friction/gear joints don't exist in Box2D 3.x
(they return `.Unsupported` — distance joints cover most rope needs), and exact
closest-point distance is an AABB approximation (`Get_Physics_Distance`).

See [Physics](../modules/Physics.md).
