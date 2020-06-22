ASY_ICONS=$(wildcard icons/*.asy)

all: 
	asy -fsvg $(ASY_ICONS) -o src/assets/
	asy -fhtml logo/logo3d.asy -o src/assets/
#	npm run build

clean:
	-cd src/assets && rm -f $(notdir $(ASY_ICONS:.asy=.svg)) show.svg homeHover.svg logo3d.html
