void home(string name="",pen p) {
  p += 1.2mm;
  real s=1.5;
  real h=0.5;
  real r=1/(1-h/s);
  filldraw((-1,-1)--(1,-1)--(1,h)--(0,s)--(-1,h)--cycle,p,p);
  draw((-r,0)--(-1,h),p);
  draw((1,h)--(r,0),p);
  draw(scale(2.5)*unitcircle,p);
  shipout(name,pad(64,64));
}

home("homeHover",rgb(1,0.5,0.5));
home(rgb(176/255,0,0));
