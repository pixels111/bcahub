#include<stdio.h>
#include<conio.h>
void main()
{
int a[10][10],b[10][10],c[10][10],m1,n1,m2,n2,i,j,k;
clrscr();
printf("Enter size of matrix A\n");
scanf("%d%d",&m1,&n1);
printf("Enter size of matrix B\n");
scanf("%d%d",&m2,&n2);
if(n1!=m2)
printf("Matrix multiplication not possible ");
else
{
 printf("Enter Matrix A of order %dX%d\n",m1,n1);
 for(i=1;i<=m1;i++)
 for(j=1;j<=n1;j++)
 scanf("%d",&a[i][j]);
 printf("Enter Matrix B of order %dX%d\n",m2,n2);
 for(i=1;i<=m2;i++)
 for(j=1;j<=n2;j++)
 scanf("%d",&b[i][j]); 
 printf("The Product matrix AB is\n");
 for(i=1;i<=m1;i++) 
 {
 for(j=1;j<=n2;j++)
 {
 c[i][j]=0;
 for(k=1;k<=n1;k++)
 c[i][j]=c[i][j]+a[i][k]*b[k][j];
 printf("%d\t",c[i][j]); 
 }
 printf("\n"); 
 }
 }
getch();
}
