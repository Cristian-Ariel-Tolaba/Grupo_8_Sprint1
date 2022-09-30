const {loadUsers, storeUsers} = require('../data/usersModule');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');


module.exports = {
    login : (req, res) => {
        return res.render('login', {
            title: 'Login',
            stylesheets: 'login.css'
        })
    },

    processLogin : (req,res) => {

        let errors = validationResult(req);
        if(errors.isEmpty()){
        let {id, firstname, username, rol, avatar} = loadUsers().find(user => user.email === req.body.email);

        req.session.userLogin = {
            id,
            firstname,
            username,
            rol,
            avatar           
        };

        if(req.body.recordame){
            res.cookie('vinoysefue16', req.session.userLogin,{
                maxAge: 1000 * 60
            })
        }

            return res.redirect('/') //users/profile
        }else {
            return res.render('login',{
                errors: errors.mapped()
               
            })
        }
    },

    register : (req, res) => {
        return res.render('register')
    },

    processRegister : (req,res) => {

        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {firstname, lastname, username, email, password} = req.body;
            const users = loadUsers();
            const newUser = {
                id: (users[users.length -1].id) + 1,
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                username: username.trim(),
                email: email.trim(),
                password: bcryptjs.hashSync(password,12),
                rol : 'user',
                avatar: req.file ? req.file.filename : 'default-user.png'
                        
            }
    
            const usersModify = [...users, newUser];
    
            storeUsers(usersModify);
            return res.redirect('/users/login');

        }else{
            return res.render('register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
      
    },


    passwordReset : (req, res) => {
        return res.render('passwordReset', {
            title : 'PasswordReset',
            stylesheets: 'passwordReset.css'

        })
    },

    profile : (req, res) => {

        let user = loadUsers().find(user => user.id === req.session.userLogin.id)
        return res.render('profile',{
            title : 'Mi perfil',
            user
        })
    },

    logout : (req, res) => {
         req.session.destroy();
         res.cookie('vinoysefue16', null,{maxAge: -1});
         return res.redirect('/')
    }

}