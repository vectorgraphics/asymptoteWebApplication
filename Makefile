ASY_ICONS=$(wildcard icons/*.asy)

all: 
	asy -nowarn unbounded -fsvg $(ASY_ICONS) -o src/assets/
	asy -nowarn unbounded -fhtml logo/logo3d.asy -o public/
	npm install

build:
	npm run build

run:
	node server.js &

# Run front end only (for testing)
frontend:
	npm start

clean:
	-cd src/assets && rm -f $(notdir $(ASY_ICONS:.asy=.svg)) show.svg homeHover.svg
	-cd public && rm -f logo3d.html
