import java.util.Scanner;
class palindrome
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
sum= (sum*10)+r;
n=n/10;
}
if (temp==sum)
{
System.out.println(temp + " is palindrome num");
}
else
{
System.out.println(temp + " is not palindrome num");
}
}
}
