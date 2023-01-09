---
title: Git - Common Operations
description: Cheatsheet for various git operations.
image: assets/img/githublogo.png
---

### Only Delete from Git
To remove a file or directory from Git without deleting it locally ([source](https://stackoverflow.com/a/1143800)):
```bash
git rm --cached -r directory_to_remove
```
