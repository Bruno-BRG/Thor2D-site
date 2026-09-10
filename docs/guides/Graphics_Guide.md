# Graphics guide

## State first

Thor2D keeps drawing state on the `Context`: current color, background color,
font, blend mode and scissor. Set it once, draw many times.

```odin
thor2d.Set_Color(ctx, thor2d.Red)
thor2d.Set_Background_Color(ctx, thor2d.RGB(18, 24, 38))
thor2d.Clear_Screen(ctx)   // clears to the background color
```

Colors are `u8` channels (0–255): `thor2d.RGB(r, g, b)`, `thor2d.RGBA(r, g, b, a)`,
plus `White/Black/Red/Green/Blue/Gray` constants.

## Primitives

```odin
thor2d.Draw_Rect(ctx, rect, color)
thor2d.Draw_Rect_Outline(ctx, rect, thickness, color)
thor2d.Draw_Circle(ctx, center, radius, color)
thor2d.Draw_Line(ctx, a, b, thickness, color)
thor2d.Draw_Arc(ctx, center, radius, a1, a2, .Fill)      // angles in radians
thor2d.Draw_Ellipse(ctx, center, rx, ry, .Line)
thor2d.Draw_Polygon(ctx, points, .Fill)                  // triangulated for you
thor2d.Draw_Points(ctx, points, color)
```

`Draw_Mode` is `.Fill` or `.Line` everywhere — one vocabulary for all shapes.

## Text

```odin
thor2d.Print(ctx, "score: 12", pos)                       // current color/font
thor2d.Printf(ctx, "wrapped…", rect, .Center)             // aligned block
font, _ := thor2d.Load_Font(ctx, "assets/mono.ttf")
thor2d.Set_Font(ctx, font)
thor2d.Draw_Text_Font(ctx, font, "big", pos, 48, 0, thor2d.White)
```

For dialog/typewriter flows use reusable `Text` objects (`Create_Text`,
`Text_Add`, `Draw_Text_Object`). For pixel-art fonts use image fonts
(`Load_Image_Font` + `Draw_Text_Image_Font`). Font metrics
(`Font_Ascent/Descent/Line_Height`, `Measure_Text_Font`) drive custom layout.

## Textures, quads, batches

```odin
tex, _ := thor2d.Load_Texture(ctx, "assets/hero.png")
thor2d.Draw_Texture(ctx, tex, pos, tint)
quad := thor2d.New_Quad_From_Texture(ctx, tex, thor2d.Rect{0, 0, 32, 32})
thor2d.Draw_Texture_Quad(ctx, tex, quad, pos, rotation, scale, tint)
// hundreds of sprites, one call:
batch, _ := thor2d.Create_Sprite_Batch(ctx, tex, 1024)
```

`Draw_Texture_Transform` adds origin/shear control. `Set_Texture_Filter/Wrap`
control sampling per texture.

## Canvas, shaders, particles

- **Canvas** (`Create_Canvas`, `Set/Reset_Canvas`, `Canvas_Render_To`,
  `Canvas_To_Image`): render-to-texture for post effects, minimaps, cached layers.
- **Shaders** (`Load_Shader`, `Begin/End_Shader`, `Set_Shader_*`): GLSL with
  `Shader_Has_Uniform` introspection.
- **Particles** (`Create_Particles` + ~40 tuning procs): emission rate and
  lifetime, direction/spread/speed, acceleration, damping, spin, size and color
  tracks, start/stop/pause/clone. Systems simulate deterministically — including
  headless.
- **Meshes** (`Create/Update/Draw_Mesh`, vertex accessors, instanced draw):
  custom geometry with UV/color/normal attributes.

## Cameras and transforms

```odin
thor2d.Begin_Camera(ctx, camera)   // follow the player
// … draw world …
thor2d.End_Camera(ctx)
// … draw UI …
thor2d.Push_Transform(ctx)
thor2d.Translate(ctx, offset)
thor2d.Rotate(ctx, angle)
thor2d.Pop_Transform(ctx)
```

`World_To_Screen` / `Screen_To_World` convert coordinates (mouse picking);
`Get_Transform_Stack_Depth` helps debug unbalanced push/pop.

See [Graphics](../modules/Graphics.md), [Font](../modules/Font.md),
[Image](../modules/Image.md).
