const express = require('express');
const session = require('express-session');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');
const entryRoutes = require('./routes/entryRoutes');
const viewRoutes = require('./routes/viewRoutes');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000}, // 1 min
  })
);
// 🔒 Disable cache globally (moved UP)
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
// VIEW ENGINE
// EJS + layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layout');
console.log("mid",expressLayouts);
// Root route
app.get('/', (req, res) => res.redirect('/login'));

// Routes
app.use(authRoutes);
app.use('/', pageRoutes);  // index/dashboard
app.use('/page', entryRoutes); // entry form
app.use('/page', viewRoutes); 
// Index / dashboard route

//Submit ke liye route hai ye
app.use('/users', entryRoutes);
// app.get('/index', (req, res) => { 
//     if (!req.session.user) {
//         return res.redirect('/login'); // agar login nahi hua → login page
//     }
//     const user = req.session.user;
//     console.log("us",user);
//     res.render('index', { user, title: "Dashboard" });
// });
// Root redirect

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid'); // session cookie clear
    res.redirect('/login');
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
