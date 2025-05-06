import java.util.Scanner;

class vote1
 {
    public static void main(String args[]) 
{
        Scanner scanner = new Scanner(System.in);
        System.out.printIn("Enter your age: ");
        int age = scanner.nextInt();
        if (age > 150)
 {
            System.out.println("you are not alive");
        } 
else if (age >= 18)
 {
            System.out.println("you are eligible");
        } 
else 
{
            System.out.println("you are not eligible");
        }
        
        scanner.close();
    }
}
