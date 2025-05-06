#include<stdio.h>
#include<conio.h>
void main()
{
 int a[3][3],i,j,det=0;
 clrscr();
 printf("Enter a 3X3 matrix:\n");
 for(i=0;i<3;i++)
 for(j=0;j<3;j++)
 scanf("%d",&a[i][j]);
 for(i=0;i<3;i++)
det = det + (a[0][i]*(a[1][(i+1)%3]*a[2][(i+2)%3] -a[1][(i+2)%3]*a[2][(i+1)%3]));
 printf("Determinant of given matrix=%d",det); 
 if(det==0)
 printf("\n Given Matrix is singular"); 
 else
 printf("\n Given Matrix is Non-Singular");
 getch();
}