module.exports = {
    login : (req, res) => {
        return res.render('login', {
            title : 'Login',
            stylesheets: 'login.css'
        })
    },
    register : (req, res) => {
        return res.render('register', {
            title : 'Register',
            stylesheets: 'register.css'
        })
    },
    passwordReset : (req, res) => {
        return res.render('passwordReset', {
            title : 'PasswordReset',
            stylesheets: 'passwordReset.css'

        })
    },

}