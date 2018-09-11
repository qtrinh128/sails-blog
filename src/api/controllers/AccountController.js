const bcyrpt = require('bcrypt');
const joi = require('joi');
module.exports = {
  register: async function (req, res) {
    let notices = [];
    if (req.method === 'POST') {
      let schema = {
        name: joi.string().min(3).max(25).label('user name'),
        email: joi.string().email({
          minDomainAtoms: 2
        }),
        password: joi.any()

      }
      let data = {
        name: req.param('name'),
        email: req.param('email'),
        password: req.param('password'),
      }
      const {
        error,
        value
      } = joi.validate(data, schema);
      if (error) {
        let noticeResult = error.details;
        for (let i = 0; i < noticeResult.length; i++) {
          notices.push({
            message: noticeResult[i].message
          });
        }
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
          let hash = bcyrpt.hashSync(value.password, 10);
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
  }
}