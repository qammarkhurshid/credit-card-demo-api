## Section 1

**Question No. 1:
What is the result of this code in the console:**

```js
for (var i = 0; i < 100; i++) {
  setTimeout(function () {
    console.log(i);
  }, 200);
}
```

The result of this code in console is:

```
100
100
100
...
100
```

100 is printed in the console 100 times.
**Reason:**
This happens because of "closures." When `setTimeout` stores the function and attaches the timer to it, it remembers the reference to `i`. So every time the value of when `i` is being logged, it is pointing to the same reference of `i` which has already been incremented to 100 before the timer function is executed after 2ms.

**Question No. 2:
What is the result of this code in the console:**

```js
(async function () {
  function waitForMe() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('hello');
      }, 200);
    });
  }
  const result = await waitForMe();
  console.log(result);
})();
```

The result of the this code in console is:

```
hello
```

**Reason:**
`waitForMe` is enclosed in the self calling function. When the code is executed the self invoking function (also known as IIFE) is called. So when the execution reaches the point where `waitForMe` is called, as `waitForMe` returns a promise, it waits for `waitForMe` to resolve or reject, `waitForMe` returns a resolved value of 'hello' after 2ms which is logged to the console.

**Question No. 3:
Explain the difference:**

```js
var a;
let b;
const c;
```

**Differences:**
|Var |Let |Const |
|--- |--- |--- |
|Function scoped | Block Scoped |Block Scoped |
|Can pe updated/re-assigned or re-declared within the scope | Can only be updated/re-assigned |Can't be updated/reassigned |
|Hoisted with a default value |Hoisted but not initialized |Hoisted but not initialized

**Question No. 4:
What is the result of this code in the console:**
We got a module "test.js":

```js
var arr = [];
module.exports = arr;
```

We got a module using it:

```js
var test = require('./test');
test.push('hello');
console.log(JSON.stringify(test));
```

We got another module using it later:

```js
var test = require('./test');
test.push('another');
console.log(JSON.stringify(test));
```

**Explanation:**
From test module `arr` is being exported but it is being assigned to a separate memory location by the modules using it respectively. So if we run `hello` module, the log would be:

```
["hello"]
```

Similarly, if we run `another` module the log would be:

```
["another"]
```

It won't get pushed to the same array because the references are different.

## Section 2

Assuming you have Node.js and Postgres installed on your system, follow the following steps to run the server:
Note: env file is being pushed with the project for demo purposes.
Clone this repo using to your local system.

```
git clone <repolink>
```

Install the dependencies using:

```
npm i
```

Run the server using:

```
npm run start
```

## Answers About Section 2

### Choice of Encryption Algorithm and the reason behind it:

I chose `aes-256-ctr` to encrypt ccv and credit card number.

### Reasons:

1. It's virtually impossible to brute force it.
   [https://www.n-able.com/blog/aes-256-encryption-algorithm#:~:text=AES%20256%20is%20virtually%20impenetrable,encryption%20system%20is%20entirely%20secure.]
2. High performance
   [https://en.wikipedia.org/wiki/Advanced_Encryption_Standard]
3. Comes out of the box with node so it's easier to implement.

### Choice of Implementation of Luhn Algo:

I used npm to install luhn algo implementation

### Reasons:

1. Didn't want to reinvent the wheel.
2. Got things done faster
3. Used by the community so it's tried and tested.
