class scope
{
static int rno=0;
String name,group;
void set(String x, String y)
{
name=x;
group=y;
rno=rno+1;
System.out.println("roll number="+rno);
System.out.println("student name="+name);
System.out.println("group="+group);
}
public static void main(String [] args)
{
scope obj1= new scope();
System.out.println("*****STUDENT 1*****");
obj1.set("sethu","BCA");
scope obj2= new scope();
System.out.println("*****STUDENT 2*****");
obj2.set("vardhan","BSC");
}
}

