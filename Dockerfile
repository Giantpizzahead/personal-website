FROM jekyll/jekyll:latest

WORKDIR /srv/jekyll

# Copy project files into the container
COPY . .

# Expose the Jekyll server port
EXPOSE 4000

# Serve the Jekyll site automatically on container startup
CMD ["jekyll", "serve", "--host", "0.0.0.0", "--force_polling", "--watch"]
