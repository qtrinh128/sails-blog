module.exports = {
    home: async function(req, res){
        let listPost = await Post.find();
        return res.view('pages/admin/ListPost', {layout: 'layouts/admin/main', listPost: listPost});
    },
    add: function(req, res){
        if(req.method === 'POST'){
            
        }
        return res.view('pages/admin/AddPost', {layout: 'layouts/admin/main'});
    }
}