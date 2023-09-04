---
title: Fundamentals of Programming (6.1010)
---

This is a very rough summary of what we learned in 6.1010: Fundamentals of Programming, which was taught in Python. Note that most of the learning came from **coding practice in labs**, the below is just a summary.

## Data Structures

```py
e, i, k, default, iter, iter1, iter2, iter3 = None
seq_x, seq_y, cond_x, cond_y, func, Shape, point_in_rect = None
s, a, b = None

# Strings
S = ""
S.upper()           # Also S.lower()
S.strip().split(",")
one = "ook".replace("ok", "ne")
S.index(s, a, b)    # First index of s in S[a:b], or error

# Lists (also tuples, which are immutable)
L, L2 = [1, 2, 3]
L.append(e)
L.insert(i, e)      # Insert e before i (0 -> Start of array)
L.extend(L2)        # Also L + L2
L.pop(i)            # Returns L[i], i is optional (0 by default)
L.remove(e)         # Find and remove first occurence of value
L.index(e, a, b)    # First index of e in L[a:b], or error
out = []                       # [ func(x, y)
for x in seq_x:                #    for x in seq_x
 if cond_x:                    #     if cond_x
  for y in seq_y:              #      for y in seq_y
   if cond_y:                  #       if cond_y ]
    out.append(func(x, y))     # List comprehensions

# Sets
S, S2 = set(), frozenset()
S.add(e)
S.discard(e)        # Or S.remove(e) which raises KeyError on fail
S.union(S2)         # S | S2, e present in at least one set
S.intersection(S2)  # S & S2, e present in both sets
S.difference(S2)    # S - S2, e present in S but not in S2

# Dictionaries
D = {}
D.setdefault(k, default)
D.get(k, default)
D.pop(k)            # del D[k]
D.items()           # D.keys(), D.values(), returns generator
D = {k: v for k, v in iter if k != v}

# Iterables and generators
def my_range(start, end):  # Generator
    if start >= end: return
    yield start
    yield from my_range(start+1, end)
for e in reversed(iter): print(e)
for i, e in enumerate(iter): print(i, e)
for a, b, c in zip(iter1, iter2, iter3): print(a, b, c)
```

## Common Patterns

```py
# List comprehensions
def poly_evaluate(p, x):
	return sum([coeff * x**i for i,coeff in enumerate(p)])

# Recursion
def sum_nested(x):
    """
    >>> sum_nested([[1, 2], [3, [4, 5]], [[[[[6]]]]]])
    21
    """
    if not x: return 0
    elif isinstance(x[0], list):
        return sum_nested(x[0]) + sum_nested(x[1:])
    else:
        return x[0] + sum_nested(x[1:])

# Decorators
def memoize(func):
    cache = {}
    def _mfunc(*args):
        if args not in cache: cache[args] = func(*args)
        return cache[args]
    return _mfunc
@memoize
def fib(n):
    return n if n < 2 else fib(n-2) + fib(n-1)

# OOP
class Rectangle(Shape):
    def __init__(self, lower_left, width, height):
        Shape.__init__(self)
        self.ll = lower_left
        self.w = width
        self.h = height
    @property
    def center(self):
        return (self.ll[0]+self.w//2, self.ll[1]+self.h//2)
    @center.setter
    def center(self, v):
        self.ll = (v[0]-self.w//2, v[1]-self.h//2)
    def __contains__(self, p):
        return point_in_rect(self, p)

# Misc
a, b = b, a         # Swap
x = 1
def outer():
    global x        # Cannot modify x without this
    x += 1
    y = x
    def inner():
        nonlocal y  # Cannot modify y without this
        y += 1
    inner()

def bfs(neighbors_function, start, goal_test):
    # start is the initial state, goal_test returns boolean
    if goal_test(start):
        return (start, )
    agenda = [(start, )]
    visited = {start}
    while agenda:
        this_path = agenda.pop(0)
        terminal_state = this_path[-1]
        # neighbors_function returns iterable with neighbors
        for neighbor in neighbors_function(terminal_state):
            if neighbor not in visited:
                new_path = this_path + (neighbor,)
                if goal_test(neighbor):
                    return new_path
                agenda.append(new_path)
                visited.add(neighbor)
```

## Python's Internal Model

A simplified model of how Python works internally. The main idea is that every variable name points to something, and all new code does is create and/or change these names and pointers. See below for 3 examples:

[![Image from Gyazo](https://i.gyazo.com/f7be7594ebb36a2e99211115e6c2f450.png)](https://gyazo.com/f7be7594ebb36a2e99211115e6c2f450)

## Cheatsheets

For personal reference only.
- [Part 1](https://docs.google.com/document/d/1HzYN3UzdPPbdL-F0ogLa_y77IBWGM0_wxzgYy5y9Icw/edit?usp=sharing)
- [Part 2](https://docs.google.com/document/d/15rYrIl9I3O9qCrXteR3BHWTynDD1bOESWb52T3qV3b8/edit?usp=sharing)
