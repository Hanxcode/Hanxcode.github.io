# Java I/O

I/O简而言之，就是输入输出。

## 文件字节流

**FileInputStream：**从文件中读取字节数据。

**FileOutputStream：**向文件中写入字节数据。

绝对路径：从磁盘根目录开始写的完整路径，不依赖当前程序位置。

相对路径：相对于当前程序运行目录的路径。

| 对比       | 绝对路径     | 相对路径 |
| ---------- | ------------ | -------- |
| 起点       | 磁盘根目录   | 当前项目 |
| 是否固定   | ✔ 固定       | ❌ 会变   |
| 是否推荐   | ❌ 一般不推荐 | ✔ 推荐   |
| 是否可移植 | ❌ 差         | ✔ 强     |

在使用完成一个流之后，必须关闭这个流来完成对资源的释放，否则资源会一直被占用。



## 文件字符流

字符不同于字节，字符流是以一个具体的字符进行读取，因此它只适合读纯文本的文件，如果是其他类型的文件不适用。

字符流只支持char[ ]类型的作为储存

**FileReader**：从文本文件读取字符。

**FileWriter**：把字符写入文件。

字符：是人类可读的符号。

字节：是计算机存数据的最小基本单位之一，只是一个数字容器，本身没有文字含义。

| 对比         | 字节 byte      | 字符 char  |
| ------------ | -------------- | ---------- |
| 本质         | 数据单位       | 文本符号   |
| 是否可读     | ❌ 不一定       | ✔ 可读     |
| 是否固定长度 | ✔ 1字节        | ✔ 2字节    |
| 是否涉及编码 | ✔ 强相关       | ✔ Unicode  |
| 主要用途     | IO、网络、文件 | 字符串处理 |

## 文件工具类Files

## 缓冲流

## 转换流

## 打印流

## 数据流和对象流

既然基本数据类型能够读取和写入基本数据类型，那么能否将对象也支持呢？ObjectOutputStream不仅支持基本数据类型，而且通过对对象的序列化操作，以某种格式保存对象，来支持对象类型的IO，注意：它不是继承自FilterInputStream的。

## 字节数组流

## 实战：图书管理系统

要求实现一个图书管理系统（控制台），支持以下功能：保存书籍信息（要求持久化），查询、添加、删除、修改书籍信息。

主函数：

```java
package com.test;


import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;


public class Main{

    private static List<Book> LIST ;


    public static void main(String[] args) throws IOException {
        System.out.println("正在初始化图书管理系统...");
        load();  //读取之前存入的图书信息
        Scanner scanner = new Scanner(System.in);
        while(true){
            System.out.println("==========图书管理系统==========");
            System.out.println("1.录入书籍信息");
            System.out.println("2.查阅书籍信息");
            System.out.println("3.删除书籍信息");
            System.out.println("4.修改书籍信息");
            System.out.println("5.退出系统");
            System.out.println("==============================");

            switch(scanner.nextInt()){
                case 1:
                    insert(scanner);
                    break;
                case 2:
                    list();
                    break;
                case 3:
                    delete(scanner);
                    break;
                case 4:
                    modify(scanner);
                    break;
                case 5:
                    System.out.println("正在保存你的图书数据......");
                    save();
                    System.out.println("感谢你的使用，再见！");
                    return;

            }

        }
    }

    @SuppressWarnings("unchecked")
    private static void load(){
        File file = new File("data");
        if(file.exists()){
            try(ObjectInputStream stream = new ObjectInputStream(new FileInputStream("data"))){
                LIST = (List<Book>) stream.readObject();
            } catch (IOException | ClassNotFoundException e) {
                e.printStackTrace();
            }
        }else{
            LIST = new LinkedList<>();
        }
    }

    private static void save(){
        try(ObjectOutputStream stream = new ObjectOutputStream(new FileOutputStream("data"))){
            stream.writeObject(LIST);
            stream.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }



    private static void insert(Scanner scanner){
        scanner.nextLine();
        System.out.println("请输入书籍名称：");
        String title = scanner.nextLine();
        System.out.println("请输入书籍的作者：");
        String author = scanner.nextLine();
        System.out.println("请输入书籍的价格：");
        int price = scanner.nextInt();
        scanner.nextLine();
        Book book = new Book(title,author,price);
        LIST.add(new Book(title,author,price));
        System.out.println("书籍信息添加成功！" + book);
    }

    private static void modify(Scanner scanner){
        scanner.nextLine();
        System.out.println("请输入你要修改的书籍编号：");
        int index = scanner.nextInt();
        scanner.nextLine();
        while(index > LIST.size() - 1 || index < 0){
            System.out.println("没有对应的书籍，请重新输入：");
            index = scanner.nextInt();
            scanner.nextLine();
        }

        Book book = LIST.get(index);
        System.out.println("请输入书籍的标题：");
        book.setTitle(scanner.nextLine());
        System.out.println("请输入书籍的作者：");
        book.setAuthor(scanner.nextLine());
        System.out.println("请输入书籍的价格：");
        book.setPrice(scanner.nextInt());
        scanner.nextLine();

        System.out.println("书籍信息修改成功！");
    }

    private static void list(){
        for (int i = 0; i < LIST.size(); i++) {
            System.out.println(i + "." + LIST.get(i));
        }
    }

    private static void delete(Scanner scanner){
        scanner.nextLine();
        System.out.println("请输入你要删除的书籍编号：");
        int index = scanner.nextInt();
        scanner.nextLine();
        while(index > LIST.size() - 1 || index < 0){
            System.out.println("没有对应的书籍，请重新输入：");
            index = scanner.nextInt();
            scanner.nextLine();
        }
        LIST.remove(index);
        System.out.println("删除书籍信息成功！");
    }
}

```

Book.Java

```java
package com.test;

import java.io.Serializable;

public class Book implements Serializable {
    private  String title;
    private  String author;
    private  int price;


    public Book(String title,String author,int price){
        this.title = title;
        this.author = author;
        this.price = price;
    }

    public void setAuthor(String author){
        this.author = author;
    }

    public void setPrice(int Price){
        this.price = price;
    }

    public void setTitle(String title){
        this.title = title;
    }
    @Override
    public String toString() {
        return "《" + title + "》作者：" + author + "(" + price + "￥)";
    }

}

```
