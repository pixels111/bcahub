#include<stdio.h>
#include<conio.h>
void main()
{
 int a[3][3],i,j;
 float cof[3][3],adj[3][3],det=0,t;
 clrscr();
 printf("Enter a 3X3 matrix:\n");
 for(i=0;i<3;i++)
 for(j=0;j<3;j++)
 scanf("%d",&a[i][j]);
for(i=0;i<3;i++)
 det = det + (a[0][i]*(a[1][(i+1)%3]*a[2][(i+2)%3] -a[1][(i+2)%3]*a[2][(i+1)%3]));
 printf("Determinant of given matrix=%f",det); 
 if(det==0)
 printf("\n Inverse does not exists for given matrix"); 
 else
 {
 printf("\n Inverse of matrix is: \n\n");
 for(i=0;i<3;i++)
 for(j=0;j<3;j++)
 cof[i][j]=((a[(i+1)%3][(j+1)%3] *a[(i+2)%3][(j+2)%3])-(a[(i+1)%3][(j+2)%3]*a[(i+2)%3][(j+1)%3]));
 for(i=0;i<3;i++)
 {
 for(j=0;j<3;j++)
 {
 adj[i][j]=cof[j][i];
 t=adj[i][j]/det;
 printf("%0.2f\t",t); 
}
 printf("\n");
 }
 }
getch();
}