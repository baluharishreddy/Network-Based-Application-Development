//controller for home
exports.home = (req, res) => {
    res.render('index');

}

//controller for about
exports.about = (req, res) => {
    res.render('about');

}


//controller for contact
exports.contact = (req, res) => {
    res.render('contact');

}