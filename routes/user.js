const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const googleRedirectURI = process.env.GOOGLE_REDIRECT_URI
const googleSignupRedirectURI = process.env.GOOGLE_SIGNUP_REDIRECT_URI
//google 토큰 발급을 위한 url
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
//email, google id 등의 정보를 가져오기 위한 url
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

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

router.get('/signup/redirect', async(req,res)=>{
    const { code } = req.query;
    console.log(`code : ${code}`);
    const resp = await axios.post(GOOGLE_TOKEN_URL, {
        code,
        client_id : googleClientId,
        client_secret : googleClientSecret,
        redirect_uri : googleSignupRedirectURI,
        grant_type : "authorization_code",
    });
    const resp2 = await axios.get(GOOGLE_USERINFO_URL,{
        headers : {
            Authorization : `Bearer ${resp.data.access_token}`
        },
    })
    res.json(resp2.data);
})
module.exports = router;