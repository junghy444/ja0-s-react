/*
// 데이터
let nextId = 4;
let movie = [
    { id: 1, title: "스타워즈", director: "조지 루카스", year: "1977" },
    { id: 2, title: "아바타", director: "제임스 카메론", year: "2009" },
    { id: 3, title: "인터스텔라", director: "크리스토퍼 놀란", year: "2014" }
];


/// 목록조회 (localhost:3000/api/movie?limit=10)
// - 성공 : limit 수만큼 movie 객체를 담은 배열을 리턴 (200: OK)
// - 실패 : limit가 숫자형이 아닐 경우 400 응답 (400: Bad Request)
const list = (req, res) => {
    let limit = req.query.limit || 10;    // type: string, 아무숫자도 넣지 않았을 때: 10
    limit = parseInt(limit, 10);        // type: numer

    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    res.json(movie.slice(0, limit));
};

// 상세조회 (localhost:3000/api/movie/:id)
// - 성공 : id에 해당하는 movie 객체 리턴 (200: OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답 (400: Bad Request)
//          해당하는 id가 없는 경우 404 응답 (404: Not Found)
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    //const result = movie.find(m => m.id == id);       // {id:xx, title:xx, director:xx, year:xx}
    const result = movie.filter(m => m.id === id)[0];

    if (!result) return res.status(404).end();
    res.json(result);
};

// 등록 (localhost:3000/api/movie)
// - 성공 : 입력값으로 movie 객체를 생성 후 배열에 추가 (201: Created)
// - 실패 : title, director, year 값 누락 시 400 응답 (400: Bad Request)
const create = (req, res) => {
    const { title, director, year } = req.body;
    if (!title || !director || !year) return res.status(400).end();
    const m = { id: nextId++, title, director, year };
    movie.push(m);
    res.status(201).json(movie);
};

// 수정 (localhost:3000/api/movie/:id)
// - 성공 : id에 해당하는 객체의 정보를 수정 후 반환 (200: OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답 (400: Bad Request)
//          해당하는 id가 없는 경우 404 응답 (404: Not Found)
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find(m => m.id === id);
    if (!result) return res.status(404).end();
    
    const { title, director, year } = req.body;
    if (title) result.title = title;
    if (director) result.director = director;
    if (year) result.year = year;
    res.json(result);    
};

// 삭제 (localhost:3000/api/movie/{id})
// - 성공 : id에 해당하는 movie 객체 삭제 후 배열 리턴 (200: OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답 (400: Bad Request)
//          해당하는 id가 없는 경우 404 응답 (404: Not Found)
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find(m => m.id === id);
    if (!result) return res.status(404).end();
    
    movie = movie.filter(m => m.id !== id);
    res.json(movie);
};

module.exports = { list, detail, create, update, remove };
*/

const MovieModel = require("../../models/movie");
const mongoose = require("mongoose");

// id 유효성 체크
const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    next();
}

// 목록조회 (localhost:3000/api/movie?limit=10)
// - 성공 : limit 수만큼 movie 객체를 담은 결과를 리턴 (200: OK)
// - 실패 : limit가 숫자형이 아닐 경우 400 응답 (400: Bad Request)
const list = (req, res) => {
    let limit = req.query.limit || 10;    // type: string, 아무숫자도 넣지 않았을 때: 10
    limit = parseInt(limit, 10);        // type: number

    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    /*
    MovieModel.find((err, result) => {
        if (err) return res.status(500).end();
        res.json(result);
    }).limit(limit);
    */
    
    MovieModel.find((err, result) => {
        if (err) return res.status(500).end();
        //res.json(result);
        res.render("movie/list", { result });
    }).limit(limit).sort({ created: -1 });
};

// 상세조회 (localhost:3000/api/movie/:id)
// - 성공 : id에 해당하는 movie 객체 리턴 (200: OK)
// - 실패 : 유효한 id가 아닐 경우 400 응답 (400: Bad Request)
//          해당하는 id가 없는 경우 404 응답 (404: Not Found)
const detail = (req, res) => {
    const id = req.params.id;

    MovieModel.findById(id, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        //res.json(result);
        res.render("movie/detail", { result });
    });
};

// 등록 (localhost:3000/api/movie)
// - 성공 : 입력값으로 movie 객체를 생성 후 배열에 추가 (201: Created)
// - 실패 : singer, title 값 누락 시 400 응답 (400: Bad Request)
const create = (req, res) => {
    const { title, director, year } = req.body;
    if (!director || !title||!year) return res.status(400).end();
    
    // 1. Model -> Document
/*    const movie = new MovieModel({ director, title, year });
    movie.save((err, result) => {
        if (err) return res.status(500).end();
        res.status(201).json(result);
    });
*/
    
    // 2. Model
    MovieModel.create({ title, director, year }, (err, result) => {
        if (err) return res.status(500).end();
        res.status(201).json(result);
    });
};

// 수정 (localhost:3000/api/movie/:id)
// - 성공 : id에 해당하는 객체의 정보를 수정 후 반환 (200: OK)
// - 실패 : id가 유효하지 않는 경우 400 응답 (400: Bad Request)
//          해당하는 id가 없는 경우 404 응답 (404: Not Found)
const update = (req, res) => {
    const id = req.params.id;

    /*
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    */

    const { title, director, year } = req.body;

    MovieModel.findByIdAndUpdate(id, { title, director, year }, { new: true },
        (err, result) => {
            if (err) return res.status(500).send("수정 시 오류가 발생했습니다.");
            if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
            res.json(result);
        });
};

// 삭제 (localhost:3000/api/movie/{id})
// - 성공 : id에 해당하는 movie 객체 삭제 후 배열 리턴 (200: OK)
// - 실패 : id가 유효하지 않는 경우 400 응답 (400: Bad Request)
//          해당하는 id가 없는 경우 404 응답 (404: Not Found)
const remove = (req, res) => {
    const id = req.params.id;
    
    /*
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    */

    MovieModel.findByIdAndRemove(id, (err, result) => {
        if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
        if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
        res.json(result);
    });
};

const showCreatePage = (req, res) => {
    res.render("movie/create");
};

const showUpdatePage = (req, res) => {
    const id = req.params.id;

    MovieModel.findById(id, (err, result) => {
        if (err) return res.status(500).send("조회 시 오류가 발생했습니다.");
        if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
        res.render("movie/update", { result });     
    });
};

module.exports = { list, detail, create, update, remove, checkId, showCreatePage, showUpdatePage };
