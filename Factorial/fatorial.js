function Tailfactorial(num, x = 1) {
  if (num === 0) {
    return x;
  } else {
    return Tailfactorial(num - 1, num * x);
  }
}

console.log(tailFactorial(30));
