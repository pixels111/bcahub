class rectangle
{
float l,b;
void rect( float l, float b)
{
this.l=l;
this.b=b;
float ar=l*b;
float p=2*(l+b);
System.out.println("arae of rectangle="+ar);
System.out.println("parameter="+p);
}
void rect( int l, int b)
{
this.l=l;
this.b=b;
float ar=l*b;
float p=2*(l+b);
System.out.println("arae of rectangle="+ar);
System.out.println("parameter="+p);
}
void rect( float l)
{
this.l=l;
b=l;
System.out.println("arae of rectangle="+(l*b));
System.out.println("parameter="+(2*(l+b)));
}
public static void main(String args[])
{
rectangle v= new rectangle();
v.rect(4.2F);
v.rect(4,5);
v.rect(4.2F,2.5F);
}
}