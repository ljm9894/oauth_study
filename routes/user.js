const express = require('express');
const router = express.Router();
require('dotenv').config();

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const googleRedirectURI = process.env.GOOGLE_REDIRECT_URI
const googleSignupRedirectURI = process.env.GOOGLE_SIGNUP_REDIRECT_URI


router.get('/login', (req, res)=>{
    let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    url += `?client_id=${googleClientId}`

    url+=`&redirect_uri=${googleRedirectURI}`
    //로그인창에서 url를 누르면 redirect_uri로 이동시켜줌
    url+=`&response_type=code`
    //필수 옵션
    
    url+=`&scope=email profile`
    //구글에 등록된 유저 email, profile을 가져오겠다는 것을 명시.

    res.redirect(url);
    //이 완성된 url이 구글 계정을 선택하는 로그인 화면.
    
});
router.get('/login/redirect', (req,res)=>{
    const { code } = req.query;
    console.log(`code : ${code}`);
    res.send('ok');
});

router.get('/signup', (req,res)=>{
    let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    url+=`?client_id=${googleClientId}`
    url+=`&redirect_uri=${googleSignupRedirectURI}`
    url+=`&response_type=code`
    url+=`&scope=email profile`
    res.redirect(url);
})

router.get('/signup/redirect', (req,res)=>{
    const { code } = req.query;
    console.log(`code : ${code}`);
    res.send('ok success');
})
module.exports = router;