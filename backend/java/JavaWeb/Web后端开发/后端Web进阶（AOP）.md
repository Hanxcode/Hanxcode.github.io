# 后端Web进阶（AOP）

**什么是AOP？**

AOP：`Aspect Oriented Programming`（面向切面编程、面向方面编程），其实说白了，面向切面编程就是面向特定方法编程。 

那什么又是面向方法编程呢，为什么又需要面向方法编程呢？

来，我们举个例子做一个说明：

比如，我们这里有一个项目，项目中开发了很多的业务功能。然而有一些业务功能执行效率比较低，执行耗时较长，我们需要针对于这些业务方法进行优化。 那首先第一步就需要定位出执行耗时比较长的业务方法，再针对于业务方法再来进行优化。

![img](./后端Web进阶（AOP）.assets/Aop1.png)

此时我们就需要统计当前这个项目当中每一个业务方法的执行耗时。那么统计每一个业务方法的执行耗时该怎么实现？

可能多数人首先想到的就是在每一个业务方法运行之前，记录这个方法运行的开始时间。在这个方法运行完毕之后，再来记录这个方法运行的结束时间。拿结束时间减去开始时间，不就是这个方法的执行耗时吗。

![img](./后端Web进阶（AOP）.assets/AOP2.png)

而这个功能如果通过AOP来实现，我们只需要单独定义下面这一小段代码即可，不需要修改原始的任何业务方法即可记录每一个业务方法的执行耗时。

![img](./后端Web进阶（AOP）.assets/AOP.png)

所以，AOP的优势主要体现在以下四个方面：

- 减少重复代码：不需要在业务方法中定义大量的重复性的代码，只需要将重复性的代码抽取到AOP程序中即可。
- 代码无侵入：在基于AOP实现这些业务功能时，对原有的业务代码是没有任何侵入的，不需要修改任何的业务代码。
- 提高开发效率
- 维护方便

AOP是一种思想，而在Spring框架中，对这种思想进行了实现，那我们要学习的就是Spring AOP。



## AOP基础

### AOP快速入门

在了解了什么是AOP后，我们下面通过一个快速入门程序，体验下AOP的开发，并掌握Spring中AOP的开发步骤。

- **需求：统计部门管理各个业务层方法执行耗时。**
- **原始方式：**

在原始的实现方式中，我们需要在业务层的也一个方法执行执行，获取方法运行的开始时间； 然后运行原始的方法逻辑； 最后在每一个方法运行结束时，获取方法运行结束时间，计算执行耗时。

![img](./后端Web进阶（AOP）.assets/AOP3.png)

- **`SpringAOP`实现步骤：**

为演示方便，可以直接导入资料中提供的`springboot-aop-quickstart`项目工程

1). 导入依赖：在 pom.xml 文件中导入 AOP 的依赖

```XML
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

2). 编写AOP程序：针对于特定方法根据业务需要进行编程

```Java
@Component
@Aspect //当前类为切面类
@Slf4j
public class RecordTimeAspect {

    @Around("execution(* com.itheima.service.impl.DeptServiceImpl.*(..))")
    public Object recordTime(ProceedingJoinPoint pjp) throws Throwable {
        //记录方法执行开始时间
        long begin = System.currentTimeMillis();

        //执行原始方法
        Object result = pjp.proceed();

        //记录方法执行结束时间
        long end = System.currentTimeMillis();

        //计算方法执行耗时
        log.info("方法执行耗时: {}毫秒",end-begin);
        return result;
    }
}
```

重新启动`SpringBoot`服务，打开浏览器访问部门管理的功能进行测试：

![img](./后端Web进阶（AOP）.assets/AOP4.png)

我们可以看到，在控制台中输出了方法的执行耗时：

![img](./后端Web进阶（AOP）.assets/AOP5.png)

我们通过AOP入门程序完成了业务方法执行耗时的统计，那其实AOP的功能远不止于此，常见的应用场景如下：

- 记录系统的操作日志
- 权限控制
- 事务管理：我们前面所讲解的Spring事务管理，底层其实也是通过AOP来实现的，只要添加@Transactional注解之后，AOP程序自动会在原始方法运行前先来开启事务，在原始方法运行完毕之后提交或回滚事务

这些都是AOP应用的典型场景。

通过入门程序，我们也应该感受到了AOP面向切面编程的一些优势：

- 代码无侵入：没有修改原始的业务方法，就已经对原始的业务方法进行了功能的增强或者是功能的改变
- 减少了重复代码
- 提高开发效率
- 维护方便



1. `SpringAOP`程序的开发步骤？
   * 引入`AOP`的依赖
   * 编写`AOP`的程序（公共的逻辑代码）

2. `SpringAOP`的应用场景？
   * 记录系统的操作日志
   * 事务管理
   * 权限控制
   * ...





### AOP核心概念

通过`SpringAOP`的快速入门，感受了一下AOP面向切面编程的开发方式。下面我们再来学习AOP当中涉及到的一些核心概念。

- **连接点：**`JoinPoint`，可以被AOP控制的方法（暗含方法执行时的相关信息）
  - 连接点指的是可以被`aop`控制的方法。例如：入门程序当中所有的业务方法都是可以被`aop`控制的方法。
  - 在`pringAOP`提供的`JoinPoint`当中，封装了连接点方法在执行时的相关信息。（后面会有具体的讲解）
  - ![img](./后端Web进阶（AOP）.assets/AOP6.png)

- **通知：**`Advice`，指哪些重复的逻辑，也就是共性功能（最终体现为一个方法）
  - 在入门程序中是需要统计各个业务方法的执行耗时的，此时我们就需要在这些业务方法运行开始之前，先记录这个方法运行的开始时间，在每一个业务方法运行结束的时候，再来记录这个方法运行的结束时间。
  - 是在AOP面向切面编程当中，我们只需要将这部分重复的代码逻辑抽取出来单独定义。抽取出来的这一部分重复的逻辑，也就是共性的功能。
  - ![img](./后端Web进阶（AOP）.assets/AOP7.png)

- **切入点：**`PointCut`，匹配连接点的条件，通知仅会在切入点方法执行时被应用。
  - 在通知当中，我们所定义的共性功能到底要应用在哪些方法上？此时就涉及到了切入点pointcut概念。切入点指的是匹配连接点的条件。通知仅会在切入点方法运行时才会被应用。
  - 在`aop`的开发当中，我们通常会通过一个切入点表达式来描述切入点(后面会有详解)。
  - ![img](./后端Web进阶（AOP）.assets/AOP8.png)

  - 假如：切入点表达式改为`DeptServiceImpl.list()`，此时就代表仅仅只有list这一个方法是切入点。只有list()方法在运行的时候才会应用通知。

- **切面：Aspect**，描述通知与切入点的对应关系（通知+切入点）

当通知和切入点结合在一起，就形成了一个切面。通过切面就能够描述当前`aop`程序需要针对于哪个原始方法，在什么时候执行什么样的操作。

![img](./后端Web进阶（AOP）.assets/AOP9.png)

而切面所在的类，称之为切面类（被`@Aspect`注解标识的类）。

- **目标对象：Target**，通知所应用的对象

目标对象指的就是通知所应用的对象，我们就称之为目标对象。

![img](./后端Web进阶（AOP）.assets/AOP10.png)

AOP的核心概念我们介绍完毕之后，接下来我们再来分析一下我们所定义的通知是如何与目标对象结合在一起，对目标对象当中的方法进行功能增强的。

![img](./后端Web进阶（AOP）.assets/AOP11.png)

Spring的AOP底层是基于动态代理技术来实现的，也就是说在程序运行的时候，会自动的基于动态代理技术为目标对象生成一个对应的代理对象。在代理对象当中就会对目标对象当中的原始方法进行功能的增强。

`SpringAOP `旨在管理bean对象的过程中，主要通过底层的动态代理机制，对特定的方法进行编程 。





## AOP进阶

### 通知类型

在入门程序当中，我们已经使用了一种功能最为强大的通知类型：Around环绕通知。

```Java
@Component
@Aspect //当前类为切面类
@Slf4j
public class TimeAspect {

    @Around("execution(* com.itheima.service.impl.DeptServiceImpl.*(..))")
    public Object recordTime(ProceedingJoinPoint pjp) throws Throwable {
        //记录方法执行开始时间
        long begin = System.currentTimeMillis();
        //执行原始方法
        Object result = pjp.proceed();
        //记录方法执行结束时间
        long end = System.currentTimeMillis();
        //计算方法执行耗时
        log.info("方法执行耗时: {}毫秒",end-begin);
        return result;
    }
}
```

只要我们在通知方法上加上了`@Around`注解，就代表当前通知是一个环绕通知。

| **Spring AOP 通知类型** |                                                              |
| ----------------------- | ------------------------------------------------------------ |
| `@Around`               | 环绕通知，此注解标注的通知方法在目标方法前、后都被执行       |
| `@Before`               | 前置通知，此注解标注的通知方法在目标方法前被执行             |
| `@After`                | 后置通知，此注解标注的通知方法在目标方法后被执行，无论是否有异常都会执行 |
| `@AfterReturning`       | 返回后通知，此注解标注的通知方法在目标方法后被执行，有异常不会执行 |
| `@AfterThrowing`        | 异常后通知，此注解标注的通知方法发生异常后执行               |

下面我们通过代码演示，来加深对于不同通知类型的理解：

```Java
@Slf4j
@Component
@Aspect
public class MyAspect1 {
    //前置通知
    @Before("execution(* com.itheima.service.*.*(..))")
    public void before(JoinPoint joinPoint){
        log.info("before ...");

    }

    //环绕通知
    @Around("execution(* com.itheima.service.*.*(..))")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        log.info("around before ...");

        //调用目标对象的原始方法执行
        Object result = proceedingJoinPoint.proceed();
        
        //原始方法如果执行时有异常，环绕通知中的后置代码不会在执行了
        
        log.info("around after ...");
        return result;
    }

    //后置通知
    @After("execution(* com.itheima.service.*.*(..))")
    public void after(JoinPoint joinPoint){
        log.info("after ...");
    }

    //返回后通知（程序在正常执行的情况下，会执行的后置通知）
    @AfterReturning("execution(* com.itheima.service.*.*(..))")
    public void afterReturning(JoinPoint joinPoint){
        log.info("afterReturning ...");
    }

    //异常通知（程序在出现异常的情况下，执行的后置通知）
    @AfterThrowing("execution(* com.itheima.service.*.*(..))")
    public void afterThrowing(JoinPoint joinPoint){
        log.info("afterThrowing ...");
    }
}
```

重新启动`SpringBoot`服务，进行测试：

**1). 没有异常情况下：**

使用 `Apifox` 测试查询所有部门数据

![img](./后端Web进阶（AOP）.assets/AOP进阶1.png)

查看idea中控制台日志输出：

![img](./后端Web进阶（AOP）.assets/AOP进阶2.png)

> 程序没有发生异常的情况下，`@AfterThrowing`标识的通知方法不会执行。

**2). 出现异常情况下：**

修改`DeptServiceImpl`业务实现类中的代码： 添加异常

```Java
@Slf4j
@Service
public class DeptServiceImpl implements DeptService {
    @Autowired
    private DeptMapper deptMapper;

    @Override
    public List<Dept> list() {

        List<Dept> deptList = deptMapper.list();
        //模拟异常
        int num = 10/0;
        return deptList;
    }
    
    //省略其他代码...
}
```

重新启动`SpringBoot`服务，测试发生异常情况下通知的执行：

![img](./后端Web进阶（AOP）.assets/AOP进阶3.png)

查看idea中控制台日志输出

![img](./后端Web进阶（AOP）.assets/AOP进阶4.png)

> 程序发生异常的情况下：
>
> - `@AfterReturning`标识的通知方法不会执行，`AfterThrowing`标识的通知方法执行了
> - `@Around`环绕通知中原始方法调用时有异常，通知中的环绕后的代码逻辑也不会在执行了 （因为原始方法调用已经出异常了）

在使用通知时的注意事项：

- `@Around`环绕通知需要自己调用 `ProceedingJoinPoint.proceed() `来让原始方法执行，其他通知不需要考虑目标方法执行
- `@Around`环绕通知方法的返回值，必须指定为Object，来接收原始方法的返回值，否则原始方法执行完毕，是获取不到返回值的。



五种常见的通知类型，我们已经测试完毕了，此时我们再来看一下刚才所编写的代码，有什么问题吗？

```Java
//前置通知
@Before("execution(* com.itheima.service.*.*(..))")

//环绕通知
@Around("execution(* com.itheima.service.*.*(..))")
  
//后置通知
@After("execution(* com.itheima.service.*.*(..))")

//返回后通知（程序在正常执行的情况下，会执行的后置通知）
@AfterReturning("execution(* com.itheima.service.*.*(..))")

//异常通知（程序在出现异常的情况下，执行的后置通知）
@AfterThrowing("execution(* com.itheima.service.*.*(..))")
```

我们发现啊，每一个注解里面都指定了切入点表达式，而且这些切入点表达式都一模一样。此时我们的代码当中就存在了大量的重复性的切入点表达式，假如此时切入点表达式需要变动，就需要将所有的切入点表达式一个一个的来改动，就变得非常繁琐了。

怎么来解决这个切入点表达式重复的问题？ 答案就是：**抽取**

Spring提供了`@PointCut`注解，该注解的作用是将公共的切入点表达式抽取出来，需要用到时引用该切入点表达式即可。

> `private`：仅能在当前切面类中引用该表达式
>
> `public`：在其他外部的切面类中也可以引用该表达式

```Java
@Slf4j
@Component
@Aspect
public class MyAspect1 {

    //切入点方法（公共的切入点表达式）
    @Pointcut("execution(* com.itheima.service.*.*(..))")
    private void pt(){}

    //前置通知（引用切入点）
    @Before("pt()")
    public void before(JoinPoint joinPoint){
        log.info("before ...");

    }

    //环绕通知
    @Around("pt()")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        log.info("around before ...");

        //调用目标对象的原始方法执行
        Object result = proceedingJoinPoint.proceed();
        //原始方法在执行时：发生异常
        //后续代码不在执行

        log.info("around after ...");
        return result;
    }

    //后置通知
    @After("pt()")
    public void after(JoinPoint joinPoint){
        log.info("after ...");
    }

    //返回后通知（程序在正常执行的情况下，会执行的后置通知）
    @AfterReturning("pt()")
    public void afterReturning(JoinPoint joinPoint){
        log.info("afterReturning ...");
    }

    //异常通知（程序在出现异常的情况下，执行的后置通知）
    @AfterThrowing("pt()")
    public void afterThrowing(JoinPoint joinPoint){
        log.info("afterThrowing ...");
    }
}
```

需要注意的是：当切入点方法使用`private`修饰时，仅能在当前切面类中引用该表达式， 当外部其他切面类中也要引用当前类中的切入点表达式，就需要把`private`改为`public`，而在引用的时候，具体的语法为：

```Java
@Slf4j
@Component
@Aspect
public class MyAspect2 {
    //引用MyAspect1切面类中的切入点表达式
    @Before("com.itheima.aspect.MyAspect1.pt()")
    public void before(){
        log.info("MyAspect2 -> before ...");
    }
}
```



> 1. 常见的通知类型有哪些？分别在什么时候执行
>
>    a. `Before`（前置通知）
>
>    b.`Afetr`（后置通知）
>
>    c.`around`（环绕通知，重点）
>
>    d.`AfterReturning`（返回后通知）
>
>    e.`AfetrThrowing`（异常后通知）
>
> 2. `PointCut`注解的作用是什么？
>    * 抽取公共的切点表达式，提高复用性





### 通知顺序

讲解完了Spring中AOP所支持的5种通知类型之后，接下来我们再来研究通知的执行顺序。

当在项目开发当中，我们定义了多个切面类，而多个切面类中多个切入点都匹配到了同一个目标方法。此时当目标方法在运行的时候，这多个切面类当中的这些通知方法都会运行。

此时我们就有一个疑问，这多个通知方法到底哪个先运行，哪个后运行？ 下面我们通过程序来验证（这里呢，我们就定义两种类型的通知进行测试，一种是前置通知`@Before`，一种是后置通知`@After`）

定义多个切面类：

```Java
@Slf4j
@Component
@Aspect
public class MyAspect2 {
    //前置通知
    @Before("execution(* com.itheima.service.*.*(..))")
    public void before(){
        log.info("MyAspect2 -> before ...");
    }

    //后置通知
    @After("execution(* com.itheima.service.*.*(..))")
    public void after(){
        log.info("MyAspect2 -> after ...");
    }
}
@Slf4j
@Component
@Aspect
public class MyAspect3 {
    //前置通知
    @Before("execution(* com.itheima.service.*.*(..))")
    public void before(){
        log.info("MyAspect3 -> before ...");
    }

    //后置通知
    @After("execution(* com.itheima.service.*.*(..))")
    public void after(){
        log.info("MyAspect3 ->  after ...");
    }
}
@Slf4j
@Component
@Aspect
public class MyAspect4 {
    //前置通知
    @Before("execution(* com.itheima.service.*.*(..))")
    public void before(){
        log.info("MyAspect4 -> before ...");
    }

    //后置通知
    @After("execution(* com.itheima.service.*.*(..))")
    public void after(){
        log.info("MyAspect4 -> after ...");
    }
}
```

重新启动`SpringBoot`服务，测试通知的执行顺序：

> 备注：
>
> 1. 把`DeptServiceImpl`实现类中模拟异常的代码删除或注释掉。
> 2. 注释掉其他切面类(把`@Aspect`注释即可)，仅保留MyAspect2、MyAspect3、MyAspect4 ，这样就可以清晰看到执行的结果，而不被其他切面类干扰。

使用 `Apifox `测试查询所有部门数据。

![img](./后端Web进阶（AOP）.assets/通知顺序1.png)

查看idea中控制台日志输出

![img](./后端Web进阶（AOP）.assets/通知顺序2.png)

- > 通过以上程序运行可以看出在不同切面类中，默认按照切面类的类名字母排序：
  >
  > - 目标方法前的通知方法：字母排名靠前的先执行
  > - 目标方法后的通知方法：字母排名靠前的后执行



如果我们想控制通知的执行顺序有两种方式：

1. 修改切面类的类名（这种方式非常繁琐、而且不便管理）
2. 使用Spring提供的`@Order`注解

使用`@Order`注解，控制通知的执行顺序：

```Java
@Slf4j
@Component
@Aspect
@Order(2)  //切面类的执行顺序（前置通知：数字越小先执行; 后置通知：数字越小越后执行）
public class MyAspect2 {
    //前置通知
    @Before("execution(* com.itheima.service.*.*(..))")
    public void before(){
        log.info("MyAspect2 -> before ...");
    }

    //后置通知 
    @After("execution(* com.itheima.service.*.*(..))")
    public void after(){
        log.info("MyAspect2 -> after ...");
    }
}
@Slf4j
@Component
@Aspect
@Order(3)  //切面类的执行顺序（前置通知：数字越小先执行; 后置通知：数字越小越后执行）
public class MyAspect3 {
    //前置通知
    @Before("execution(* com.itheima.service.*.*(..))")
    public void before(){
        log.info("MyAspect3 -> before ...");
    }

    //后置通知
    @After("execution(* com.itheima.service.*.*(..))")
    public void after(){
        log.info("MyAspect3 ->  after ...");
    }
}
@Slf4j
@Component
@Aspect
@Order(1) //切面类的执行顺序（前置通知：数字越小先执行; 后置通知：数字越小越后执行）
public class MyAspect4 {
    //前置通知
    @Before("execution(* com.itheima.service.*.*(..))")
    public void before(){
        log.info("MyAspect4 -> before ...");
    }

    //后置通知
    @After("execution(* com.itheima.service.*.*(..))")
    public void after(){
        log.info("MyAspect4 -> after ...");
    }
}
```

重新启动`SpringBoot`服务，测试通知执行顺序：

![img](./后端Web进阶（AOP）.assets/通知顺序3.png)



**通知的执行顺序大家主要知道两点即可：**

1. **不同的切面类当中，默认情况下通知的执行顺序是与切面类的类名字母排序是有关系的**
2. **可以在切面类上面加上@Order注解，来控制不同的切面类通知的执行顺序**









### 切入点表达式



从AOP的入门程序到现在，我们一直都在使用切入点表达式来描述切入点。下面我们就来详细的介绍一下切入点表达式的具体写法。

切入点表达式：描述切入点方法的一种表达式

- 作用：主要用来决定项目中的哪些方法需要加入通知
- 常见形式：
  - execution(……)：根据方法的签名来匹配
  - ![img](./后端Web进阶（AOP）.assets/切入点表达式1.png)

  - @annotation(……) ：根据注解匹配
  - ![img](./后端Web进阶（AOP）.assets/切入点表达式2.png)

首先我们先学习第一种最为常见的execution切入点表达式。



#### execution

execution主要根据方法的返回值、包名、类名、方法名、方法参数等信息来匹配，语法为：

```Java
execution(访问修饰符?  返回值  包名.类名.?方法名(方法参数) throws 异常?)
```

其中带`?`的表示可以省略的部分

- 访问修饰符：可省略（比如: public、protected）
- 包名.类名： 可省略
- throws 异常：可省略（注意是方法上声明抛出的异常，不是实际抛出的异常）

示例：

```Java
@Before("execution(void com.itheima.service.impl.DeptServiceImpl.delete(java.lang.Integer))")
```

可以使用通配符描述切入点

- `*` ：单个独立的任意符号，可以通配任意返回值、包名、类名、方法名、任意类型的一个参数，也可以通配包、类、方法名的一部分
- `..` ：多个连续的任意符号，可以通配任意层级的包，或任意类型、任意个数的参数

切入点表达式的语法规则：

1. 方法的访问修饰符可以省略
2. 返回值可以使用`*`号代替（任意返回值类型）
3. 包名可以使用`*`号代替，代表任意包（一层包使用一个`*`）
4. 使用`..`配置包名，标识此包以及此包下的所有子包
5. 类名可以使用`*`号代替，标识任意类
6. 方法名可以使用`*`号代替，表示任意方法
7. 可以使用 `*`  配置参数，一个任意类型的参数
8. 可以使用`..` 配置参数，任意个任意类型的参数

**切入点表达式示例**

- 省略方法的修饰符号 

```Java
execution(void com.itheima.service.impl.DeptServiceImpl.delete(java.lang.Integer))
```

- 使用`*`代替返回值类型

```Java
execution(* com.itheima.service.impl.DeptServiceImpl.delete(java.lang.Integer))
```

- 使用`*`代替包名（一层包使用一个`*`）

```Java
execution(* com.itheima.*.*.DeptServiceImpl.delete(java.lang.Integer))
```

- 使用`..`省略包名

```Java
execution(* com..DeptServiceImpl.delete(java.lang.Integer))  
```

- 使用`*`代替类名

```Java
execution(* com..*.delete(java.lang.Integer))
```

- 使用`*`代替方法名

```Java
execution(* com..*.*(java.lang.Integer))
```

- 使用 `*` 代替参数

```Java
execution(* com.itheima.service.impl.DeptServiceImpl.delete(*))
```

- 使用`..`省略参数

```Java
execution(* com..*.*(..))
```

​        

**注意事项：**

- 根据业务需要，可以使用 且（&&）、或（||）、非（!） 来组合比较复杂的切入点表达式。

```Java
execution(* com.itheima.service.DeptService.list(..)) || execution(* com.itheima.service.DeptService.delete(..))
```

切入点表达式的书写建议：

- 所有业务方法名在命名时尽量规范，方便切入点表达式快速匹配。如：查询类方法都是 find 开头，更新类方法都是update开头

```Java
//业务类
@Service
public class DeptServiceImpl implements DeptService {
    
    public List<Dept> findAllDept() {
       //省略代码...
    }
    
    public Dept findDeptById(Integer id) {
       //省略代码...
    }
    
    public void updateDeptById(Integer id) {
       //省略代码...
    }
    
    public void updateDeptByMoreCondition(Dept dept) {
       //省略代码...
    }
    //其他代码...
}
```

- //匹配`DeptServiceImpl`类中以find开头的方法

```Java
execution(* com.itheima.service.impl.DeptServiceImpl.find*(..))
```

- 描述切入点方法通常基于接口描述，而不是直接描述实现类，增强拓展性

```Java
execution(* com.itheima.service.DeptService.*(..))
```

- 在满足业务需要的前提下，尽量缩小切入点的匹配范围。如：包名匹配尽量不使用 ..，使用 * 匹配单个包

```Java
execution(* com.itheima.*.*.DeptServiceImpl.find*(..))
```

​        

> **切入点表达式书写建议：**
>
> - 所有业务方法名在命名时尽量规范，方便切入点表达式快速匹配。如：`findXxx`，`updateXxx`。
> - 描述切入点方法通常基于接口描述，而不是直接描述实现类，增强拓展性。
> - 在满足业务需要的前提下，尽量缩小切入点的匹配范围。如：包名尽量不使用..，使用 `*` 匹配单个包。



#### @annotation

已经学习了execution切入点表达式的语法。那么如果我们要匹配多个无规则的方法，比如：list()和 delete()这两个方法。这个时候我们基于execution这种切入点表达式来描述就不是很方便了。而在之前我们是将两个切入点表达式组合在了一起完成的需求，这个是比较繁琐的。

我们可以借助于另一种切入点表达式 `@annotation` 来描述这一类的切入点，从而来简化切入点表达式的书写。

实现步骤：

1. 编写自定义注解
2. 在业务类要做为连接点的方法上添加自定义注解

**自定义注解**：`LogOperation`

```Java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogOperation{
}
```

**业务类**：`DeptServiceImpl`

```Java
@Slf4j
@Service
public class DeptServiceImpl implements DeptService {
    @Autowired
    private DeptMapper deptMapper;

    @Override
    @LogOperation //自定义注解（表示：当前方法属于目标方法）
    public List<Dept> list() {
        List<Dept> deptList = deptMapper.list();
        //模拟异常
        //int num = 10/0;
        return deptList;
    }

    @Override
    @LogOperation //自定义注解（表示：当前方法属于目标方法）
    public void delete(Integer id) {
        //1. 删除部门
        deptMapper.delete(id);
    }


    @Override
    public void save(Dept dept) {
        dept.setCreateTime(LocalDateTime.now());
        dept.setUpdateTime(LocalDateTime.now());
        deptMapper.save(dept);
    }

    @Override
    public Dept getById(Integer id) {
        return deptMapper.getById(id);
    }

    @Override
    public void update(Dept dept) {
        dept.setUpdateTime(LocalDateTime.now());
        deptMapper.update(dept);
    }
}
```

**切面类**

```Java
@Slf4j
@Component
@Aspect
public class MyAspect6 {
    //针对list方法、delete方法进行前置通知和后置通知

    //前置通知
    @Before("@annotation(com.itheima.anno.LogOperation)")
    public void before(){
        log.info("MyAspect6 -> before ...");
    }
    
    //后置通知
    @After("@annotation(com.itheima.anno.LogOperation)")
    public void after(){
        log.info("MyAspect6 -> after ...");
    }
}
```

重启`SpringBoot`务，测试查询所有部门数据，查看控制台日志：

![img](./后端Web进阶（AOP）.assets/切入点表达式3.png)

到此我们两种常见的切入点表达式我已经介绍完了。

- execution切入点表达式
  - 根据我们所指定的方法的描述信息来匹配切入点方法，这种方式也是最为常用的一种方式
  - 如果我们要匹配的切入点方法的方法名不规则，或者有一些比较特殊的需求，通过execution切入点表达式描述比较繁琐
- annotation 切入点表达式
  - 基于注解的方式来匹配切入点方法。这种方式虽然多一步操作，我们需要自定义一个注解，但是相对来比较灵活。我们需要匹配哪个方法，就在方法上加上对应的注解就可以了

根据业务需要，可以使用 && ，||，！ 来组合比较复杂的切入点表达式。





### 连接点

在`Spring`中使用了`JoinPoint`抽象了连接点，用它可以获得方法执行时的相关信息，如目标类名、方法名、方法参数等

> * 对于`Around`通知，获取连接点信息只能使用`ProceedingJoinPoint`
> * 对于其它四种通知，获取连接点信息只能使用`JoinPoint`,它是`ProceedingJoinPoint`的父类型





## AOP案例
