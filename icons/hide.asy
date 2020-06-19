unitsize(15mm);
pen p=rgb(176/255,0,0);
draw((0,0)--(1,0),p+14mm);
dot((0,0),black+10mm);

shipout("show",rotate(180)*currentpicture);
shipout();
