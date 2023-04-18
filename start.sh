#!/bin/sh

bundle exec jekyll serve --no-watch &
sleep 4
bundle exec jekyll build --watch

