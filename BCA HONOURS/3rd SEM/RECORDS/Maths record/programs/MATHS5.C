#include<stdio.h>
#include<conio.h>
void main()
{
 int a[3][3],b[3][1],i,j,k;
 float cof[3][3],inv[3][3],t[3][1],det=0;
 clrscr();
 printf("Enter coefficient matrix:\n");
 for(i=0;i<3;i++)
 for(j=0;j<3;j++)
 scanf("%d",&a[i][j]);
 printf("Enter constant matrix:\n");
 for(i=0;i<3;i++)
 for(j=0;j<1;j++)
 scanf("%d",&b[i][j]);
 for(i=0;i<3;i++)
 det = det + (a[0][i]*(a[1][(i+1)%3]*a[2][(i+2)%3] -a[1][(i+2)%3]*a[2][(i+1)%3]));
 if(det==0)
 printf("Solution does not exists"); 
 else
 {
 printf("\nThe values of x, y, z are:\n");
 for(i=0;i<3;i++)
 for(j=0;j<3;j++)
 cof[i][j]=((a[(i+1)%3][(j+1)%3]*a[(i+2)%3][(j+2)%3])-(a[(i+1)%3][(j+2)%3]*a[(i+2)%3][(j+1)%3]));
 for(i=0;i<3;i++)
 for(j=0;j<3;j++)
 inv[i][j]=cof[j][i]/det;
for(i=0;i<3;i++)
 for(j=0;j<1;j++)
 {
 t[i][j]=0;
 for(k=0;k<3;k++)
 t[i][j]=t[i][j]+inv[i][k]*b[k][j];
 printf("%.2f",t[i][j]);
 printf("\n");
 }
 }
getch();
}
