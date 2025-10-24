exports.showsimpview = (req, res) => {
    // Simply render the EJS page
    res.render("Calculation/Simpleintrest",{
        layout: 'layout', 
        title: 'sip'
          
    });
};
