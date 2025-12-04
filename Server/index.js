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
        const user = await User_model.findOne({ Email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const pwd_match = await bcrypt.compare(req.body.password, user.Password);

        if (!pwd_match) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ user: user, message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});


app.post("/register", async (req, res) => {
    try {

        const {name, Email, Password } = req.body; //Issue was here. FOR NOW, leave it
        const hash_password = await bcrypt.hash(Password, 10);

        const user = await User_model.findOne({ Email: Email });

        if (!user) {
            const new_user = new User_model({
                name: name,
                Email: Email,
                Password: hash_password,
            });

            await User_model.create(new_user);
            res.send({message:"user Added!!"});
        } else {
            res.status(500).json({ message: "User already exists..." });
        }
    } catch (error) {
        res.send(error);
    }
});


app.get("/displayData",async(req,res)=>{

    try{

    const data=await User_model.find({}) //get all records
    
    res.status(200).send(data) //data sent as response to user
    }catch(err){
        res.status(401).send("Error "+err)
    }



})


app.delete("/deleteData/:delID",async(req,res)=>{


    const findUserByIDAndDelete=await User_model.findByIdAndDelete(req.params.delID)

    res.send(findUserByIDAndDelete) //Send filtered object to client

})



//update data
app.put("/update/:updateID",async(req,res)=>{


try{
    const hash_password=await bcrypt.hash(req.body.Password)

    const findByIDAndUpdate=await User_model.findByIdAndUpdate(req.params.updateID,{
        name:req.body.name,
        Email:req.body.Email,
        Password:hash_password
    })

    res.send(findByIDAndUpdate)


}catch(err){

    console.log("Error "+err)
}


})

app.listen(5000, () => {
    console.log('server connected at port 5000 ...')
})