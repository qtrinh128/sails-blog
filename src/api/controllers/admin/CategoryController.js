module.exports = {
    home: async function(req, res){
        let listCategory = await Category.find();
        return res.view('pages/admin/ListCategory', {layout: 'layouts/admin/main', listCategory: listCategory});
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
        return res.view('pages/admin/AddCategory', {layout: 'layouts/admin/main'});
    },
    details: async function(req, res){
        let id = req.param('id');
        console.log(id);
        let categorys = await Category.findOne({id: id}).populate('posts');
        console.log(categorys);
        return res.view('pages/admin/DetailsCategory', {layout: 'layouts/admin/main', categorys: categorys}); 
    } 
}