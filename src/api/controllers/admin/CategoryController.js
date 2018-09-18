module.exports = {
    home: async function(req, res){
        let listCategory = await Category.find();
        return res.view('pages/admin/list_category', {layout: 'layouts/admin/main', listCategory: listCategory});
    },
    add: async function(req, res){
        if(req.method === 'POST'){
            let data = {
                name: req.param('name'),
            }
            await Category.create({name: data.name});
            const URL = sails.getUrlFor('admin/CategoryController.home');
            return res.redirect(URL);
        }
        return res.view('pages/admin/add_category', {layout: 'layouts/admin/main'});
    },
    details: async function(req, res){
        let id = req.param('id');
        let categorys = await Category.findOne({id: id}).populate('posts');
        return res.view('pages/admin/details_category', {layout: 'layouts/admin/main', categorys: categorys}); 
    } 
}