interface myinterface
{
final static int a=4,b=2;
public void add();
public void mul();
}
class compute implements myinterface
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
compute obj=new compute();
obj.add();
obj.mul();
}
}