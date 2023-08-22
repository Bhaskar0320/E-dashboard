const express = require('express');
require("./db/config");
const cors = require('cors');
const User = require("./db/User");
const app = express();
const Product = require('./db/product');
const port = 5000;
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

//creating middleware to get data from postman to nodejs
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something Went Wrong, Please try After Some Time" })
        }
        res.send({ result, auth: token })
    });
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something Went Wrong, Please try After Some Time" })
                }
                res.send({ user, auth: token })
            })


        } else {
            res.send({ result: 'no user found' })
        }
    } else {
        res.send({ result: 'no user found' });
    }
})

app.post('/add-product', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products', async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No product found!" })
    }
})

app.delete('/product/:id', async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})
// if we are using same url then that should be used for two different method 
//eg: app.delete and app.get both have same url but diff method

app.get('/product/:id',  async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No Record Found" });
    }
})

app.put('/product/:id', async (req, res) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        })

    res.send(result);

})

app.get('/search/:key', async (req, res) => {
    const result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { catagory: { $regex: req.params.key } }
        ]
    })
    res.send(result);
})

// function varifyToken(req, res, next) {
//     let token = req.headers['authorization'];
//     if (token) {
//         token = token.split(' ')[1];
//         Jwt.verify(token, jwtKey, (err, valid) => {
//             if (err) {
//                 res.status(401).send({result: "Please provide valid token"})
//             } else {
//                 next();
//             }
//         })
//     } else {
//         res.status(403).send({result: "Please add token to header"})
//     }

//     next();
// }

app.listen(port, () => {
    console.log(`this app is listening at http://localhost:${port}`);
})