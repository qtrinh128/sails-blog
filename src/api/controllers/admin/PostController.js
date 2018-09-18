module.exports = {
    home: async function(req, res){
        let listPost = await Post.find();
        return res.view('pages/admin/list_post', {layout: 'layouts/admin/main', listPost: listPost});
    },
    add: async function(req, res){
        let listCategory = await Category.find();
        let listTag = await Tags.find();
        if(req.method === 'POST'){            
            let data = {
                name: req.param('name'),
                des: req.param('des'),
                content: req.param('content'),
                tags: req.param('tags'),
                category: req.param('category')
            }
            let post = await Post.create({name: data.name, description: data.des, content: data.content, owner: data.category}).fetch();
            let stringTag = data.tags;
            if(stringTag[stringTag.length - 1] === ','){
                stringTag = data.tags.slice(0, -1);
            }
            let arrTags = stringTag.split(",");
            for(let i = 0; i < arrTags.length; i++){
                let checkTag = await Tags.findOrCreate({name: arrTags[i]},{name: arrTags[i]});
                await Post.addToCollection(post.id, 'tag', checkTag.id);
            }
            const URL = sails.getUrlFor('admin/PostController.home');
            return res.redirect(URL); 
        }
        return res.view('pages/admin/add_post', {layout: 'layouts/admin/main', listCategory: listCategory, listTag: listTag});
    },
    deleteByAjax: async function(req, res){
        let id = req.param('id');
        await Post.destroy({id: id});
        return res.send(id);
    }
}