module.exports = {
    home: async function(req, res){
        let listUser = await Account.find();
        return res.view('pages/admin/ListUser', {layout: 'layouts/admin/main', listUser: listUser});
    },
    delete: async function(req, res){
        let id = req.param('id');
        await Account.destroy({id: id});
        return res.send(id);
    }
}