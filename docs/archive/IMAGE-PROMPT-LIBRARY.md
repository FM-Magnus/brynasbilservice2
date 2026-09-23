# Image prompt library — Brynäs Bilservice (SUPERSEDED)

**Retired 2026-09-22.** Magnus moved this to Google Drive so it's phone-accessible and reusable across future projects. The canonical, currently-edited versions now live here — treat this file as history only, do not edit or read it as current:

- `Google Drive/My Drive/## FOR AGENTS_BRYNASBIL/BRYNASBIL - CAMERA IMAGE PROMPT STARTER CAMERAS.md`
- `Google Drive/My Drive/## FOR AGENTS_BRYNASBIL/BRYNASBIL - ALL COLOR GRADING PRESETS -POST IMAGEGENERATION PROMPT.md`

The per-slot pairing log at the bottom of this file (which camera + grade was used per page) is not yet duplicated there — check with Magnus before relying on it.

---

Personal reference for the GPT imagegen + Pixelmator workflow. Two parts: **cameras** (pre-text, picks the shot) and **grades** (end-text, picks the finish). Pick one of each per slot — Claude will recommend which pairing fits a given image slot when specing a page.

---

## Part 1 — Camera presets (pre-text, applied to the RAW composition)

### 200mm Telephoto Intimacy — Face + Hands Isolation
*Best for: concentration, mechanic + component, premium creamy background compression*
Camera: Sony α1 II · Lens: Sony FE 70–200mm F2.8 GM OSS II · 200mm · f/2.8 · 1/400s · ISO 640 · AF-C Eye AF, secondary priority on hands/tool
> Re-photograph the scene with a Sony α1 II and Sony FE 70–200mm F2.8 GM OSS II at 200mm. Move roughly 40–60 cm closer while retaining enough physical distance for true telephoto compression. Shoot at f/2.8, 1/400 s, ISO 640. Build a tight medium-close composition around the subject's expression, hands, and exact mechanical interaction. Keep the eyes and working hands critically sharp while the workshop collapses naturally into large, creamy bokeh. Preserve realistic 200mm perspective compression; do not simulate artificial portrait blur.

### 35mm Environmental Commercial — Natural Workshop Context
*Best for: mechanic + car + workshop without obvious wide-angle distortion*
Camera: Nikon Z8 · Lens: NIKKOR Z 35mm f/1.8 S · 35mm · f/3.2 · 1/250s · ISO 500
> Re-photograph the scene with a Nikon Z8 and NIKKOR Z 35mm f/1.8 S. Shoot at f/3.2, 1/250 s, ISO 500. Step back enough to show the mechanic and vehicle naturally within the workshop while keeping the main action dominant. Use lifts, tyre racks, benches and ceiling lines as subtle framing and leading geometry. Position the subject approximately on a third rather than dead centre. Keep the workshop recognizable but gently separated. Aim for expensive automotive editorial photography rather than an exaggerated wide-angle look.

### 24mm Immersive Workshop — Wide Working Environment
*Best for: people around cars, service bays, workshop storytelling*
Camera: Canon EOS R5 Mark II · Lens: Canon RF 24–70mm F2.8 L IS USM · 24mm · f/4 · 1/320s · ISO 640
> Re-photograph with a Canon EOS R5 Mark II and RF 24–70mm F2.8 L IS USM set to 24mm. Shoot at f/4, 1/320 s, ISO 640. Move physically into the scene rather than merely backing away. Keep the camera around chest-to-waist height and allow nearby equipment to create foreground depth. Maintain recognizable workshop context while keeping the action clearly dominant. Preserve realistic 24mm geometry and prevent excessive edge stretching.

### 16mm Ground-Level Hero — Worm's-Eye Workshop Power
*Best for: machinery, cars, wheels, heroic mechanics*
Camera: Canon EOS R5 Mark II · Lens: Canon RF 15–35mm F2.8 L IS USM · ~16mm · f/4 · 1/400s · ISO 800 · camera height 8–15cm
> Re-photograph the scene with a Canon EOS R5 Mark II and RF 15–35mm F2.8 L IS USM at approximately 16mm. Place the camera only 8–15 cm above the workshop floor. Shoot at f/4, 1/400 s, ISO 800. Move physically close enough that a tyre edge, lift arm, tool or workshop-floor detail becomes a strong foreground leading element. Let the subject rise dramatically through the frame while preserving rectilinear geometry. Keep vertical distortion intentional but controlled.

### 14mm Extreme Frog — Floor-Skimming Ultra-Wide
*Best for: maximum drama, wheels, lifts, heavy machinery, walking mechanics*
Camera: Sony α1 II · Lens: Sony FE 14mm F1.8 GM · 14mm · f/4.5 · 1/640s · ISO 800 · camera height 3–6cm · focus ~0.9m
> Re-photograph the scene with a Sony α1 II and Sony FE 14mm F1.8 GM. Place the camera only 3–6 cm above the floor, almost touching it. Shoot at 14mm, f/4.5, 1/640 s, ISO 800, focusing roughly 0.9 metres into the scene. Position a meaningful foreground object only 15–30 cm from the lens — tyre tread, lift arm, breaker bar, wheel, trolley caster or tool — so it becomes enormous while the mechanic or vehicle towers beyond it. Aim upward about 20–30 degrees. Preserve premium rectilinear ultra-wide optics; absolutely no fisheye rendering.

### 16mm Low-Angle Torque Dutch — Mechanical Force
*Best for: breaker bars, impact wrenches, force, motion*
Camera: Nikon Z8 · Lens: NIKKOR Z 14–24mm f/2.8 S · ~17mm · f/3.5 · 1/800s · ISO 1000 · 15° Dutch angle
> Re-photograph with a Nikon Z8 and NIKKOR Z 14–24mm f/2.8 S at approximately 17mm. Lower the camera close to floor level and rotate it approximately 15 degrees so the Dutch angle follows the direction of physical force. Shoot at f/3.5, 1/800 s, ISO 1000. Capture the exact instant an impact wrench engages, a breaker bar loads under torque, or a wheel is physically moved. Keep the mechanical point of contact critically sharp. Any motion blur must remain subtle and physically plausible.

### 135mm Compressed Workshop Layers — Dense Premium Depth
*Best for: visually rich workshop scenes with foreground/background layering*
Camera: Sony α1 II · Lens: Sony FE 70–200mm F2.8 GM OSS II · 135mm · f/3.2 · 1/320s · ISO 640
> Re-photograph from farther away using a Sony α1 II and FE 70–200mm F2.8 GM OSS II at approximately 135mm. Shoot at f/3.2, 1/320 s, ISO 640. Photograph through several physical layers of workshop activity: perhaps a softly blurred tyre or lift in the foreground, the mechanic or component in sharp focus, and compressed racks or machinery behind. Use true optical compression to make the workshop feel dense, intentional and premium.

### 200mm Under-Car Telephoto — Mechanic + Tool Compression
*Best for: mechanic under lift, wheel service, facial intensity*
Camera: Nikon Z8 · Lens: NIKKOR Z 70–200mm f/2.8 VR S · 200mm · f/2.8 · 1/500s · ISO 1000
> Re-photograph from a low position beneath or beside the raised vehicle using a Nikon Z8 and NIKKOR Z 70–200mm f/2.8 VR S at 200mm. Shoot at f/2.8, 1/500 s, ISO 1000. Frame the mechanic's expression, hands, and point of mechanical contact tightly together. Keep the eyes and tool/component interface razor sharp while the wheel edge, lift structure and tyre racks dissolve naturally into compressed bokeh.

### 105mm Precision Craft Macro — Hands + Mechanical Detail
*Best for: tyre patches, brake work, connectors, fasteners, fine mechanical operations*
Camera: Nikon Z8 · Lens: NIKKOR Z MC 105mm f/2.8 VR S · 105mm · f/4 · 1/320s · ISO 640 · close focus
> Re-photograph with a Nikon Z8 and NIKKOR Z MC 105mm f/2.8 VR S. Shoot at f/4, 1/320 s, ISO 640. Move close enough for the hands, tool and exact working surface to dominate the image. Resolve glove fibres, machined metal, rubber, grease, fasteners and tool edges with high-end macro microcontrast. Keep the immediate working plane critically sharp while the face and workshop fall into soft contextual blur.

### 50mm Candid Workflow — Moving Documentary Observer
*Best for: walking, reaching, working, conversation, natural moments*
Camera: Sony α1 II · Lens: Sony FE 50mm F1.4 GM · 50mm · f/2.5 · 1/500s · ISO 800
> Re-photograph with a Sony α1 II and FE 50mm F1.4 GM. Shoot at f/2.5, 1/500 s, ISO 800. Work like an experienced documentary photographer moving intuitively around real activity. Capture the mechanic mid-stride, turning toward a vehicle, reaching for a tool, adjusting equipment or interacting naturally with another person. Allow a subtle 5–8 degree tilt only if it follows genuine body movement or architectural diagonals.

### 90° True Bird's-Eye — Direct Top-Down Geometry
*Best for: workbench arrangements, wheel service, vehicle geometry, mechanic around car*
Camera: Hasselblad X2D 100C · Lens: Hasselblad XCD 38V · 38mm MF (~30mm FF eq.) · f/5.6 · 1/250s · ISO 400 · camera perfectly vertical
> Re-photograph the scene with a Hasselblad X2D 100C and XCD 38V from directly overhead. Position the camera so the optical axis points exactly 90 degrees downward. Shoot at f/5.6, 1/250 s, ISO 400. Use the car body, wheels, lift arms, tools, floor markings, tyre equipment and mechanic as graphic geometry. Preserve extremely clean medium-format tonal separation and realistic physical proportions. It must look like a genuine overhead commercial photograph, not a drone image or architectural render.

### 45° High Oblique Overhead — Workshop Overview with Depth
*Best for: action plus surrounding equipment, more dimensional than straight bird's-eye*
Camera: Hasselblad X2D 100C · Lens: Hasselblad XCD 55V · 55mm MF (~44mm FF eq.) · f/5 · 1/250s · ISO 500 · camera height 3–5m · downward angle 45–50°
> Re-photograph from approximately 3–5 metres above floor level using a Hasselblad X2D 100C and XCD 55V. Angle the camera downward approximately 45–50 degrees. Shoot at f/5, 1/250 s, ISO 500. Keep the mechanic and vehicle slightly off-centre while surrounding workshop equipment creates ordered geometric layers. Retain realistic depth rather than flattening the entire scene.

### 85mm Foreground Portal — Shoot Through the Workshop
*Best for: sophisticated editorial framing, tools/tyres as natural foreground*
Camera: Sony α1 II · Lens: Sony FE 85mm F1.4 GM II · 85mm · f/2 · 1/320s · ISO 640
> Re-photograph with a Sony α1 II and FE 85mm F1.4 GM II. Shoot at f/2, 1/320 s, ISO 640. Place a real workshop object extremely close to the lens — wheel spokes, lift structure, tyre opening, hanging tools or machinery — and use it as a naturally blurred foreground portal. Focus sharply on the mechanic or service action beyond. Preserve true optical occlusion and depth; do not create an artificial digital frame.

### 85mm Tyre-Tunnel — Through-the-Wheel Composition
*Best for: tyre service, brakes, distinctive automotive framing*
Camera: Canon EOS R5 Mark II · Lens: Canon RF 85mm F1.2 L USM · 85mm · f/2.2 · 1/320s · ISO 640
> Re-photograph through the physical opening of a removed tyre, wheel or similar circular workshop object using a Canon EOS R5 Mark II and RF 85mm F1.2 L USM. Shoot at f/2.2, 1/320 s, ISO 640. Allow the near circular object to become a soft dark natural vignette while the mechanic or service operation beyond remains critically sharp. The framing must originate from real scene geometry.

### 200mm Hidden Observer — Long-Lens Candid Peek
*Best for: unposed interactions, natural concentration, customer/mechanic moments*
Camera: Sony α1 II · Lens: Sony FE 70–200mm F2.8 GM OSS II · 200mm · f/2.8 · 1/500s · ISO 800
> Move far from the subject and re-photograph with a Sony α1 II and FE 70–200mm F2.8 GM OSS II at 200mm. Shoot at f/2.8, 1/500 s, ISO 800. Allow a lift column, tyre stack, open bonnet or piece of machinery to occupy approximately 15–30% of the foreground as soft physical occlusion. Focus sharply on the actual interaction beyond. Make the scene feel genuinely observed rather than staged.

### 24mm Diagonal Depth Run — Leading-Line Action
*Best for: walking mechanics, cars entering, trolley movement, directional energy*
Camera: Nikon Z8 · Lens: NIKKOR Z 24mm f/1.8 S · 24mm · f/3.5 · 1/500s · ISO 800
> Re-photograph with a Nikon Z8 and NIKKOR Z 24mm f/1.8 S. Shoot at f/3.5, 1/500 s, ISO 800. Position the camera so a real physical structure — lift rail, workbench, car flank, floor seam, tyre row or cable — enters from a near corner and travels diagonally toward the subject. Place the primary action near the line's visual termination. Create directional momentum through perspective rather than relying on a Dutch tilt.

---

## Part 2 — Grade presets (end-text, applied after composition is chosen)

Use **Small** for factual/trust detail shots (parts, tools, anything the customer needs to believe is real). Use **Medium** as the baseline for people/mechanic-identity shots so they stay consistent site-wide. Use **Hard** for atmospheric backgrounds/heroes that sit under a dark overlay or badge — same treatment as the landing page hero.

### Small — restrained, mostly natural (10–15% brand push)
> Create or edit this as a premium photorealistic promotional photograph.
>
> If a SUBJECT image is provided, preserve its core composition, framing, angle, and scene truth unless explicitly changed. If CHARACTER references are provided, use them as identity authority. If ENVIRONMENTAL references are provided, use them only for locale, lighting, and ambiance. If GRADE/STYLESHEET/LUT references are provided, use them only as colour-grade authority.
>
> Upgrade the image to look like it was captured with top-tier full-frame professional camera equipment and premium optics. Maximize realism, material fidelity, believable lighting, lens realism, natural detail, dynamic range, and commercial polish. The result must feel like a real finished DSLR/mirrorless promotional shot, not CGI, not illustration, not overprocessed AI.
>
> Apply a restrained brand grade built on a neutral photographic base:
> - keep absolute blacks mostly neutral charcoal
> - add a subtle dark teal influence mainly in upper shadows and lower mids
> - keep midtones largely natural
> - add selective ember/amber warmth only in motivated highlights, practical lights, sunlight, metallic edges, and warm reflections
> - keep bright specular highlights mostly neutral
> - preserve natural object colours and believable skin tones
> - aim for 85–90% natural realism and only 10–15% brand harmonisation
>
> Avoid heavy teal-orange treatment, oversaturation, fake HDR, glow, crushed blacks, cyan shadows, waxy skin, fake blur, deformed hands, unrealistic reflections, and AI artifacts.
>
> The final image must feel authentic, trustworthy, premium, polished, and commercially usable.

### Medium — RAW-normalized + ~25–30% push toward brand teal/ember
> Create or edit this as a premium photorealistic promotional photograph.
>
> Preserve the source composition, subject, scene truth, and lighting environment unless explicitly changed. Do not automatically convert the scene to golden hour, sunset, or dramatic cinematic lighting.
>
> First normalize the image like a strong professional RAW correction:
> - improve exposure, white balance, dynamic range, tonal balance, highlight control, and shadow separation
> - preserve believable local colour, realistic materials, and natural lighting logic
>
> Then apply a restrained but clearly intentional commercial finish that stays true to the original prompt, but pushes approximately 25–30% further toward the visual language of the GUI's darker branded areas — especially the deep teal atmosphere and warm ember/yellow-ember accents. Use the dark teal and warm accent logic of the interface as inspiration for the image grade, but do not imitate the white/light UI sections as a colour target.
>
> Target balance:
> - about 88–92% natural photographic realism
> - about 8–12% restrained brand harmonisation
>
> Grade behaviour:
> - keep blacks mostly neutral charcoal
> - introduce a slightly stronger teal cohesion in upper shadows, lower mids, and darker structural areas
> - keep midtones mostly natural and believable
> - introduce slightly richer warm earthy ember accents in naturally motivated highlights
> - allow some highlights to move gently toward warm amber or yellow-ember when physically believable
> - keep specular whites mostly neutral
> - preserve neutral whites and realistic skin/material colour
> - avoid a heavy teal-orange blockbuster look
>
> Colour direction:
> - teal should come mainly from the darker branded GUI language, not from the pale/white sections
> - warmth should feel earthy, metallic, and premium rather than orange or artificial
> - think dark teal atmosphere with restrained ember-to-yellow-ember accent energy
> - the image should feel more visually aligned with the branded sections of the page without looking overgraded
>
> Maximize photorealism. If the source feels AI-generated or too perfect, make it feel more photographic by reducing synthetic smoothness, fake sharpness, artificial texture, and unrealistic reflections, while improving believable depth, edges, and material response.
>
> Introduce only extremely subtle real-camera characteristics where helpful:
> - tiny natural shadow noise or sensor texture
> - very slight optical softness away from the focal plane
> - realistic highlight rolloff
> - tiny lens-behaviour cues that make the image feel genuinely photographed
> - a very soft, elegant, barely perceptible vignette that gently supports subject focus without visible dark corners or an obvious effect
>
> Avoid: strong global recolouring, oversaturation, over-sharpening, fake HDR, exaggerated glow, cinematic over-stylization, obvious lens effects, artificial-looking contrast, muddy shadows, bright whites drifting teal or yellow, any look that feels processed instead of photographed.
>
> The final image must feel like a real, high-end, professionally shot commercial photograph with strong photorealism, subtle polish, believable optics, restrained finishing, a barely visible vignette, and a slightly stronger connection to the GUI's dark teal and warm ember brand language.

### Hard — full golden-hour push, richer ember/teal (12–18% brand push)
> Create or edit this as a premium photorealistic promotional photograph.
>
> Preserve the source composition, subject, core scene truth, and overall visual story unless explicitly changed. You may now intentionally push the image much further into a warm golden-hour / sunset-grade direction when it improves the shot, as long as the result still feels physically believable and professionally photographed.
>
> First normalize the image like a strong professional RAW correction:
> - improve exposure, white balance, dynamic range, tonal balance, highlight control, and shadow separation
> - preserve believable local colour, realistic materials, and natural image structure
> - clean up any synthetic or AI-like behaviour before the final grade
>
> Then apply a strong, premium commercial finish that represents the maximum-effect version of this look.
>
> This version should move much more decisively toward: golden-hour warmth, warm ember/amber/yellow-ember highlights, dark teal depth in shadows and lower mids, a cinematic but still believable premium promotional look.
>
> Target balance:
> - about 82–88% natural photographic realism
> - about 12–18% strong but controlled brand harmonisation
>
> Lighting and grade direction:
> - allow the image to shift into a believable golden-hour lighting character, sunset warmth, or warm end-of-day promotional atmosphere when appropriate
> - warm the key light, sunlight, reflections, and highlight energy significantly more than in the restrained versions
> - create richer ember and yellow-ember behaviour in highlights, reflective metal, glass, painted surfaces, and warm edge light
> - keep lower mids, upper shadows, and darker structural areas anchored with dark teal cohesion
> - let the image feel strongly connected to the GUI's darker branded sections: deep teal structure plus warm ember/yellow-ember accents
> - do not use the pale/white GUI areas as a colour target
>
> Grade behaviour:
> - keep blacks mostly neutral charcoal
> - push deeper teal into upper shadows, lower mids, and darker atmospheric zones
> - keep midtones believable, but allow them to lean slightly warmer or cooler depending on the lighting logic
> - allow highlights to move confidently toward ember, amber, and real yellow-ember when physically plausible
> - maintain clean specular highlight behaviour so bright whites do not become dirty or unnaturally tinted
> - preserve skin, metal, paint, rubber, and other materials so they still feel real
>
> Important: this should feel like a full premium LUT / finishing treatment and, where appropriate, a believable relighting toward golden hour — not just a tiny grade adjustment. However, it must still remain photorealistic and physically plausible.
>
> Maximize photorealism. If the source feels AI-generated or too perfect: reduce synthetic smoothness, reduce fake sharpness, reduce artificial texture, improve believable reflections, improve real-world depth behaviour, improve edges, surfaces, and optical realism, make the final image feel more like a real professional camera photograph than the source.
>
> Introduce subtle real-camera characteristics where helpful: tiny natural shadow noise or sensor texture, slight optical softness away from the focal plane, realistic highlight rolloff, subtle lens-behaviour cues that make the image feel genuinely photographed, a soft, elegant, barely perceptible vignette that gently supports subject focus without obvious dark corners.
>
> Mood target: premium, dramatic, trustworthy, cinematic in a commercial-photography sense, warm, polished, and visually striking, still believable and grounded in real light behaviour.
>
> Avoid: cartoonish colour, oversaturation, fake HDR, exaggerated glow, muddy shadows, crushed blacks, neon cyan shadows, artificial orange skin, obvious blockbuster teal-orange treatment, fake lens gimmicks, over-sharpening, any look that feels processed instead of photographed.
>
> The final image must feel like a real, high-end, professionally shot commercial photograph with strong photorealism, premium optics, a full golden-hour-inspired finishing treatment, richer ember-to-yellow-ember highlights, teal lower-mid/shadow cohesion, and a polished cinematic promotional look that still respects realism.

---

## Per-slot pairing log

Track which camera + grade combo was used per production image, so the site stays visually consistent and you're not re-deciding blind each time.

| Page | Slot | Camera preset | Grade | Status |
|---|---|---|---|---|
| Bromssystem | Hero (bromsarbete i verkstaden) | 35mm Environmental Commercial | Hard | Spec'd, not shot |
| Bromssystem | Intro (komponenter) | 105mm Precision Craft Macro | Small | Spec'd, not shot |
| Bromssystem | Symptoms (mekaniker under bil, diagnos) | 200mm Under-Car Telephoto | Medium | Spec'd, not shot |
