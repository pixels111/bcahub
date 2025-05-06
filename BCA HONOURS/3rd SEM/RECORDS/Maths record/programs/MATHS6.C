#include <stdio.h>
#include <conio.h>
float det(int a[3][3])
 {
  float d = 0.0;
    int i;  
    for (i = 0; i < 3; i++) 
{
        d += a[0][i] * (a[1][(i+1) % 3] * a[2][(i+2) % 3] - a[1][(i+2) % 3] * a[2][(i+1) % 3]);
    }
    return d;
}
void main() 
{
    int a[3][3], b[3], t1[3][3], t2[3][3], t3[3][3];
    int i, j;
    float d, d1, d2, d3;
    clrscr();  
    printf("Enter coefficients of variables:\n");
    for (i = 0; i < 3; i++)
 {
        for (j = 0; j < 3; j++) 
{
           scanf("%d", &a[i][j]);       
            t1[i][j] = t2[i][j] = t3[i][j] = a[i][j];
        }
    }
    printf("Enter constants:\n");
    for (i = 0; i < 3; i++) 
{
        scanf("%d", &b[i]);
    }
    d = det(a);
    if (d == 0.0)
 {
        printf("Solution does not exist\n");
    } 
else 
{
        for (i = 0; i < 3; i++) t1[i][0] = b[i];
        d1 = det(t1);

        for (i = 0; i < 3; i++) t2[i][1] = b[i];
        d2 = det(t2);

        for (i = 0; i < 3; i++) t3[i][2] = b[i];
        d3 = det(t3);

        printf("\nSolution of the given system of linear equations is:\n");
        printf("x = %0.2f,\t y = %0.2f,\t z = %0.2f\n", d1/d, d2/d, d3/d);
    }

    getch();  
}
