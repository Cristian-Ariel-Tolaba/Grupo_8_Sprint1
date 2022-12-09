const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  login: (req, res) => {
    return res.render("login", {
      title: "Login",
      stylesheets: "login.css",
    });
  },

  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email: req.body.email.trim(),
        },
      })
        .then((user) => {
          console.log(user);

          req.session.userLogin = {
            id: user.id,
            firstname: user.firstname,
            rolId: user.rolId,
            avatar: user.avatar,
          };

          if (req.body.recordame) {
            res.cookie("vinoysefue16", req.session.userLogin, {
              maxAge: 1000 * 60,
            });
          };

          db.Order.findOne({
            where: {
              userId: req.session.userLogin.id,
              statusId: 1,
            },
            include: [
              {
                association: "carts",
                attributes: ["id", "quantity"],
                include: [
                  {
                    association: "product",
                    attributes: ["id", "name", "price", "discount"],
                    include: ["images"],
                  },
                ],
              },
            ],
          }).then(order => {
          
            if(order){
              req.session.orderCart = {
                id: order.id,
                total: order.total,
                items: order.carts,
              };
            } else {
              db.Order.create({
                date: new Date(),
                total: 0,
                userId: req.session.userLogin.id,
                statusId: 1,
              })
                .then(order => {
                  req.session.orderCart = {
                    id: order.id,
                    total: order.total,
                    items: [],
                  };
                })
                
            }
            return res.redirect("/");
          }).catch(error => console.log(error));

        });
        
    } else {
      return res.render("login", {
        errors: errors.mapped(),
        title: "Login",
        stylesheets: "login.css",
      });
    }
  },

  register: (req, res) => {
    return res.render("register");
  },

  processRegister: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const { firstname, lastname, email, password } = req.body;

      db.User.create({
        rolId: 2,
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 12),
        avatar: req.file ? req.file.filename : "default-user.png",
      })
        .then((user) => {
          console.log(user);
          return res.redirect("/users/login");
        })

        .catch((error) => console.log(error));
    } else {
      return res.render("register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  profile: (req, res) => {
    db.User.findByPk(req.session.userLogin.id, {
      include: [{ association: "rol" }],
    })
      .then((user) => {
        return res.render("profile", {
          title: "Mi perfil",
          user,
        });
      })
      .catch((error) => console.log(error));
  },

  updateProfile: (req, res) => {
    let errors = validationResult(req);
    //return res.send(errors);
    if (errors.isEmpty()) {
      const { firstname, lastname } = req.body;

      db.User.update(
        {
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
        },
        {
          where: { id: req.session.userLogin.id },
        }
      )
        .then(() => {
          req.session.userLogin.firstname = firstname;
          if (req.file) {
            req.session.userLogin.avatar = req.file.filename;
          }
          res.locals.userLogin = req.session.userLogin;
          res.redirect("/");
        })
        .catch((error) => console.log(error));
    } else {
      db.User.findByPk(req.session.userLogin.id, {
        include: [{ association: "rol" }],
      })
        .then((user) => {
          return res.render("profile", {
            title: "Mi perfil",
            user,
            errors: errors.mapped(),
          });
        })
        .catch((error) => console.log(error));
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.cookie("vinoysefue16", null, { maxAge: -1 });
    return res.redirect("/");
  },
};
