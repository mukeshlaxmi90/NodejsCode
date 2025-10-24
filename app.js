const express = require('express');
const session = require('express-session');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const http = require('http');
const { Server }= require('socket.io');
const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');
const entryRoutes = require('./routes/entryRoutes');
const viewRoutes = require('./routes/viewRoutes');
const locationRoutes =require('./routes/locationRoutes');
const dataiRoutes = require('./routes/datainsert');
const SIPCal = require('./routes/SIPCalRoutes');
const SImCal = require('./routes/SimpleintRoutes');

const { console } = require('inspector');

const app = express();
const server = http.createServer(app);   // 🚀 Express को http server में wrap किया
const io = new Server(server);           // 🚀 Socket.io attach किया

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000}, // 1 min
  })
);
// 🔒 Disable cache globally (moved UP)
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // now every EJS view has access to `user`
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
app.use('/page', dataiRoutes); 
app.use('/page', SIPCal);
app.use('/page', SImCal);

// Index / dashboard route

//Submit ke liye route hai ye
app.use('/users', entryRoutes);
app.use("/api", locationRoutes );
app.use("/api",dataiRoutes);


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
// ------------------ SOCKET.IO ------------------
let activeUsers = 0;

io.on("connection", (socket) => {
  activeUsers++;
  io.emit("updateUsers", activeUsers); // सभी clients को भेजा
 console.log("activq",activeUsers)
  socket.on("disconnect", () => {
    activeUsers--;
    io.emit("updateUsers", activeUsers);
    console.log("activ",activeUsers)
  });

});

//app.listen(5000, () => console.log('Server running on port 5000'));
server.listen(5000, () => console.log('Server + Socket.io running on port 5000'));