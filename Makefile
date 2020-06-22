ASY_ICONS=$(wildcard icons/*.asy)

all: 
	asy -fsvg $(ASY_ICONS) -o assets/
	asy -fhtml logo/logo3d.asy -o assets/

clean:
	-cd assets && rm -f $(notdir $(ASY_ICONS:.asy=.svg)) show.svg homeHover.svg logo3d.html
