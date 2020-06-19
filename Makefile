ASY_FILES=$(wildcard icons/*.asy)

all: 
	asy -fsvg $(ASY_FILES) -o assets/

clean:
	-cd assets && rm -f $(notdir $(ASY_FILES:.asy=.svg)) show.svg homeHover.svg
