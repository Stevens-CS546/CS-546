let x = 25;

for (let i = 0; i < 10; i++) {
    console.log("loop is running");
    process.nextTick(() => {
        console.log(`i (inside nextTick) is ${i}`);
    });
}

console.log("This is synchronous");
console.log(x / 12);
console.log(`x / 2 is ${x / 2}`);

for (let i = 0; i < 10; i++) {
    console.log("loop is running");
    console.log(`i is ${i}`);
}

console.log("==========");