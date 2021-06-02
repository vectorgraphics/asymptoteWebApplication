ifeq ($(ASYMPTOTE_USER),)
  export ASYMPTOTE_USER=asymptote
endif

export ASYMPTOTE_UID=$(shell getent passwd $(ASYMPTOTE_USER) | sed -e 's/[^:]*:[^:]*:\([0-9]*\):.*/\1/')
export ASYMPTOTE_GID=$(shell getent passwd $(ASYMPTOTE_USER) | sed -e 's/[^:]*:[^:]*:[^:]*:\([0-9]*\):.*/\1/')
export ASYMPTOTE_HOME=$(shell getent passwd $(ASYMPTOTE_USER) | sed -e 's/[^:]*:[^:]*:[^:]*:[^:]*:[^:]*:\([^:]*\):.*/\1/')

ifeq ($(ASYMPTOTE_UID),)
  export ASYMPTOTE_UID=0
endif

ifeq ($(ASYMPTOTE_GID),)
  export ASYMPTOTE_GID=0
endif

ifeq ($(ASYMPTOTE_HOME),)
  export ASYMPTOTE_HOME=$HOME
endif

vpath %.asy icons
vpath %.asy logo
vpath %.svg src/assets
vpath %.html.gz public

ASY_ICONS=$(wildcard icons/*.asy)
ASY_LOGO=logo3d.html.gz

all:	$(notdir $(ASY_ICONS:.asy=.svg)) $(ASY_LOGO) node_modules
	npm run build
	-cd build && static/js/*.LICENSE.txt

node_modules: package.json
	npm install

run:
	node server.js

# Run front end only (for testing)
frontend:
	npm start

tidy:
	-rm -rf logs/uncaughtExceptions

clean:  tidy
	-cd src/assets && rm -f $(notdir $(ASY_ICONS:.asy=.svg)) show.svg homeHover.svg
	-cd public && rm -f $(ASY_LOGO)
	-rm -rf node_modules build package-lock.json clients/* logs/*

.SUFFIXES: .asy .svg .html .gz .html.gz

%.svg: %.asy
	asy -nowarn unbounded -f svg -o src/assets/ $<

%.html: %.asy
	asy -nowarn unbounded -f html -o public/ $<

%.html.gz: %.html
	cd public && gzip $<
