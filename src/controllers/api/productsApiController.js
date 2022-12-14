const db = require("../../database/models");
const { literal } = require("sequelize");
const path = require("path");
const {unlinkSync} = require('fs');

module.exports = {
    all: async (req, res) => {
        try {
            let products = await db.Product.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                    include: [
                        [
                            literal(
                                `CONCAT('${req.protocol}://${req.get("host")}${req.baseUrl
                                }/', id)`
                            ),
                            "detailUrl",
                        ],
                    ],
                },
            });

            if (products) {
                return res.status(200).json({
                    ok: true,
                    meta: {
                        totalProducts: products.length,
                    },
                    data: products,
                });
            }
            throw new Error({
                ok: false,
                message: "Hubo un error",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: error.message
                    ? error.message
                    : "Si el problema persiste, comuníquese con el administrador del sitio",
            });
        }
    },

    detail: async (req, res) => {
        try {
            let options = {
                include: [
                    {
                        association: "images",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "deletedAt"],
                            include: [
                                [
                                    literal(
                                        `CONCAT('${req.protocol}://${req.get("host")}${req.baseUrl
                                        }/images/', file)`
                                    ),
                                    "fileUrl",
                                ],
                            ],
                        },
                    },
                    {
                        association: "category",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "deletedAt"],
                        },
                    },
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
            };
            const idProduct = req.params.id;

            if (isNaN(idProduct)) {
                return res.json(
                    "El parámetro es inválido, asegúrese de escribir correctamente"
                );
            }

            let product = await db.Product.findByPk(idProduct, options);

            if (!product) {
                return res.json("El producto solicitado no existe");
            }
            return res.status(200).json({
                ok: true,
                meta: {
                    total: 1,
                },
                data: product,
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: error.message
                    ? error.message
                    : "Si el problema persiste, comuníquese con el administrador del sitio",
            });
        }
    },
    images: (req, res) => {
        res.sendFile(
            path.join(__dirname, `../../../public/images/${req.params.image}`)
        );
    },
    last: async (req, res) => {
        try {
            let product = await db.Product.findOne({
                attributes: {
                    exclude: ["price", "discount", "updatedAt", "deletedAt"],
                },
                include: [
                    {
                        association: "images",
                        attributes: {
                            exclude: [
                                "createdAt",
                                "file",
                                "id",
                                "productId",
                                "updatedAt",
                                "deletedAt",
                            ],
                            include: [
                                [
                                    literal(
                                        `CONCAT('${req.protocol}://${req.get("host")}${req.baseUrl
                                        }/images/', file)`
                                    ),
                                    "fileUrl",
                                ],
                            ],
                        },
                    },
                ],
                limit: 1,
                order: [["createdAt", "DESC"]],
            });

            if (product) {
                return res.status(200).json({
                    ok: true,
                    data: product,
                });
            }
            throw new Error({
                ok: false,
                message: "Hubo un error",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: error.message
                    ? error.message
                    : "Si el problema persiste, comuníquese con el administrador del sitio",
            });
        }
    },
    store: async (req, res) => {
       
        try {
            const { name, price, discount, description, category } = req.body;

            const product = await db.Product.create({
                name: name?.trim(),
                price: +price,
                discount: +discount,
                categoryId: +category,
                description: description?.trim(),
            });
         
            if (req.file) {
                
                await db.Image.create({
                    productId : product.id,
                    file : req.file.filename
                })
            }

            await product.reload({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                    include: [
                        [
                            literal(
                                `CONCAT('${req.protocol}://${req.get("host")}${req.baseUrl
                                }/', id)`
                            ),
                            "detailUrl",
                        ],
                    ],
                },
            });

            return res.status(201).json({
                ok: true,
                data: product,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: error.message
                    ? error.message
                    : "Si el problema persiste, comuníquese con el administrador del sitio",
            });
        }
    },
    update: async (req, res) => {
        const { name, price, discount, description, categoryId } = req.body;
        const { id } = req.params; /* id product */
        try {
          const product = await db.Product.findByPk(id, {
            include: [
              {
                association: "images",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
              },
              {
                association: "category",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
              },
            ],
          });
    
          product.name = name?.trim() || product.name;
          product.price = +price || product.price;
          product.discount = +discount || product.discount;
          product.description = description?.trim() || product.description;
          product.categoryId = +categoryId || product.categoryId;
    
          await product.save();
    
          if (req.files && req.files.length) {
            product.images.forEach(async (img) => {
                await img.destroy();
                unlinkSync(
                  path.join(__dirname, `../../public/images/${img.file}`)
                );
              });
            const images = req.files.map((file) => {
              return {
                file: file.filename,
                productId: product.id,
              };
            });
    
            await db.Image.bulkCreate(images);
          }
    
          res.status(200).json({
            ok: true,
            status: 200,
            data: await product.reload(),
            /* url: `${req.protocol}://${req.get("host")}/products/${product.id}`, */
          });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: error.message
                    ? error.message
                    : "Si el problema persiste, comuníquese con el administrador del sitio",
            });
        }
      },
      destroy: async (req, res) => {
        const { id } = req.params; /* product id */
        try {
        
          const options = {
            include: [
              {
                association: "images",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
              },
              {
                association: "category",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
              },
            ],
          }
          const product = await db.Product.findByPk(id,options );
    
          product.images.forEach(async (img) => {
            await img.destroy();
            unlinkSync(
              path.join(__dirname, `../../../public/images/${img.file}`)
              );
            });
            await product.destroy()
            
          res.status(200).json({
            ok:true,
            status:200,
            data : {
                id
            },
            msg:'Producto eliminado con éxito'
          })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: error.message
                    ? error.message
                    : "Si el problema persiste, comuníquese con el administrador del sitio",
            });
        }
      },
};
