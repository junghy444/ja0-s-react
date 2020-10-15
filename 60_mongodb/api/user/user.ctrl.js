const UserModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const showSignupPage = (req, res) => {
    res.render("user/signup");
};

const showLoginPage = (req, res) => {
    res.render("user/login");
};

// 회원가입
// - 성공 : 201(Created) 응답, 생성된 User 객체 반환
// - 실패 : 필수 입력값 누락 (400 : Bad Request)
//          email이 중복된 경우 (409 : Conflict)
const signup = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).send("필수값이 입력되지 않았습니다.");
    
    UserModel.findOne({ email }, (err, result) => {
        if (err) return res.status(500).send("회원가입 시 오류가 발생했습니다.");
        if (result) return res.status(409).send("이미 사용중인 E-mail입니다.");

        // bcrypt: 단방향 해시 함수
        const saltRounds = 10;  // salt 자릿수
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) return res.status(500).send("암호화 시 오류가 발생했습니다.");

            const user = new UserModel({ name, email, password: hash });
            user.save((err, result) => {
                if (err) return res.status(500).send("회원가입 시 오류가 발생했습니다.");
                res.status(201).json(result);
            });
        });

    });
};

// 로그인
// - 성공 : email, password가 일치하면 성공 (200)
// - 실패 : 필수입력값이 미입력된 경우 (400: Bad Request)
//          가입되지 않은 email일 경우 (404: Not Found)
//          password가 일치하지 않는 경우 (500)
const login = (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.status(400).send("필수 값이 입력되지 않았습니다.");

    UserModel.findOne({ email }, (err, user) => {
        if (err) return res.status(500).send("사용자 조회 시 오류가 발생했습니다.");
        if (!user) return res.status(404).send("가입되지 않은 계정입니다.");
        
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send("로그인 시 오류가 발생했습니다.");
            if (!isMatch) return res.status(500).send("비밀번호가 올바르지 않습니다.");

            // 비밀번호 검증 성공 => signed 토큰 생성 발급 (jsonwebtoken)
            const token = jwt.sign(user._id.toHexString(), "secretKey");
            UserModel.findByIdAndUpdate(user._id, { token }, (err, result) => {
                if (err) return res.status(500).send("로그인 시 오류가 발생했습니다.");
                // 토큰 저장 : cookie, local storage...
                res.cookie("token", token, { httpOnly: true });
                res.json(result);
            });
        });
    });
};

// 인증 처리
const checkAuth = (req, res, next) => {
    // 모든 화면에서 공통으로 필요로 하는 데이터
    res.locals.user = null;

    // 쿠키로부터 토큰을 가져옴
    const token = req.cookies.token;

    if (!token) {
        // 정상적인 경우
        if (req.url === "/" || req.url === "/api/user/signup" || req.url === "/api/user/login")
            return next();
        else return res.render("user/login");
    }

    // 토큰 검증
    jwt.verify(token, "secretKey", (err, _id) => {
        if (err) {
            res.clearCookie("token");
            return res.render("user/login");
        }

        UserModel.findOne({ _id, token }, (err, user) => {
            if (err) return res.status(500).send("인증 시 오류가 발생했습니다.");
            if (!user) return res.render("user/login");
            res.locals.user = { name: user.name, role: user.role };
            next();
        });
    });
};

const logout = (req, res) => {
    // 쿠키에서 토큰 가져오기
    const token = req.cookies.token;
    if (!token) return res.render("user/login");
    
    jwt.verify(token, "secretKey", (err, _id) => {
        if (err) returnres.status(500).send("로그아웃 시 오류가 발생했습니다.");
        UserModel.findByIdAndUpdate(_id, { token: "" }, (err, result) => {
            if (err) return res.status(500).send("로그아웃 시 오류가 발생했습니다.");
            res.clearCookie("token");
            res.redirect("/");
        });
    });
};

module.exports = { showSignupPage, showLoginPage, signup, login , checkAuth, logout};