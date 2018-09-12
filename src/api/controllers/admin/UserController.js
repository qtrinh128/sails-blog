module.exports = {
    home: async function(req, res){
        return res.view('pages/admin/user', {layout: 'layouts/admin/main'});
    }
}