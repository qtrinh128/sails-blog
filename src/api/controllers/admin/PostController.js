module.exports = {
    home: async function(req, res){
        let listPost = await Post.find();
        return res.view('pages/admin/ListPost', {layout: 'layouts/admin/main', listPost: listPost});
    },
    add: async function(req, res){
        let listCategory = await Category.find();
        if(req.method === 'POST'){
            let data = {
                name: req.param('name'),
                des: req.param('des'),
                content: req.param('content'),
                tags: req.param('tags'),
                category: req.param('category')
            }
            await Post.create({name: data.name, description: data.des, content: data.content, tag: data.tags, owner: data.category});
            const URL = sails.getUrlFor('admin/PostController.home');
            return res.redirect(URL); 
        }
        return res.view('pages/admin/AddPost', {layout: 'layouts/admin/main', listCategory: listCategory});
    }
}