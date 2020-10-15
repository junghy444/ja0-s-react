// 모듈 가져오기
var calc = require("./4_module");
var calc2 = require("./4_module2");

console.log(calc.calc.add(1, 2));
console.log(calc.calc.sub(1, 2));

console.log(calc2.mul(2, 3));
console.log(calc2.div(2, 3));

console.log(module.exports === exports);

// 중복되었을 때, module.exports 가 exports 보다 우선순위가 높다
console.log(calc2.name);
