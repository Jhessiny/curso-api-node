function fun1() {
  setTimeout(() => {
    console.log("func1");
  }, 1000);
}

function fun2() {
  console.log("func2");
}

fun1();
fun2();
