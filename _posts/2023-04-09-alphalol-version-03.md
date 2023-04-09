---
title: AlphaLol Version 0.3
description: Making a bot that can play League... better... again.
image: assets/img/alphalol.jpeg
imagealt: League of Legends gameplay.
---

Yes, we're doing this again. Yes, it's going to actually use deep learning this time.

And yes, we're probably going to stop at some point. And then try again, again. :)

## Problem Statement

**Make a bot that can play League of Legends at an acceptable skill level.** We'll define an "acceptable skill level" to mean beating Intermediate bots consistently in a mid 1v1 while playing as a specific champion, against a predefined list of ~5 champions.

In order to do this, the bot must understand the current game state, work as a team with ally players by performing its specific role correctly, predict enemy actions and play around these, make macro decisions with at most a few seconds delay, and make micro decisions in real time.

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
