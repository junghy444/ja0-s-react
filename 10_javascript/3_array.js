// 2. 배열
// 배열 선언
let arr = [1, 2, 3, 4, 5];
console.log(arr.length);
console.log(arr[2]);

let arr2 = [1, 2, "apple", "banana"];

// 반복문
for (i = 0; i < arr2.length; i++) {
    console.log(arr2[i]);
}

// for-in
for (i in arr2) {
    console.log(arr2[i]);
}

// for-of (ES6)
for (i of arr2) {
    console.log(i);
}

// splice
// index, howmany(삭제), elements(추가)
let a = ["a", "b", "c"];
a.splice(1, 0, "d");
console.log(a);

// a, x, y, c
a.splice(1, 2, "x", "y");
console.log(a);

const b = [1, 2, 3, 4, 5];
console.log(b.slice(0, 2));
console.log(b.slice(0, 10));

// ES6
const result = b.find((key) => key === 3);      // 조건에 맞는 것 중에 가장 처음 것만 리턴
console.log(result);

const result2 = b.filter(key => key >= 3);      // 조건에 맞는 것들을 모두 배열로 만들어서 리턴
console.log(result2);

console.log(b.push(6));
console.log(b);

const result3 = b.map(key => key * 2);
console.log(result3);