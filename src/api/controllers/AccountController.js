const BCYRPT = require('bcrypt');
const JOI = require('JOI');
module.exports = {
  register: async function (req, res) {
    let notices = [];
    if (req.method === 'POST') {
      let schema = {
        name: JOI.string().min(3).max(25).label(" user name"),
        email: JOI.string().email({
          minDomainAtoms: 2
        }),
        password: JOI.any()

      }
      let data = {
        name: req.param('name'),
        email: req.param('email'),
        password: req.param('password'),
      }
      const {
        error,
        value
      } = JOI.validate(data, schema);
      if (error) {
        let errorResult = error.details;
        _.each(errorResult, function(error){
          notices.push({message: error.message});
        });
      } else {
        let rePassword = req.param('rePassword');
        let code = req.param('code');
        let email = value.email.toLowerCase();
        let checkExists = await Account.findOne({
          email: email
        });
        if (checkExists) {
          notices.push({
            message: 'Email đăng ký, vui lòng sử dụng email khác'
          });
          return res.view('pages/home/register', {
            layout: 'layouts/home/main',
            notices: notices
          });

        } else if (rePassword != value.password) {
          notices.push({
            message: 'Mật khẩu không trùng khớp'
          });
          return res.view('pages/home/register', {
            layout: 'layouts/home/main',
            notices: notices
          });
        } else if (code != '123123') {

          notices.push({
            message: 'Mã đăng ký không đúng'
          });
          return res.view('pages/home/register', {
            layout: 'layouts/home/main',
            notices: notices
          });
        } else {
          let hash = BCYRPT.hashSync(value.password, 10);
          await Account.create({
            name: value.name,
            email: value.email,
            password: hash
          });
          notices.push({
            message: 'Đăng ký thành công'
          });
          return res.view('pages/home/login', {
            layout: 'layouts/home/main',
            notices: notices
          });
        }
      }
    }
    return res.view('pages/home/register', {
      layout: 'layouts/home/main',
      notices: notices
    });
  },
  login: async function(req, res){
    let notices = [];
    if(req.method === 'POST'){
      let schema = {
        email: JOI.string().required().label('Email '),
        password: JOI.string().required().label('password')
      }
      let data = {
        email: req.param('email'),
        password: req.param('password')
      }
      const {error, value} = JOI.validate(data, schema);
      if(error){
        let errorResult = error.details;
        _.each(errorResult, function(error){
          notices.push({message: error.message});
        });
      }else{
        let email = value.email.toLowerCase();
        let checkAccount = await Account.findOne({email: email});
        if(!checkAccount){
          notices.push({message: 'Invalid Email or password.'});
        }else{
          if(!checkAccount.isActive){
            notices.push({message: 'The account has been disable.'});
          }else{
            let verifyPassword = BCYRPT.compareSync(value.password, checkAccount.password);
            if(!verifyPassword){
              notices.push({message: 'Wrong pass.'});
            }else{
              req.session.account = checkAccount;
              const URL = sails.getUrlFor('admin/AdminController.home');
              return res.redirect(URL);
            }
          }
        }
      }
    }
    return res.view('pages/home/login', {layout: 'layouts/home/main', notices: notices})
  },
  logout: function(req, res){
    if(req.session.account){
      delete req.session.account;
    }
    const URL = sails.getUrlFor('AccountController.login');
    return res.redirect(URL);
  }
}