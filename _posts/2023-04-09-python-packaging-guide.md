---
title: Python - Packaging Guide
description: AKA making your code usable by others - both developers and end users.
image: assets/img/pythonlogo.webp
imagealt: Python logo.
---

## A Model Example

See my mock application - the [Auto League Closer™](https://github.com/Giantpizzahead/auto-league-closer) - for a real-world demo (with external libraries, data files, and application logs) of how to package, freeze, or make a windows installer for your Python project. This model application was also made to follow best practices for Python projects in general!

## Packaging Python Projects

Scenario: You want to package your code and upload it onto PyPi so end users can just `pip install` it.

How do you make your code into a package? See [this tutorial](https://docs.python.org/3/tutorial/modules.html).

1. Create a `pyproject.toml` file in the same directory as the module file or folder. Fill it with the following info - change default fields as needed and ensure the project name matches the module name:

```toml
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "my_amazing_package"
version = "0.0.1"
authors = [
  { name="Example Author", email="author@example.com" },
]
description = "A small example package"
readme = "README.md"
requires-python = ">=3.7"
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
    "Operating System :: OS Independent",
]

dependencies = [
  "numpy>=1.13.3",
]

[project.urls]
"Homepage" = "https://github.com/pypa/sampleproject"
"Documentation" = "https://package.readthedocs.io/"
```

2. Run the below commands to build your package:

```bash
$ pip install build
$ python -m build
```

3. Upload your package to PyPi:

```bash
pip install twine
python -m twine upload dist/*
```

[This official Python 3 tutorial](https://packaging.python.org/en/latest/tutorials/packaging-projects/) covers it all in a surprisingly simple way (use setuptools because everyone else is). [This article](https://scikit-hep.org/developer/pep621) covers how to include dependencies. I don't want to reinvent the wheel by explaining all the details, so take a look at that.

## Freezing Python Projects

Scenario: You want to package your entire Python program - external dependencies and all - into a single EXE file that others can run, *without* installing the program first (so it's a standalone executable).

Use [PyInstaller](https://pyinstaller.org/en/stable/). It's more mature and widely used/maintained than all the other options out there. See [this article](https://pyinstaller.org/en/stable/usage.html) for pretty much all the options you'll ever need for any project setups.

```bash
$ pip install pyinstaller

# Create one directory in the `dist` folder containing an executable
# Think of pyinstaller like this: When you run the generated EXE,
# it does whatever `python entry.py` would do, and nothing more.
$ pyinstaller entry.py --name "My Cool Program" --icon MY_APP_ICON.png

# Bundle the entire Python program into one standalone EXE
# Note that this EXE will take a long time to launch! (It extracts the folder on every run)
$ pyinstaller entry.py --onefile --name "My Cool Program" --icon MY_APP_ICON.png

# Fix PyInstaller if your program requires external data files
# Say you're running pyinstaller OUTSIDE of the module folder "my_module"
# and you need a bunch of images in a resource folder located at "my_module/data"
# while preserving any relative paths used by your Python code
$ pyinstaller entry.py --add-data "my_module/data;data" --name "My Cool Program" --icon MY_APP_ICON.png
```

There's a different way to collect data files that works without manually specifying all of them. It's really simple too, so if you have more than one data file/folder or the data folder has a long path, use this method! It's given in the 2nd half of [this article](https://pyinstaller.org/en/stable/runtime-information.html).

## Making a Windows App Installer

Scenario: You want to make an app like Discord or Google Chrome. Users need to install it first with a standalone installer, then they can run it however they want.

Use [Inno Setup](https://jrsoftware.org/isdl.php) on top of Pyinstaller.

1. Freeze the Python project (see above).
2. Install [Inno Setup](https://jrsoftware.org/isdl.php) (yes it's kinda meta, but install it like you would any other app). Launch it.
3. Use the Inno Setup Script Wizard to make an installation script. Select the EXE from PyInstaller, and the folder which contains that EXE as an additional required folder.
4. Save the script, compile it, and try out the generated installer!

Note: If you're trying to create files of some sort in your app (ex: for logging), [you'll need to move those](https://social.msdn.microsoft.com/Forums/en-US/8ab21321-b19a-4acc-a8db-5ebaae114332/write-to-program-filesapplicationname-without-administrator-privileges?forum=vbgeneral) into a different folder, separate from the application, for security reasons. This is what `AppData/Roaming` is for! (See [this article](https://learn.microsoft.com/en-us/archive/blogs/patricka/where-should-i-store-my-data-and-configuration-files-if-i-target-multiple-os-versions))

As an extension to the above, you can make your program behave differently in source and bundled locations using PyInstaller's generated run-time information:

```python
import sys
if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    print('running in a PyInstaller bundle')
else:
    print('running in a normal Python process')
```

See [their tutorial article](https://pyinstaller.org/en/stable/runtime-information.html) for details.

[Source](https://stackoverflow.com/questions/9960583/how-do-you-make-an-installer-for-your-python-program)
