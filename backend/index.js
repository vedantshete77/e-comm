const express=require ('express');
const cors =require("cors");
require('./db/config');
const User =require("./db/Users");
const Jwt=require('jsonwebtoken');
const jwtKey='e-comm';
const Product = require("./db/Product");
const app=express();

app.use(express.json());
app.use(cors());

app.post("/register",async(req,res)=>{
    let user =new User(req.body);
    let result=await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
});

app.post("/login", async(req,res)=>{
    if(req.body.password&&req.body.email){
        let user =await User.findOne(req.body).select("-password");
        if(user){
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send("Something went wrong")
                }
                res.send({user})
            })

        }else{
            res.send({result:"No User Found"})
        }
    }else{
        res.send("Please provide email and password")
    }
    
});

app.post("/add-product", async(req,res)=>{
    let product=new Product(req.body);
    let result= await product.save();
    res.send(result)
})

app.get("/products",async (req,res)=>{
    let products=await Product.find(); 
    if(products.length>0){
        res.send(products)
    }else{
        res.send({result:"no data found"})
    }
})

app.delete('/product/:id',async (req,res)=>{
    let result=await Product.deleteOne({_id:req.params.id})
    res.send(result)
    
})

app.get('/product/:id',async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send('No such product is available')
    }
})

app.put("/product/:id",async (req,res)=>{
    let result = await Product.updateOne(
        {_id : req.params.id} ,
        { $set: req.body });
    res.send(result)
})

app.get("/search/:key",async (req,res)=>{
    let result= await Product.find(
        {
            "$or":[
                {name:{$regex:new RegExp(req.params.key,'i')}},
                {category:{$regex:new RegExp(req.params.key,'i')}},
                {company:{$regex:new RegExp(req.params.key,'i')}}
            ]
        }
    )
    res.send(result);
})


console.log("Working")
app.listen(8080);