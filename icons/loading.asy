import palette;

size(20,20);

int n=8;
pen[] p=Gradient(n,white,rgb(1,72/255,72/255));
for(int i=0; i < n; ++i)
  fill(rotate(90-i*360/n)*shift(4,0)*unitcircle,p[i]);



