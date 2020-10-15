// 5. 객체
// 객체 선언
let a = {};     // 배열:[], 객체:{}
let b = new Object();
console.log(typeof a);

// 속성(property), 메소드(method)
// key: value
let Person = {
    age: 19,
    name: '정하영',
    print: function () {
        console.log("저는 %d살 %s입니다.", this.age, this.name);
    }
}

// object.속성명, object["속성명"]
console.log("저는 %d살 %s입니다.", Person.age, Person["name"]);
Person.print();

// Friends 배열
let Friends = [
    {
        name: "정하영",
        age: 19
    },
    {
        name: "친구",
        ae: 19
    }
];

console.log(Friends);
console.log(Friends[1].name);

let score = {
    data: { kor: 100, mat: 90, eng: 95 },
    print() {
        for (subject in this.data) {
            console.log(subject + ":" + this.data[subject]);
        }
    },
    // 총점(sum), 평균(avg)
    sum() {
        let obj = this.data;
        return obj.kor + obj.mat + obj.eng; 
    },
    avg() {
        let num = Object.keys(this.data).length;
        return this.sum() / num;
    }

}

score.print();
console.log(score.sum());
console.log(score.avg());

// key 값이랑 value 값이랑 같을 때
let id = 1;
let name = "정하영";
let obj = {
    id,
    name
}

console.log("%d, %s", obj.id, obj.name);