import java.util.Scanner;
class binarysearch
{
public static void main(String args[])
{
int a[]=new int[50];
int i,search,n,first,middle,last;
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
first=0;
last=n-1;
middle=(first+last);
while(first < last)
{
if (a [ middle]< search)
{
first= middle+1;
}
else if (a [middle]==search)
{
System.out.println(search +"is found in the list");
break;
}
else 
{
last= middle-1;
}
middle=(first+last);
}
if (first > last)
{
System.out.println(search +"is not found in the list");
}
}
}