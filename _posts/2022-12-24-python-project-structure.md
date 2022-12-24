---
title: Python - Project Structure
description: How should a large Python project be structured?
image: assets/img/pythonlogo.webp
---

## Directory Structure

Basic project structure, as suggested by [Kenneth Reitz's Github repo](https://github.com/navdeep-G/samplemod):

```text
README.rst
LICENSE
setup.py
requirements.txt
sample/__init__.py
sample/core.py
sample/helpers.py
docs/conf.py
docs/index.rst
tests/test_basic.py
tests/test_advanced.py
```

{% alert tip %}
Don't know which license to use? Try [choosealicense.com](https://choosealicense.com/)!
{% endalert %}

### Making Tests Work

Copied from [https://docs.python-guide.org/writing/structure/](https://docs.python-guide.org/writing/structure/)

To give individual tests import context (so they can access your module), create a tests/context.py file:

```python
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import mymodule
```

Then, within the individual test modules, import the module like so:

```python
from .context import mymodule
```

This will always work as expected, regardless of installation method.

### Larger Projects

Copied from [https://realpython.com/python-application-layouts/](https://realpython.com/python-application-layouts/)

A larger project structure with submodules and data files might look something like:

```text
helloworld/
│
├── bin/
│
├── docs/
│   ├── hello.md
│   └── world.md
│
├── helloworld/
│   ├── __init__.py
│   ├── runner.py
│   ├── hello/
│   │   ├── __init__.py
│   │   ├── hello.py
│   │   └── helpers.py
│   │
│   └── world/
│       ├── __init__.py
│       ├── helpers.py
│       └── world.py
│
├── data/
│   ├── input.csv
│   └── output.xlsx
│
├── tests/
│   ├── hello
│   │   ├── helpers_tests.py
│   │   └── hello_tests.py
│   │
│   └── world/
│       ├── helpers_tests.py
│       └── world_tests.py
│
├── .gitignore
├── LICENSE
└── README.md
```

## Sources

- [https://docs.python-guide.org/writing/structure/](https://docs.python-guide.org/writing/structure/)
- [https://realpython.com/python-application-layouts/](https://realpython.com/python-application-layouts/)
