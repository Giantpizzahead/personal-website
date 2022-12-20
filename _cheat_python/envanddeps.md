---
title: Environment Management
group: Project Management
order: 2
---

## Virtual Environments

These let you install Python modules in a local directory instead of system-wide. Use them!

Reasons:
- Keep your system files clean
- Keep projects from conflicting with each other
- More consistent across developer setups

### Create

```bash
$ python3 -m venv ./venv
```

### Activate

Mac and Linux:
```bash
$ source venv/bin/activate
```

Windows:
```bash
$ venv/Scripts/activate.bat  # Terminal
$ venv/Scripts/Activate.ps1  # Powershell
```

Your terminal prompt should now have `(venv)` at the start. Now `pip` modules will install locally!

### Deactivate

```bash
$ deactivate
```

### Requirements

The best way to track dependencies is to manually create a `requirements.txt` file, then add all packages you install into that file first before installing them. It's also a good idea to use the `~=` "compatible release" version specifier.

Quick and dirty way:
```bash
# Dump current requirements into a file
$ pip freeze > requirements.txt

# Install requirements from file
$ pip install -r requirements.txt
```

{% alert tip %}
Most IDEs - like PyCharm - can [automatically](https://www.jetbrains.com/help/pycharm/managing-dependencies.html) use virtual environments and generate the `requirements.txt` file.
{% endalert %}

The requirements file provides an easy way to keep a list of module dependencies, and allow different developers to configure the same environment.

## Sources

- [https://docs.python-guide.org/dev/virtualenvs/](https://docs.python-guide.org/dev/virtualenvs/)
- [https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/](https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/)