module.exports = {
    home: function(req, res){
        return res.view('pages/homepage', {layout: 'layouts/home/main'});
    }
}