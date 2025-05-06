#include<stdio.h>
#include<conio.h>
void main()
{
 int n,i,j;
 float a[50],t,sum=0.0;
clrscr();
 printf("How many values:\n");
 scanf("%d",&n);
 printf("Enter %d values:\n",n);
 for(i=1;i<=n;i++)
 scanf("%f",&a[i]);
 for(i=1;i<=n;i++)
 {
 for(j=i+1;j<=n;j++)
 {
 if(a[i]>a[j])
 {
 t=a[i];
 a[i]=a[j];
 a[j]=t;
 }
 }
 }
for(i=1;i<=n;i++)
 sum=sum+a[i];
printf("\nMean=%0.2f",sum/n);
if(n%2==0)
 printf("\nMedian=%0.2f",(a[n/2]+a[(n/2)+1])/2);
else
 printf("\nMedian=%0.2f",a[(n+1)/2]);
getch(); 
} 