// controllers/authController.js

exports.showLogin = (req, res) => {
    // error variable ko har time pass karo, default null
    res.render('login', {  error: null, user: null,layout: false});
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;

     if(username === "admin" && password === ""){
        req.session.user = { name: username };
        console.log("admin",req.session.user);
        return res.redirect('/index'); // ya /dashboard       
    } else {
        // agar wrong credentials → error pass
        return res.render('login', { error: 'Invalid credentials',layout: false  });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
