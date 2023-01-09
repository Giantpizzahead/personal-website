---
title: Python - Coding Guide
description: How to write pythonic code
image: assets/img/pythonlogo.webp
---

## Cheatsheet

[Python Cheatsheet](https://www.pythoncheatsheet.org/cheatsheet/basics)

{% alert tip %}
Use the left sidebar to choose a topic.
{% endalert %}

### Documentation

[Official Python Docs](https://docs.python.org/3/library/index.html)

## Style

Read [https://docs.python-guide.org/writing/style/](https://docs.python-guide.org/writing/style/), it's a great summary of Python code style! The below is a (very) short summary of what my main takeaways were.

### General Reminders

Be Pythonic whenever possible: Use commonly accepted patterns when they come up.

When separating a long line of code into multiple lines, use parentheses instead of backslashes.

```python
# Bad
a_string = "This is a very long string that should probably span \
    multiple lines. As a result, it does actually span multiple lines. \
    Wow, that's pretty cool, isn't it?"

# Good
a_string = (
    "This is a very long string that should probably span"
    "multiple lines. As a result, it does actually span multiple lines."
    "Wow, that's pretty cool, isn't it?"
)
```

### Type Hints

Type hints are great, use them! You can put them in gradually: The `Any` type is implicitly assumed for any functions without type hints. Type hints are generally overkill for uncommonly used scripts.

See [https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html) for a cheat sheet on type hints.

### PEP 8

[PEP 8](https://pep8.org/) is a widely used Python style guide. There are automatic checkers and formatters for PEP 8.

{% alert tip %}
Most IDEs have PEP 8 checking and formatting built in!
{% endalert %}

#### Auto-Checking

Using [pycodestyle](https://github.com/PyCQA/pycodestyle):

```bash
$ pip install pycodestyle
$ pycodestyle mymodule.py
mymodule.py:15:1: E303 too many blank lines (4)
mymodule.py:19:9: E701 multiple statements on one line (colon)
mymodule.py:26:8: W292 no newline at end of file
...
```

#### Auto-Formatting

Using [black](https://github.com/psf/black):

```bash
$ pip install black
$ black mymodule.py
```

### Zen of Python

A short list of guiding principles for Python's design.

```text
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

See some examples of good and bad code for each of these principles here: [PEP 20 by Example](https://github.com/hblanks/zen-of-python-by-example/blob/master/pep20_by_example.py)

## Documentation

Use Sphinx to generate documentation. The Napoleon plugin can parse Google docstrings.

[Google's documentation format](https://google.github.io/styleguide/pyguide.html#38-comments-and-docstrings) is quite nice: I'd recommend using it, see their style guide for more details on the format.

## Writing Tests

Remember, keep the tests short, fast, and simple... but don't forget about edge cases!

Use [doctests](https://realpython.com/python-doctest/) for simple tests that show basic usage of functions when needed. Use [Pytest](https://docs.pytest.org/en/7.2.x/getting-started.html) for the main test suite.

[Hypothesis](https://hypothesis.readthedocs.io/en/latest/quickstart.html) can help you automatically generate test cases and "check your work" in a different way. Useful when you need to be 100% sure your code works, or if it's hard to manually test.

## Logging

See [https://docs.python-guide.org/writing/logging/](https://docs.python-guide.org/writing/logging/).

## Reading Great Code

One of the best ways to learn how to write great code is to read and understand great code written by other Python devs!

See [https://docs.python-guide.org/writing/reading/](https://docs.python-guide.org/writing/reading/) for more info.

## Sources

- [https://docs.python-guide.org/writing/style/](https://docs.python-guide.org/writing/style/)
- [https://docs.python-guide.org/writing/reading/](https://docs.python-guide.org/writing/reading/)
- [https://docs.python-guide.org/writing/tests/](https://docs.python-guide.org/writing/tests/)
