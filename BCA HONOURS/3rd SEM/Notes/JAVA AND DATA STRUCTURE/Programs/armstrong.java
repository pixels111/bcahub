import java.util.Scanner;
class armstrong
{
public static void main(String []args)
{
int n,r,sum=0,temp;
Scanner s=new Scanner(System.in);
System.out.println("Enter number:");
n=s.nextInt();
temp=n;
while(n!=0)
{
r=n%10;
sum= sum+r*r*r;
n=n/10;
}
if (temp==sum)
{
System.out.println(temp + " is armstrong num");
}
else
{
System.out.println(temp + " is not armstrong num");
}
}
}
