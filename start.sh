#!/bin/sh

bundle exec jekyll serve --no-watch &
sleep 2.5
bundle exec jekyll build --watch

