const express = require('express');
const session = require('express-session');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');
const entryRoutes = require('./routes/entryRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));
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
app.get('/', (req, res) => res.redirect('/login'));

app.listen(5000, () => console.log('Server running on port 5000'));
