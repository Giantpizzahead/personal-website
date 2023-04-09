---
title: 'Computer Automation: Part 2'
description: Comparing various GUI automation methods - without reinventing the wheel.
image: assets/img/computerautomation.jpeg
imagealt: Robot using a computer.
---

## Accessibility: A New Perspective?

According to the American Foundation for the Blind, nearly 27 million adult Americans (~10%) are blind. So, society has done [amazing things](%28https://www.afb.org/blindness-and-low-vision/using-technology/using-computer%29) to ensure these people can still use a computer! A similar idea applies to [those who are deaf](https://abilitynet.org.uk/factsheets/hearing-loss-and-computing).

Now, here's the key insight. A computer program can control the mouse and keyboard, but current state-of-the-art methods have a hard time interpreting audio and video inputs. One way to think about this is that **computers are partially blind** - although they can "see" perfectly, they can't interpret it easily, so assume that it can't see at all. Then a whole suite of tools designed for visually impaired computer usage becomes available!

Let's start with this: [For the Experienced Computer User with a New Visual Impairment (afb.org)](https://www.afb.org/blindness-and-low-vision/using-technology/using-computer/part-ii-experienced-computer-user-new).

### Windows GUI Automation: pywinauto

Microsoft also provides an API for screen readers and other accessibility devices to use: [UI Automation Overview - .NET Framework \| Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/framework/ui-automation/ui-automation-overview).

#### Initial Attempt

But I tried using the [py_inspect.py](https://github.com/pywinauto/py_inspect) tool from [pywinauto](https://github.com/pywinauto/pywinauto) - which is meant to determine whether certain GUI elements are visible in both UI Automation and an older Microsoft API for the same purpose - but it didn't find anything. It's probably because Discord's desktop app is actually just a browser in the backend.

Since Discord is considered a relatively simple modern web app to "automate" (relative to something like League), I doubt this UI Automation would work for most purposes. So rip Windows-specific UI Automation I guess :(

#### Wait...

So I tried using [Inspect.exe](https://github.com/blackrosezy/gui-inspect-tool/blob/master/Inspect.exe) on Discord and it gave me this...

![Discord popup when using a screen reader](https://i.gyazo.com/c3174f1f15cb56fcde38820c44378df1.png)

I clicked on a couple of the buttons and got this huge thing:

![Info given when hovering over a Discord button](https://i.gyazo.com/29229928e2be9a66ccffe6606504b11d.png)

And yes, I just got [Gyazo](https://gyazo.com/) and am realizing how powerful it is. ;)

So we *could* probably use UIA or other types to do this, but it wouldn't generalize to other apps like League, so I'll stick with image recognition UI automation.

## [SikuliX](https://sikulix.github.io/) and [Lackey](https://github.com/glitchassassin/lackey)

"Don't reinvent the wheel" is my motivation for trying to find new ways to do this whole UI automation thing (I'm also kinda lazy xd). This has gotta be something that tons of people need to do, right?

Well, I found a pair of automation libraries that allow you to write scripts to automate graphical tasks. Or really, SikuliX, Lackey is just a port (ish) of that over to Python. Let's see if it works - and if it's easy enough to use.

Here's a [tutorial](https://www.swtestacademy.com/quick-start-to-sikulix/) for the SikuliX IDE (the exact type of script writing tool I was looking for!).

![Sample SikuliX script](https://i.gyazo.com/5d2ace585c3e38eefd65aefbb3990e7d.png)

![SikuliX script automatically opening League of Legends](https://i.gyazo.com/637a4807c8b3f8a925636bb952b2d89b.gif)

*Oh my god.* This is literally exactly what I was looking for. Look at it go... it even saves the script in a nice little folder, for use with other apps... Love at first sight <3

![The auto-generated folder containing the script](https://i.gyazo.com/095df59231a6321bcc5f33df984eae9a.png)

Well then. Now we just need to see if I can port it to Python...

I looked around for a better option, but it looks like [Lackey](https://github.com/glitchassassin/lackey) is the way to go - even though it hasn't been maintained for 3 years now. Welp, I guess I'll fork it and make it not deprecated.
