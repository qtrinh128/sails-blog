module.exports = {
    home: async function(req, res){
        let listTag = await Tags.find();
        return res.view('pages/admin/list_tag', {layout: 'layouts/admin/main', listTag: listTag});
    },
    add: async function(req, res){
        if(req.method === 'POST'){
            let data = {
                name: req.param('name'),
            }
            await Tags.create({name: data.name});
            const URL = sails.getUrlFor('admin/AdminController.home');
            return res.redirect(URL);
        }
        return res.view('pages/admin/add_tag', {layout: 'layouts/admin/main'});
    },
    delete: async function(req, res){
        let id = req.param('id');
        let tag = await Tags.destroy({id: id});
        return res.send(id); 
    }
}