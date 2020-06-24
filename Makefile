vpath %.asy icons
vpath %.asy logo
vpath %.svg src/assets
vpath %.html public

ASY_ICONS=$(wildcard icons/*.asy)

all:  $(notdir $(ASY_ICONS:.asy=.svg)) logo3d.html
	npm install
	npm run build

run:
	node server.js &

# Run front end only (for testing)
frontend:
	npm start

clean:
	-cd src/assets && rm -f $(notdir $(ASY_ICONS:.asy=.svg)) show.svg homeHover.svg
	-cd public && rm -f logo3d.html
	-rm -rf node_modules build

.SUFFIXES: .asy .svg .html

%.svg: %.asy
	asy -nowarn unbounded -f svg -o src/assets/ $<

%.html: %.asy
	asy -nowarn unbounded -f svg -o public/ $<
