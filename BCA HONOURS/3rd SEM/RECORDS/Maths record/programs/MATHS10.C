#include <stdio.h>
#include <conio.h>
void main() 
{
    float mean, median, mode;
    int d;
   clrscr(); 
    while (1) 
{
        printf("Enter your choice \n1. Mean\n2. Median\n3. Mode\n");
        scanf("%d", &d);
        switch (d)
 {
            case 1:
                printf("Enter Median and Mode:\n");
                scanf("%f%f", &median, &mode);
                mean = (3 * median - mode) / 2;
                printf("Mean = %f\n", mean);
                break;

            case 2:
                printf("Enter Mean and Mode:\n");
                scanf("%f%f", &mean, &mode);
                median = (mode + 2 * mean) / 3;
                printf("Median = %f\n", median);
                break;

            case 3:
                printf("Enter Mean and Median:\n");
                scanf("%f%f", &mean, &median);
                mode = 3 * median - 2 * mean;
                printf("Mode = %f\n", mode);
                break;

            default:
                printf("Wrong Choice\n");
                continue;
        }
        break; 
    }
        getch(); 
}
