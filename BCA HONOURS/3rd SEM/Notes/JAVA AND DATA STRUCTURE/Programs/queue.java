 import java.util.Scanner;
class queue
 {
    int queue[], front, rear, temp, max = 5;
    Scanner s = new Scanner(System.in);

    queue()
 {
        queue = new int[max];
        front = -1;
        rear = -1; 
    }
    void enqueue() 
{
        if (rear == max - 1)
 {
            System.out.println("Queue is full.....cannot insert any element\n");
            return;
        } 
else
 {
            rear = rear + 1;
            System.out.println("Enter the element to insert:");
            queue[rear] = s.nextInt(); 
            if (front == -1) 
{
                front = 0;
            }
            return;
        }
    }

    void dequeue()
 {
        if (front == -1 && rear == -1) 
{
            System.out.println("Queue is empty...cannot delete\n");
            return;
        } 
else 
{
            System.out.println("The deleted item ==> " + queue[front] + "\n");
            front = front + 1;
            if (front > rear) 
{ 

                front = -1;
                rear = -1;
            }
        }
        return;
    }

    void show() 
{
        if (front == -1 && rear == -1)
 {
            System.out.println("Queue is empty...cannot show\n");
            return;
        } 
else
 {
            System.out.println("Queue elements:");
            for (temp = front; temp <= rear; temp++) 
{
                System.out.println(queue[temp]);
            }
        }
    }

    void menu() 
{
        int choice;
        do {
            System.out.println("\n*****MAIN MENU*****\n");
            System.out.println("1. ENQUEUE OPERATION\n");
            System.out.println("2. DEQUEUE OPERATION\n");
            System.out.println("3. SHOW OPERATION\n");
            System.out.println("4. EXIT OPERATION\n");
            System.out.println("ENTER YOUR CHOICE\n");
            choice = s.nextInt();
            switch (choice) {
                case 1:
                    enqueue();
                    break;
                case 2:
                    dequeue();
                    break;
                case 3:
                    show();
                    break;
                default:
                    System.out.println("SORRY! WRONG OPTION\n");
            }
        } while (choice != 4);
    }

    public static void main(String args[]) 
{
        queue obj = new queue();
        obj.menu();
    }
}
