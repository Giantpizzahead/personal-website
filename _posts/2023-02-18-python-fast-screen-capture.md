---
title: Python - Fast Screen Capture
description: What's the best (most efficient) Python screenshot module?
image: assets/img/camera.jpeg
---

## Code
The below methods were called a variable number of times in each run (30-360 frames). Multiple runs were used to find the average speed of each method. For more detail on the benchmarking process, see this [Github link](https://github.com/Giantpizzahead/natural-learning/tree/main/screenshot-speed).
```python
""" =============================== Pillow  =============================== """
from PIL import ImageGrab
def get_screenshot():
    return ImageGrab.grab(bbox=BBOX)


""" ===============================   MSS   =============================== """
import mss
import numpy as np
sct = mss.mss()
def get_screenshot():
    return np.asarray(sct.grab(sct.monitors[0] if not BBOX else BBOX))


""" ===============================  DXcam  =============================== """
import dxcam
camera = dxcam.create()
# Video mode was turned to False for the UFO 60FPS test to test
# DXcam's raw video capture speed, without cache optimizations.
camera.start(target_fps=0, video_mode=True, region=BBOX)
def get_screenshot():
    return camera.get_latest_frame()


""" =============================== np.sum  =============================== """
import numpy as np
screenshot = np.asarray("Taken using MSS, not counted in time taken")
def get_screenshot():
    # Simulating iteration over all pixels
    total = screenshot.sum()
    print("Sum of pixel values:", total)
    return screenshot
```

## Windows

{% alert tip %}
TLDR; Use [DXcam](https://github.com/ra1nty/DXcam). Expect ~100 FPS for mid tier PCs.
{% endalert %}

DXcam grabs the raw screen faster, and has optimizations if the image doesn't always change. [MSS](https://github.com/BoboTiG/python-mss) is fine for cross-platform and ease of use, but will be about 3 times slower on Windows.

### Results

FPS is displayed as mean ± σ. Results on a mid tier 1920x1200 Windows laptop:

| Test Type    | Pillow         | MSS            | DXcam             | np.sum(screen) |
| ------------ | -------------- | -------------- | ----------------- | -------------- |
| Static       | 27 ± 0.5       | 29 ± 0.1       | **170 ± 3.4\***   | ~650           |
| Dynamic      | 22 ± 1.4       | 28 ± 0.7       | **96 ± 9.2\***    | ~650           |
| UFO 60FPS    | ~19            | ~25            | **~60**           | ~650           |
| Small Region | 27 ± 0.7       | 57 ± 0.3       | **387 ± 11.4\***  | ~5000          |

np.sum(screen) serves as a baseline. It measures how many times Numpy can iterate through the whole image in one second.

\*See details.

### Details

DXcam has a lot of optimizations, including only processing / outputting new frames when something's changed (along with a "video mode" that kind of? controls this feature). This makes it hard to compare with the others objectively. But overall, DXcam is much faster than both of the other options, both in terms of capturing the raw screen and real usage. So just use it on Windows.

Use MSS on Mac and Linux (maybe Windows to trade ease of use with a noticeable speed decrease) if you need cross compatability.

The above FPS values aren't 100% accurate, due to minor testing issues / oversights. The overall trend is definitely right though.

## Mac
{% alert tip %}
TLDR; Use [MSS](https://github.com/BoboTiG/python-mss). ~50 FPS on a MacBook Air (M1, 2020).
{% endalert %}

MSS is 15-20 times faster than Pillow, and I couldn't find any better options. It can also be sped up by grabbing specific screen regions.

### Results

FPS is displayed as mean ± σ. Results on an MacBook Air (M1, 2020):

| Test Type    | Pillow         | MSS            | np.sum(screen) |
| ------------ | -------------- | -------------- | -------------- |
| Dynamic      | 2.8 ± 0.0      | **47 ± 1.2**   | 260 ± 7.0      |
| Small Region | 2.6 ± 0.1      | **61 ± 1.1**   | 639 ± 47       |

np.sum(screen) serves as a baseline. It measures how many times Numpy can iterate through the whole image in one second.

Both static and dynamic screens were tested, but the results were very similar (neither library optimizes for still images), so I only included the dynamic results.

### Details

So, Mac has a Retina display, which means the displayed resolution is doubled from
the *virtual* resolution. That is, for all intents and purposes, treat a 2800 x 1800
Mac screen as 1400 x 900. (The retina part is ONLY for making the display look better.)

Virtual = Normal resolution, Retina = Double resolution
Both screenshot libraries use virtual resolution to specify the desired region to grab.
Then they used different methods to handle the retina resolution:

Pillow - If no region is specified, Pillow uses (0, 0, retina width, retina height).
First, Pillow uses screencapture (Mac commandline tool) to grab the *virtual resolution* region
of the screen, returning that region in *retina resolution*. Then, Pillow resizes that image into
the specified region size, and returns it. All in all, you specify a virtual res size, and Pillow
returns an image of that virtual res size. But if you don't specify a region, a retina res version
of the screen is returned.

MSS - If no region is specified, MSS uses (0, 0, virtual width, virtual height).
Luckily, MSS is straightforward. Query a virtual res region, and the returned image will be retina res.

Basically, just use MSS. I'm noting down the technical details here for completeness's sake.

## Linux

I'm going to generalize Mac results to Linux, since a brief search yielded no methods that were advertised as "fast". Suggesting that [MSS](https://github.com/BoboTiG/python-mss) is likely still the best choice.

## Remarks

This article was written in February 2023. There could be better tools out there now. And I'm pretty sure the Linux generalization is probably wrong. If there are any new tools (or ones I missed), I'd love to hear about it!
