class mysuper
{
int a,b;
mysuper(int a,int b)
{
this.a=a;
this.b=b;
}
void show()
{
System.out.println("sum of two number="+(a+b));
}
}
class mysub extends mysuper
{
int c;
mysub(int a,int b,int c)
{
super(a,b);
this.c=c;
}
void show()
{
System.out.println("sum of three number="+(a+b+c));
}
public static void main(String args[])
{
System.out.println("*****single inheritance*****");
mysub obj= new mysub(10,5,6);
obj.show();
mysuper obj2= new mysuper(20,5);
obj2.show();
}
}