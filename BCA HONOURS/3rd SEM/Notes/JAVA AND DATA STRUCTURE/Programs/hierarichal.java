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
}
class mysubin  extends mysuper
{
int d, e;
mysubin (int a,int b,int d, int e)
{
super(a,b);
this.d=d;
this.e=e;
}
void show()
{
System.out.println("sum of four number="+(a+b+d+e));
}
public static void main(String args[])
{
System.out.println("*****hierarichal*****");
mysubin obj= new mysubin(5,5,5,5);
obj.show();
mysub obj2= new mysub(10,5,6);
obj2.show();
mysuper obj3= new mysuper(20,5);
obj3.show();
}
}