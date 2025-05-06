#include <stdio.h>
#include <conio.h>
void main() 
{ 
    int a[5][5], b[5][5], c[5][5], d[5][5], i, j, m, n;
     clrscr();
    printf("Enter the size of the matrices (m x n):\n");
    scanf("%d%d", &m, &n);
    printf("Enter Matrix A of order %dX%d:\n", m, n);
    for(i = 0; i < m; i++)
        for(j = 0; j < n; j++)
            scanf("%d", &a[i][j]);
    printf("Enter Matrix B of order %dX%d:\n", m, n);
    for(i = 0; i < m; i++)
        for(j = 0; j < n; j++)
            scanf("%d", &b[i][j]);    
    for(i = 0; i < m; i++)
 {
        for(j = 0; j < n; j++) 
{
            c[i][j] = a[i][j] + b[i][j];
            d[i][j] = a[i][j] - b[i][j];
        }
    }
    printf("A + B =\n");
    for(i = 0; i < m; i++) 
{
        for(j = 0; j < n; j++)
            printf("%d\t", c[i][j]);
        printf("\n");
    }   
    printf("A - B =\n");
    for(i = 0; i < m; i++)
 {
        for(j = 0; j < n; j++)
            printf("%d\t", d[i][j]);
        printf("\n");
    }
getch();
}
