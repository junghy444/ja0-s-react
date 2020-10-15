// JSON
const singer = {
    name: "Infinite",
    member: ["성규", "동우", "우현", "호야", "성열", "명수", "성종"],
    song: [
        {
            title: "Diamond",
            year: 2014
        },
        {
            title: "마주보며 서있어",
            year: 2015
        },
        {
            title: "태풍",
            year: 2016
        }
    ]
};

// json object -> string
const str = JSON.stringify(singer);
console.log(str);

// string -> json object
const obj = JSON.parse(str);
console.log(obj);

console.log(obj.member[2]);

console.log(obj.song[1].title);

