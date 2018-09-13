module.exports = {
    home: function(req, res){
        let notices = [];
        notices.push({message: 'Login success.'});
        return res.view('pages/admin/home', {layout: 'layouts/admin/main', notices: notices});
    }
}