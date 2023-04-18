---
title: 'Computer Automation: Part 1'
description: A series of blog posts detailing my computer automation journey in Python.
image: assets/img/computerautomation.jpeg
imagealt: A physical robot trying to use a laptop.
---

## What is Computer Automation?

I'm defining computer automation as anything that involves writing new computer code to **automatically do things in existing computer programs**. Specifically, this could mean many things, such as:

 - Scheduling a computer shutdown (ex: turn off after 2 hours)
 - Creating a new text file on the Desktop using pure code
 - Opening Notepad, typing some text, then saving the file
 - Using text-to-speech to read out the contents of a Word document
 - Opening Discord's desktop app and reading/responding to unread DMs
 - Searching for the latest fashion trends on Google
 - Completing a basic math course on Khan Academy's website
 - Playing a Coop vs. AI game as mid in League of LegendsJu
 - Streaming yourself playing League in a Discord voice call
 - **Being a "smart chatbot" by doing things that humans do**
	 - Read messages or hear chatter, then react by doing the appropriate things, like replying, searching on Google, opening League and inviting someone else to the party, streaming in Discord, etc.

As you can see, this definition is super broad - the things listed above are ordered from trivial to practically impossible (or is it?). In fact, it can be argued that a lot of existing computer programs do "computer automation" tasks:

 - Mail apps pool all your accounts into one area so you don't have to check each individual one
 - Antivirus apps check all your files for viruses so you don't have to do it manually
 - Window's search feature (on the taskbar) pools a bunch of info into one area, saving you time

And well... I've also done a lot of it in the past. With mixed results. That's what Part 1 of this series of blog posts will cover. In future parts, I'll log my progress on computer automation, hopefully sharing a bunch of cool applications along the way.

Enough introductions. Let's get going!

## Past Attempts

Ok, so I may have gotten lazy and just realized that this part of the post doesn't really contribute anything. So I'll just link my past projects here without explanation, and skip to the good stuff (Part 2 and above).

### AlphaLoL

This is probably my most comprehensive automation attempt so far. It's a bot that can play League of Legends automatically at a... semi-passable level. It can beat Intro bots easily. It can also 1v1 *most* Beginner bots, minus ones that are skillshot-heavy.

It's coded using computer vision techniques with OpenCV and OCR, along with some manual AI logic. I'm looking to expand this further so that more of the code uses deep learning :o

[https://github.com/Giantpizzahead/AlphaLoL](https://github.com/Giantpizzahead/AlphaLoL)

### Auto League Closer

A mock program that automatically closes League by forcibly moving your mouse whenever it's running.

[https://github.com/Giantpizzahead/auto-league-closer](https://github.com/Giantpizzahead/auto-league-closer)

### JudgeLite

Automatically compiles and judges code to see if it passes a bunch of test cases. Made for competitive programming (think USACO or ICPC).

[https://github.com/Giantpizzahead/judgelite](https://github.com/Giantpizzahead/judgelite)

### Lofi Girl

Basically a private Discord bot that serves as a music player (since Discord/YouTube tried to remove all the music bots for their own Activity thing). Wasn't much work though, I just used a pre-coded bot online (something like [this](https://github.com/jagrosh/MusicBot), but not that exact one).

### Various Scripts/Macros

You know, the typical "home automation" type stuff, but for computers. Things like turning on/off the computer at set times, opening a reminder window every week at 9 AM, etc.
