//const express = require("express");
//const router = express.Router();
// 비구조화 할당
const { Router } = require("express");      // express.Router()
const router = Router();

// 목록조회
// localhost:3000/music
router.get("/", (req, res) => {
    res.send("music list");
});

// 상세조회
// localhost:3000/music/10
router.get("/:id", (req, res) => {
    res.send(`music detail: ${req.params.id}`);
});

// 등록
router.post("/", (req, res) => {
    res.send("music create");
});

// 수정
router.put("/:id", (req, res) => {
    res.send(`music update: ${req.params.id}`);
});

// 삭제
router.delete("/:id", (req, res) => {
    res.send(`music delete: ${req.params.id}`);
});

module.exports = router;
