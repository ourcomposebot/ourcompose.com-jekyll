# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "ourcomposecast-jekyll-theme"
  spec.version       = "3.1.0"
  spec.authors       = ["Andrew Cziryak", "Jack Moore"]
  spec.email         = ["andrewcz@compositional.enterprises", "jmoore53@compositional.enterprises"]

  spec.summary       = %q{A Jekyll theme based on alembic to be useful as a podcast hosting site.}
  spec.description   = "This theme is set up based on the Alembic theme and has added several other twists, including the ability to embed the podigee podcast player, and maintain an RSS feed of the podcast episodes."
  spec.homepage      = "https://podcast-dev.ourcompose.com"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README|sw|manifest)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.9"
  spec.add_runtime_dependency "jekyll-commonmark", "~> 1.2"
  spec.add_runtime_dependency "jekyll-default-layout", "~> 0.1"
  #spec.add_runtime_dependency "jekyll-feed", "~> 0.9"
  spec.add_runtime_dependency "jekyll-include-cache", "~> 0.1"
  spec.add_runtime_dependency "jekyll-mentions", "~> 1.2"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-redirect-from", "~> 0.12"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.3"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 0.13"
  spec.add_runtime_dependency "jemoji", "~> 0.11"
  spec.add_runtime_dependency "kramdown-parser-gfm", "~> 1.1.0"
  spec.add_runtime_dependency "rexml", "~> 3.2.4"
end
