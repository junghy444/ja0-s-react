// 3. 함수
// 첫번째 방식
function add(a, b) {
    return a + b;
}

console.log(add(2, 3));

// 두번째 방식 (익명함수)
var add2 = function (a, b) {
    return a + b;
};

console.log(add2(2, 3));
console.log(typeof add2);

// 세번째 방식
var add3 = function (a, b) {
    return a + b;
};

console.log(add3(2, 3));

/*
// 한번에 정리해서 함수이름에 값을 저장 
var add3 = (function (a, b) {
    return a + b;
})(2, 3);

console.log(add3);
*/

// 네번째 방식 (ES6, arrow function)
var add4 = ((a, b) => {
    return a + b;       // 화살표 함수에는 암묵적 리턴이 있기 때문에 return을 생략 가능
})(2, 3);

console.log(add4);

var add5 = (a, b) => a + b;
console.log(add5(2, 3));

// 추가
var add6 = add5;
console.log(typeof add5);
console.log(typeof add6);
console.log(add6(2,3));