// 1
console.log(a); // undefined
var a = 3;

console.log(b);

// 2
function foo() {
    console.log(b);  // undefined
    if (true) {
        var b = 2;
    }
}

foo()
