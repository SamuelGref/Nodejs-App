const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

// CHANGING THREADPOOL SIZE
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log("timer 1 finished"), 0);
setImmediate(() => console.log("immedaite 1 finished"));

fs.readFile("test-file.tex", () => {
  console.log("I/O completed");
  console.log("--------------------------");
  setTimeout(() => console.log("timer 2 finished"), 0);
  setTimeout(() => console.log("timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 3 finished"));
  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now(), "password incrypted")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now(), "password incrypted")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now(), "password incrypted")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now(), "password incrypted")
  );
});

console.log("hello from top level code");
