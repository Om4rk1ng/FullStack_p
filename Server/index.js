import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User_model from './Models/users.js';
import bcrypt from 'bcrypt';



const app = express();
app.use(cors());

app.use(express.json());



try {
    const conStr = 'mongodb+srv://admin:admin123@fullstack.5m4vetd.mongodb.net/users';
    mongoose.connect(conStr);
    console.log('database is connected!!')
}
catch (error) {
    console.log(error);
}

app.post('/login', async (req, res) => {

    try {
        const user = await User_model.findOne({ Email: req.body._userLoginEmail });

        if (!user) {
            res.json({ message: "User not found" });
        }

        const pwd_match = await bcrypt.compare(req.body._userLoginPassword, user.Password);

        if (!pwd_match) {
            res.json({ message: "Invalid email or password" });
        }

        res.json({ message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.json({ message: "Server error" });
    }
});


app.post("/register", async (req, res) => {
    try {

        const hash_password = await bcrypt.hash(req.body._password, 10);

        const user = await User_model.findOne({ Email: req.body._email });

        if (!user) {
            const new_user = {
                name: req.body._username,
                Email: req.body._email,
                Password: hash_password,
            };

            await User_model.create(new_user);
            res.json({});
        } else {
            res.status(500).json({ message: "User already exists..." });
        }
    } catch (error) {
        console.log(error)
    }
});


// app.get("/displayData",async(req,res)=>{

//     try{

//     const data=await User_model.find({}) //get all records

//     res.status(200).send(data) //data sent as response to user
//     }catch(err){
//         res.status(401).send("Error "+err)
//     }



// })

// app.delete("/deleteData/:delID",async(req,res)=>{


//     const findUserByIDAndDelete=await User_model.findByIdAndDelete(req.params.delID)

//     res.send(findUserByIDAndDelete) //Send filtered object to client

// })



//UPDATE data
// app.put("/update/:updateID",async(req,res)=>{


// try{
//     const hash_password=await bcrypt.hash(req.body.Password)

//     const findByIDAndUpdate=await User_model.findByIdAndUpdate(req.params.updateID,{
//         name:req.body.name,
//         Email:req.body.Email,
//         Password:hash_password
//     })

//     res.send(findByIDAndUpdate)


// }catch(err){

//     console.log("Error "+err)
// }


// })

app.listen(7500, () => {
    console.log('server connected at port 7500 ...')
})