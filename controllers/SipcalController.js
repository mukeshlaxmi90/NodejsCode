// Controller to render SIP Calculation page
exports.showsipview = (req, res) => {
    // Simply render the EJS page
    res.render("Calculation/SIPCalcuation",{
        layout: 'layout', 
        title: 'sip'
          
    });
};
