#!/bin/sh

bundle exec jekyll build --watch &
bundle exec jekyll serve --no-watch

