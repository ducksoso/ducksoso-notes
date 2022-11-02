

async function helloAsync() {
    const result = await new Promise((resolve) =>
        setTimeout(() => resolve("Hello"))
    );
    return result;
}
async function testHelloAsync() {
    const output = await helloAsync();
    console.log("helloAsync返回值：" + JSON.stringify(output));
}

testHelloAsync();

// 返回值：
// helloAsync返回值："Hello"

