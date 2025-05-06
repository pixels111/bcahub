 import java.util.Scanner;
class bubblesort
{
 public static void main(String args[])
  {
   int a[]=new int [50];
   int n,i;
   Scanner s= new Scanner(System.in);
   System.out.println("\n ENTER THE NUMBER ELEMENTS FOR SORTING \n");
   n=s.nextInt();
   System.out.println("\n ENTER AN ELEMENT \n"); 
   for (i=0;i<n;i++)
   {
   a[i]=s.nextInt();
   }
   System.out.println("\n BEFORE SORTING \n"); 
   for (i=0;i<n;i++)
   {
   System.out.println("\n"+a[i]);
   }  
Bsort(n, a);
System.out.println("\n AFTER SORTING \n"); 
   for (i=0;i<n;i++)
   {
   System.out.println("\n"+a[i]);
   } 
}
public static void Bsort(int n, int a[])
{
  int i, j, temp;
   for (i=0;i<n-1;i++)
   {
    for (j=0;j<n-i-1;j++)
   {
   if(a[j]>a[j+1])
    {
      temp= a[j];
      a[j]=a[j+1];
      a[j+1]=temp;
       }
     }  
   }  
 }  
}