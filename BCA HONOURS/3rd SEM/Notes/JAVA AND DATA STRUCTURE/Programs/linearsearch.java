import java.util.Scanner;
class linearsearch
{
public static void main(String args[])
{
int a[]=new int[50];
int i,search,n;
Scanner s= new Scanner(System.in);
System.out.println("enter n value=");
n= s.nextInt();
System.out.println("enter an elements");
for (i=0;i<n;i++)
{
a[i]=s.nextInt();
}
System.out.println("enter search element");
search= s.nextInt();
for (i=0;i<n;i++)
{
if (a[i]==search)
{
System.out.println(search +"is found in the list");
break;
}
}
if (i==n)
{
System.out.println(search +"is not found in the list");
}
}
}
