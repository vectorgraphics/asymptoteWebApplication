// Visualize the solid of revolution and calculate its volume

// Usage example: call with command-line options
// -u 'f="2*x^2"' -u 'g="x^3"' -u 'xmin=0' -u 'xmax=10' -u 'vertical=true' -u 'about=-1'

import graph3;
import solids;
//settings.outformat="html";

real alpha = 360;
unitsize(1cm);
currentprojection=perspective(0,0,10,up=Y);
real opacity = 0.4;
pen color = green+opacity(opacity);

// let the user define functions

string f,g;
real xmin,xmax;
bool vertical;
real about;

usersetting();

/*
bool terminal=false;

string f,g;if(terminal) {
  f = getstring("Define f", "2*x^2");
  g = getstring("Define g", "x^3");
// get the upper and lower bound of x
  xmin = getreal("Lower bound", 0);
  xmax = getreal("Upper bound", 10);
}
*/

string s = "real f(real x){return " + f;
s += ";}";
eval(s,true);

string s = "real g(real x){return " + g;
s += ";}";
eval(s,true);

real ymargin = 1;
real xmargin = 2;

triple axis_of_rotation = (0,0,0);
triple shift;

if (vertical) {
  axis_of_rotation = Y;
  shift=(about,0,0);
} else {
  shift=(0,about,0);
  axis_of_rotation = X;
}

// check that both functions are defined at zero
if (0>=xmin&&0<=xmax){
  assert(f(0)!=-inf&&f(0)!=inf, "f not defined at zero");
  assert(g(0)!=-inf&&g(0)!=inf, "g not defined at zero");
}

path p = graph(f, xmin, xmax, operator ..);
path q = graph(g, xmin, xmax, operator ..);
real [][] isections = intersections(p,q);

path p1 = subpath(p, isections[0][0], isections[1][0]);
path q1 = subpath(q, isections[0][1], isections[1][0]);
// get the outline of the bounded area between the two functions
path bounded = (p1 .. reverse(q1) .. cycle); // without reverse(): cycle will try to go to the beging of a path
real ymin = min(bounded).y;
path3 p3 = path3(bounded); // turn 2D path into 3D path

// perform revolution with the bounded area
revolution a=revolution(shift(-shift)*p3,axis_of_rotation,-alpha,0);
draw(shift(shift)*surface(a),color);
surface s=surface(p3);
draw(s,color);
draw(p3, red);

arrowbar axisarrow = Arrow(TeXHead);

xaxis3(Label("$x$"),xmin - xmargin, Arrow3);
yaxis3(Label("$y$"),ymin-ymargin,Arrow3);

write("*Solid of Revolution Visualizer Output*");
//using Simpson integration and the cylindrical shell method to calculate the volume of solid of revolution
// if the axis of rotation is Y or parallel to Y
if(axis_of_rotation == Y) {
  real fvolume(real x) {
    return 2*pi*abs(x-xpart(shift))*abs(f(x)-g(x));
  }

  real a = xpart(point(p,isections[0][1])); // intersections return time not point
  real b = xpart(point(p,isections[1][1]));
  write("Limits of integration:");
  write(a);
  write(b);
  real dxmax=b-a;
  real volume = simpson(fvolume, a, b, realEpsilon, dxmax);
  write("Volume:", volume);
}
// if the axis of rotation is X or parallel to X
if(axis_of_rotation == X) {
  real fvolume(real x) {
    return pi*abs((f(x)-ypart(shift))^2-(g(x)-ypart(shift))^2);
  }
  real a = xpart(point(p,isections[0][1])); // intersections return time not point
  real b = xpart(point(p,isections[1][1]));
  write("Limits of integration:");
  write(a);
  write(b);
  real dxmax=b-a;
  real volume = simpson(fvolume, a, b, realEpsilon, dxmax);
  write("Volume:", volume);
}