---
title: AlphaLol 2.0 Planning
description: Making a bot that can play League... better... again.
image: assets/img/alphalol.jpeg
imagealt: League of Legends gameplay.
---

Yes, we're doing this again. Yes, it's going to actually use deep learning this time.

And yes, we're probably going to stop at some point. And then try again, again. :)

## Problem Statement

**Make a bot that can play League of Legends at an acceptable skill level.** We'll define an "acceptable skill level" to mean beating Intermediate bots consistently in a mid 1v1 while playing as a specific champion, against a predefined list of ~5 champions.

In order to do this, the bot must understand the current game state, work as a team with ally players by performing its specific role correctly, predict enemy actions and play around these, make macro decisions with at most a few seconds delay, and make micro decisions in real time.

## Failing Fast

Following the brilliant concept of focusing on the **hardest part first** instead of the parts that seem doable... let's focus on vision. Here's our new problem:

In League of Legends, there's a ton of visual data that needs to be processed and understood by the player. A lot of this is hard for computers to detect automatically: think skillshot shapes and directions. Not just that, but things like emotes, changing background screens due to OP ults (Nocturne, Mordekaiser), even autos from champs, minions, towers, jungle camps...! There's not even a good way to store skillshot data in a programmed state. Plus, for a computer to fully understand skillshots and how to interpret them, it would need to know what the skillshots do in the first place, which would mean interpreting the skill descriptions and/or previews on the internet. And just to be complete, some ults only have audio indicators (Sion ult)... yeah.

All the above means that any method of processing data likely would need to have **some type of raw pixels as input** (possibly after some image/video manipulation, but preserving all things that a human would see), and we'd need to just tell the computer to "understand" what it's seeing. (It's probably need to have **audio input** too!) The only way to check if it really knows what it's seeing would be to **quiz it on basic facts**, like:

- Annie is visible on the minimap, where is she?
- Twitch is missing, where do you think he is based on context?
- If you autoed the cannon right now, would you get the last hit?
- Is Ahri throwing a skillshot at you? If so, what is it, and what is its hitbox?

And the hardest thing of all... these questions need to be answerable **in real time**. Recognizing and dodging skillshots isn't something we can ask any online GPT bot how to do in the background. (If it gets to that point, we could use GPT bots to make macro decisions.)

So, the hardest part of AlphaLoL: We must feed it raw video and audio data - there's no other way. We also cannot program an explicit game state into it, because there's just too much to capture. AlphaLoL can observe other people's gameplay, mess around on its own, and gain external feedback through quizzes. With only this knowledge, AlphaLoL needs to be able to truly understand the game - develop game sense - then put that knowledge to use through micro (which is also hard to do in code!).

What does all this imply? Well, AlphaLoL should be **one big model**, rather than several individual models trying to handle specific tasks. And our current models and processing power might not be enough. But we won't know until we try...

## Our Data

We have access to tons of **expert recordings** via sites like YouTube and Twitch - basically people who are really good at League, playing League. However, we do *not* have access to their actions - the buttons they pressed, how they moved the mouse, etc. These videos are also not labeled - we don't have bounding boxes next to skillshots, or descriptions of what is happening in the video.

We also have the ability to create **amateur demonstrations** on our local machine by playing League while running an external recorder of some sort. We can (probably) record actions associated with these video demonstrations, and we could manually label important things. However, **our time is limited** - we can only make at most a few of these video demos.

There are **tons of online guides** explaining how to play League. These range from simple things like articles / videos showcasing champion abilities, to full-on guides about macro and micro tips at all levels of play.

Finally, we have access to the **real time environment and rewards**, where we can send an AI agent "into the wild" to gain experience actually playing League. However, we cannot speed the game up in any way - this type of experience can only be gathered in real time. In addition, the only feedback would come from obvious signs in the game, such as additional gold earned or getting gray screened (dying).

We're intentionally trying to make what we can using the current state-of-the-art methods in deep learning. With that being said, **think outside the box!** How could we use a combination of this available data - and limited compute resources - to make a decent League bot? 

## Research

[Imitation from Observation: Learning to Imitate Behaviors from Raw Video via Context Translation](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2018/EECS-2018-37.pdf)

[Reinforcement Learning with Augmented Data](https://mishalaskin.github.io/rad/)

Basically, doing things like distorting or rotating your training data can force AI models to learn patterns that actually matter in the game, instead of learning something that could be training specific or is less generalizable.

[One-Shot Visual Imitation Learning via Meta-Learning](http://proceedings.mlr.press/v78/finn17a/finn17a.pdf)

- This paper discusses a meta-learning strategy (learning the general process of solving tasks instead of learning how to solve a specific task). It requires labeled expert actions (basically the exact game state) and two video demonstrations of a task during training time. Then, only one video demonstration of a task, without labeled expert actions, is required at test time.
