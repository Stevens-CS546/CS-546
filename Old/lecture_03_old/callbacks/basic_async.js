let x = 25;

for (let i = 0; i < 10; i++) {
  let randomMilliSeconds = Math.random() * 1000;

  console.log(`loop is running (${randomMilliSeconds})`);
  setTimeout(() => {
    console.log(`i (inside nextTick) is ${i} after ${randomMilliSeconds}`);
  }, randomMilliSeconds);
}

console.log("This is synchronous");
console.log(x / 12);
console.log(`x / 2 is ${x / 2}`);

for (let i = 0; i < 10; i++) {
  console.log("loop is running");
  console.log(`i is ${i}`);
}

console.log("==========");
