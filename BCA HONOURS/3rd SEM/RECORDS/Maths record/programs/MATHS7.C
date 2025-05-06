#include <stdio.h>
#include <conio.h>
#define R 3
#define C 3
void swap(int mat[R][C], int row1, int row2, int col)
 {
    int i, temp;  
    for (i = 0; i < col; i++) 
{
        temp = mat[row1][i];
        mat[row1][i] = mat[row2][i];
        mat[row2][i] = temp;
    }
}
int rankOfMatrix(int mat[R][C]) 
{
    int rank = C;
    int row, col, i, reduce;
    double mult;
   for (row = 0; row < rank; row++) 
{      
        if (mat[row][row] != 0) 
{
            for (col = 0; col < R; col++)
 {
                if (col != row) 
{
                    mult = (double)mat[col][row] / mat[row][row];
                    for (i = 0; i < rank; i++) 
{
                        mat[col][i] -= mult * mat[row][i];
                    }
                }
            }
        }
 else 
{         
            reduce = 1;
            for (i = row + 1; i < R; i++) 
{
                if (mat[i][row] != 0)
 {
                    swap(mat, row, i, rank);
                    reduce = 0;
                    break;
                }
            }
     
            if (reduce == 1) 
{
                rank--;
                for (i = 0; i < R; i++) 
{
                    mat[i][row] = mat[i][rank];
                }
            }
            row--;
        }
    }
    return rank;
}
void main() 
{
    int mat[3][3];
    int i, j, rank;
    clrscr();      
    printf("Enter a 3x3 matrix:\n");
    for (i = 0; i < 3; i++)
 {
        for (j = 0; j < 3; j++) 
{
            scanf("%d", &mat[i][j]);
        }
    }   
    rank = rankOfMatrix(mat);
    printf("\nRank of the matrix is: %d\n", rank);
    getch();  
}
