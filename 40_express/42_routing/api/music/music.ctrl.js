// 데이터
let nextId = 4;
let music = [
    { id: 1, singer: "아이유", title: "무릎" },
    { id: 2, singer: "10cm", title: "help" },
    { id: 3, singer: "장범준", title: "실버판테온" }
];

// 목록조회 (localhost:3000/api/music?limit=10)
// - 성공 : limit 수만큼 music 객체를 담은 배열을 리턴 (200: OK)
// - 실패 : limit가 숫자형이 아닐 경우 400 응답 (400: Bad Request)
const list = (req, res) => {
    let limit = req.query.limit || 10;    // type: string, 아무숫자도 넣지 않았을 때: 10
    limit = parseInt(limit, 10);        // type: number

    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    res.json(music.slice(0, limit));
};

// 상세조회 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 music 객체 리턴 (200: OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답 (400: Bad Request)
//          해당하는 id가 없는 경우 404 응답 (404: Not Found)
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    //const result = music.find(m => m.id == id);       // {id:xx, singer:xx, title:xx}
    const result = music.filter(m => m.id === id)[0];

    if (!result) return res.status(404).end();
    res.json(result);
};

// 등록 (localhost:3000/api/music)
// - 성공 : 입력값으로 music 객체를 생성 후 배열에 추가 (201: Created)
// - 실패 : singer, title 값 누락 시 400 응답 (400: Bad Request)
const create = (req, res) => {
    const { singer, title } = req.body;
    if (!singer || !title) return res.status(400).end();
    const m = { id: nextId++, singer, title };
    music.push(m);
    res.status(201).json(music);
};

// 수정 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 객체의 정보를 수정 후 반환 (200: OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답 (400: Bad Request)
//          해당하는 id가 없는 경우 404 응답 (404: Not Found)
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = music.find(m => m.id === id);
    if (!result) return res.status(404).end();
    
    const { singer, title } = req.body;
    if (singer) result.singer = singer;
    if (title) result.title = title;
    res.json(result);    
};

// 삭제 (localhost:3000/api/music/{id})
// - 성공 : id에 해당하는 music 객체 삭제 후 배열 리턴 (200: OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답 (400: Bad Request)
//          해당하는 id가 없는 경우 404 응답 (404: Not Found)
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) return res.status(400).end();

    const result = music.find(m => m.id === id);
    if (!result) return res.status(404).end();
    
    music = music.filter(m => m.id !== id);
    res.json(music);
};

module.exports = { list, detail, create, update, remove };
