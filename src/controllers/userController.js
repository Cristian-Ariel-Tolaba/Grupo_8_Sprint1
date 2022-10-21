const db = require('../database/models');

//const {loadUsers, storeUsers} = require('../data/usersModule');

const {validationResult} = require('express-validator');

const bcryptjs = require('bcryptjs');


module.exports = {
    login : (req, res) => {

        db.User.findAll()
            .then(()=>{
                return res.render('login',{
                    title: 'Login', 
                    stylesheets: 'login.css'
                })
            })
            .catch(error=> console.log(error))
    },

    //consultar
    processLogin : (req,res) => {

        /* let errors = validationResult(req);
        if(errors.isEmpty()){
        let {id, firstname, username, rolId, avatar} = loadUsers().find(user => user.email === req.body.email);

        req.session.userLogin = {
            id,
            firstname,
            username,
            rolId,
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
        } */

        let { firstname, rolId, avatar} =
            db.User.findByPk(req.params.id)
                .then((user) => {
                    console.log(user)

                    req.session.userLogin = {                       
                        firstname,                       
                        rolId,
                        avatar           
                    };
            
                    if(req.body.recordame){
                        res.cookie('vinoysefue16', req.session.userLogin,{
                            maxAge: 1000 * 60
                        })
                    }

                    res.redirect('/')
                })
                .catch(error => console.log(error))
        
    },

    register : (req, res) => {

            db.Rol.findAll({
                attributes: ['id','name'],
                order: ['name']
            })
                .then(roles=>{
                    return res.render('register',{
                        roles
                    })
                })
                .catch(error=>console.log(error))
    },
  
    //consultar
    processRegister : (req,res) => {

     /*    let errors = validationResult(req);
        if(errors.isEmpty()){
            const {firstname, lastname, email, password} = req.body;
            const users = loadUsers();
            const newUser = {
                id: (users[users.length -1].id) + 1,
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                password: bcryptjs.hashSync(password,12),
                rolId : rol.id,
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
       */
       
        const {firstname, lastname, rolId,email, password} = req.body;

        db.User.create({

                rolId,
                firstname: firstname.trim(),           
                lastname: lastname.trim(),  
                email: email.trim(),
                password: bcryptjs.hashSync(password,12),
                avatar: req.file ? req.file.filename : 'default-user.png'
                
            })
            .then(user => {
                console.log(user)
                return res.redirect('/users/login')
            })
                
            .catch(error=>console.log(error))
           
    },

    passwordReset : (req, res) => {
       
        db.User.findAll()
            .then(()=>{
                return res.render('passwordReset',{
                    title : 'PasswordReset',
                    stylesheets: 'passwordReset.css'
                })
            })
            .catch(error=> console.log(error))
    },

    profile : (req, res) => {

       /*  let user = loadUsers().find(user => user.id === req.session.userLogin.id)
        return res.render('profile',{
            title : 'Mi perfil',
            user
        }) */
        
            let roles = db.Rol.findAll({
                attributes: ['id', 'name'],
                order: ['name']
            });

            let user = db.User.findByPk(req.params.id,{
                include: [{association: 'rol'}]
            });
    
            Promise.all([roles, user])
                .then(([roles, user])=>{
                    return res.render('profile',{
                        title : 'Mi perfil', roles, user
                    })
                })
                .catch(error => console.log(error));
  
    },

    updateProfile : (req, res) => {
        const {firstname, lastname, rolId,email, password} = req.body;
        db.User.update(

            {
                rolId,
                firstname: firstname.trim(),           
                lastname: lastname.trim(),  
                email: email.trim(),
                password: bcryptjs.hashSync(password,12),
                avatar: req.file ? req.file.filename : 'default-user.png'

            },
            {
                where: {id: req.params.id}
            }
        )
        .then(()=> res.redirect('/'))
        .catch(error => console.log(error))
    },

    logout : (req, res) => {
    
         db.User.findAll()
            .then(()=>{
                req.session.destroy();
                res.cookie('vinoysefue16', null,{maxAge: -1});
                return res.redirect('/')
            })
            .catch(error=> console.log(error))
    }

};
