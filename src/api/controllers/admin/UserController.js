module.exports = {
    home: async function(req, res){
        let listUser = await Account.find();
        return res.view('pages/admin/ListUser', {layout: 'layouts/admin/main', listUser: listUser});
    },
    checkNumberUser: async function(req, res){
        let account = await Account.find();
        let numberAccount = account.length;
        if(numberAccount === 0){
            const URL = sails.getUrlFor('AccountController.logout');
            return res.send(URL);
        }
        return null;
    }
    ,
    delete: async function(req, res){
        let id = req.param('id');
        await Account.destroy({id: id});
        return res.send(id);
    }
}