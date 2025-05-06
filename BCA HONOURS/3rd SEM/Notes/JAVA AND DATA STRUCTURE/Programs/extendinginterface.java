interface myinterface1
{
final static int a=4,b=2;
}
interface myinterface2 extends  myinterface1
{
public void add();
public void mul();
}
class compute2 implements myinterface2
{
public void add()
{
System.out.println("the sum of two values="+(a+b));
}
public void mul()
{
System.out.println("the mul of two values="+(a*b));
}
public static void main(String args[])
{
compute2 obj=new compute2();
obj.add();
obj.mul();
}
}