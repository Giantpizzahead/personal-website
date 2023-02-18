---
title: Python - Profiling and Benchmarking
description: Practical profiling and benchmarking.
image: assets/img/pythonlogo.webp
---

## Benchmarking
Benchmarking treats the code as a "black box", only caring about the overall time the code takes to run.

[Hyperfine](https://github.com/sharkdp/hyperfine) is a great (and pretty!) CLI tool to do benchmarking for all commands - not just Python!

Remember, time measurements can only be used to compare *relative performance* of code! Absolute performance depends on many external factors (like CPU and GPU speed).

### Example Usage

Consider two Python files with code as shown below:
```python
# fibslow.py
def fib(n):
    return fib(n-1) + fib(n-2) if n > 2 else 1
print(fib(30))

# fibfast.py
def fib(n):
    a = b = 1
    for _ in range(n-2):
        a, b = b, a + b
    return b
print(fib(30))
```

Running Hyperfine on these two files gives:
```shell
$ hyperfine "python fibslow.py" "python fibfast.py"   
Benchmark 1: python fibslow.py
  Time (mean ± σ):     144.2 ms ±   8.4 ms    [User: 117.0 ms, System: 18.7 ms]
  Range (min … max):   138.3 ms … 172.1 ms    16 runs

  Warning: The first benchmarking run for this command was significantly slower than the rest
	(172.1 ms). This could be caused by (filesystem) caches that were not filled until after the
	first run. You should consider using the '--warmup' option to fill those caches before the
	actual benchmark. Alternatively, use the '--prepare' option to clear the caches before each
	timing run.

Benchmark 2: python fibfast.py
  Time (mean ± σ):      38.8 ms ±   2.4 ms    [User: 14.8 ms, System: 18.1 ms]
  Range (min … max):    36.2 ms …  53.5 ms    57 runs

  Warning: Statistical outliers were detected. Consider re-running this benchmark on a quiet PC
	without any interferences from other programs. It might help to use the '--warmup' or
	'--prepare' options.

Summary
  'python fibfast.py' ran
    3.72 ± 0.32 times faster than 'python fibslow.py'
```

As shown above, it's much more than just a basic benchmarker - it does multiple runs, compares results automatically, and can help you detect/fix anomalies in each. You can benchmark as many commands as you want - e.g. 2 are used here, but 1 or 3 would work too.

Adding some **warmup runs** to keep things stable gives:
```shell
$ hyperfine "python fibslow.py" "python fibfast.py" -w 5  
Benchmark 1: python fibslow.py
  Time (mean ± σ):     140.4 ms ±   2.3 ms    [User: 112.7 ms, System: 17.3 ms]
  Range (min … max):   136.8 ms … 147.0 ms    20 runs

Benchmark 2: python fibfast.py
  Time (mean ± σ):      38.7 ms ±   1.3 ms    [User: 12.2 ms, System: 21.9 ms]
  Range (min … max):    36.1 ms …  42.6 ms    60 runs

Summary
  'python fibfast.py' ran
    3.62 ± 0.14 times faster than 'python fibslow.py'
```

{% alert note %}
Hyperfine compares execution times of *entire commands*. That's why the speed difference here seems low - the loading time of Python's interpreter itself is being counted. This has a negligible effect on slower programs though.
{% endalert %}
## Profiling

Profiling, on the other hand, records how much time is taken by each individual function, allowing you to pinpoint pieces of code that could be optimized.

Pretty much all external profilers rely on first creating a `.prof` file using Python's built in tools, then displaying it in a pretty format. To do this, run:

```python
python -m cProfile -o program.prof my_program.py
```

[Snakeviz](https://jiffyclub.github.io/snakeviz/) is one such visualizer. It's pretty cool!
