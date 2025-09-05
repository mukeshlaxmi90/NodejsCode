const  userService  = require('../services/entryService');

exports.showEntryForm = (req, res) => {
     res.render('UserView/Entryform', { layout: false });
};

exports.saveUser = async (req, res) => {
     const currentPage = req.session.currentPage;
    console.log('Controller hit');
    console.log("Request body:", req.body);
    try {
        const { name, dob, age,phone, gender, address, email } = req.body;        
        const result = await userService.saveUserData(name, dob, age, phone, gender, address, email);
        console.log('After insert, result:', result);       
        // या अगर किसी specific route पर जाना है, तो:/ Success hone ke baad redirect:                      
           console.log("page se");
          res.render('UserView/Entryform', { layout: 'layout',  success: true, message: 'Data saved successfully!' });         
        /* return res.json({
            success: true,
            message: 'Data saved successfully',
            data: result
        });*/
    } catch (err) {
        console.error("DB Error:", err);
        //return res.status(500).json({ success: false, message: 'Error saving data' });
       return res.render('UserView/Entryform', { layout: 'layout', success: false, message: 'Error saving data' });
    }
};