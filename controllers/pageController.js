
// Index / main dashboard (login ke baad)
exports.showIndex = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // agar login nahi hua → login page
    }
    res.render('index', {
        user: req.session.user,
        title: "Main Dashboard",
        layout: false // agar layout nahi chahiye index me
    });
};
// User dashboard (UDashboard)
exports.showUserDashboard = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // agar login nahi hua → login page
    }
    res.render('UserView/Dashboard', {
        user: req.session.user,
        title: "User Dashboard",
        layout: 'layout', // layout show karna chahiye
         pageKey: 'Dashboard'
    });
};
