---
title: Development Reference
group: Internal (Specific to this site)
order: 1
---

## Todo

Distributing code for end users: [https://github.com/pyinstaller/pyinstaller](https://github.com/pyinstaller/pyinstaller)
Or create a Python package for developers, hosted on PyPi: [https://packaging.python.org/en/latest/](https://packaging.python.org/en/latest/)

Web apps guide [https://12factor.net/](https://12factor.net/)

Picture tag: [https://rbuchberger.github.io/jekyll_picture_tag/users/installation](https://rbuchberger.github.io/jekyll_picture_tag/users/installation)

Passive income: [https://www.bankrate.com/investing/passive-income-ideas/](https://www.bankrate.com/investing/passive-income-ideas/)

Useful cheatsheet websites:
[https://devhints.io/](https://devhints.io/)
[https://quickref.me](https://quickref.me)

## Common Tasks

### Live Website Preview

```bash
$ bundle exec jekyll serve --livereload
```

Starts a local web server that auto-reloads on each change.

{% alert warning %}
If `_config.yml` or a `.rb` file is edited, you must manually reload to apply the changes.
{% endalert %}

## Element Reference

### Code Blocks

{% highlight markdown %}
{% raw %}
```python
print("Hello Markdown!")
```
{% endraw %}
{% endhighlight %}

If you want line numbers:
{% highlight liquid %}
{% raw %}
{% highlight python linenos %}
a = 1
b = 2
print(a + b)
{% endhighlight %}
{% endraw %}
{% endhighlight %}

Outputs:
```python
print("Hello Markdown!")
```
{% highlight python linenos %}
a = 1
b = 2
print(a + b)
{% endhighlight %}

Replace `python` with your language name.

{% alert note %}{% raw %}
`{% highlight python %}` without `linenos` is equivalent to Markdown's triple backtick syntax.
{% endraw %}{% endalert %}

### Alerts

{% highlight markdown %}
{% raw %}
{% alert review %}
Sample `review` alert

With *multiple* **lines** and formatting!
{% endalert %}
{% endraw %}
{% endhighlight %}

Output:
{% alert review %}
Sample `review` alert

With *multiple* **lines** and formatting!
{% endalert %}

#### Alert Types

Valid types (examples shown below): `note, warning, danger, review, tip, important`

{% alert note %}This is a `note` alert.{% endalert %}
{% alert warning %}This is a `warning` alert.{% endalert %}
{% alert danger %}This is a `danger` alert.{% endalert %}
{% alert review %}This is a `review` alert.{% endalert %}
{% alert tip %}This is a `tip` alert.{% endalert %}
{% alert important %}This is an `important` alert.{% endalert %}
{% alert %}This is a blank alert (no type supplied).{% endalert %}

Uses a simple custom plugin in `_plugins/alert.rb`.

### Icons

List of Font Awesome v4 icons: [https://fontawesome.com/v4/icons/](https://fontawesome.com/v4/icons/)

### Emotes

List of Github Emojis: [https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md)