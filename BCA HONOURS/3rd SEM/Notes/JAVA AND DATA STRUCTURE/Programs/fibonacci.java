import java.util.Scanner;
class fibonacci
{
public static void main(String []args)
{
int n,a=0,b=1,c;
Scanner s=new Scanner(System.in);
System.out.println("Enter number:");
n=s.nextInt();
System.out.println("the fibbonnaci series are");
System.out.print(a+"\t"+b);
while(n!=0)
{
c=a+b;
System.out.print("\t" + c);
a=b;
b=c;
n--;
}
}
}
