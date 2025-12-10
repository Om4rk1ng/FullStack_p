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
    const { _userLoginEmail, _userLoginPassword } = req.body;

    const user = await User_model.findOne({ Email: _userLoginEmail });

    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    const pwd_match = await bcrypt.compare(_userLoginPassword, user.Password);

    if (!pwd_match) {
      return res.json({ status: false, message: "Invalid email or password" });
    }

    // success
    return res.json({
      status: true,
      message: "Login successful",
      name: user.name,
      email: user.Email,
      userId: user._id,
      profileImage: user.profileImage || "",
      gender: user.gender || "",                     // 👈 NEW
      specialization: user.specialization || ""      // 👈 NEW
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});


app.post("/register", async (req, res) => {
  try {
    const { 
      _username, 
      _email, 
      _password, 
      _profileImage,
      _gender,            
      _specialization     
    } = req.body;

    const existingUser = await User_model.findOne({ Email: _email });

    if (existingUser) {
      return res.json({
        status: false,
        message: "User already exists"
      });
    }

    const hash_password = await bcrypt.hash(_password, 10);

    await User_model.create({
      name: _username,
      Email: _email,
      Password: hash_password,
      profileImage: _profileImage || "",
      gender: _gender || "",                 
      specialization: _specialization || ""  
    });

    return res.json({
      status: true,
      message: "Registration successful"
    });

  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "Server error" });
  }
});



app.get("/showAllTasks",async(req,res)=>{

const getTaskData=await Task_model.aggregate([
{
$lookup:{
  from: "userstable",
  localField:"userTaskEmail",
  foreignField:"Email",
  as:"UserTasks"
}

},
{
$sort:{
  duedate:-1 //show latest tasks
}},


// {
// "$project":{
//   "USerTasks.userTaskEmail":0,
  
// }}





])


res.send(getTaskData)
console.log(getTaskData)

})

app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User_model.findOne({ Email: email });
    //for only checking IF user with that email exist

    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await User_model.updateOne({ Email: email }, { Password: hashed });

    res.json({ status: true, message: "Password updated successfully" });

  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Server error" });
  }
});

// Update profile
app.put("/update-profile", async (req, res) => {
  const { userId, name, profileImage } = req.body;

  try {
    const updated = await User_model.findByIdAndUpdate(
      userId,
      { name, profileImage },
      { new: true }
    );

    if (!updated)  {

      //this part not needed
      return res.json({ status: false, message: "User not found" });
    }

    res.json({ status: true, message: "Profile updated successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Server error" });
  }
});

// Delete account
app.delete("/delete-account/:id", async (req, res) => {
  try {
    const deleted = await User_model.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.json({ status: false, message: "User not found" });
    }

    res.json({ status: true, message: "Account deleted successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Server error" });
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
import Task_model from "./Models/tasks.js"; // make sure correct path

// Create a task
app.post("/addtask", async (req, res) => {
    try {
        const { tasktitle, description, duedate, lon, lat } = req.body;

        if (!tasktitle || !description || !duedate) {
            return res.json({ message: "All fields required" });
        }

        const newTask = await Task_model.create({
            tasktitle,
            description,
            duedate,
            lon,
            lat
        });

        return res.json({ status: true, task: newTask });
    } catch (err) {
        console.log(err);
        res.json({ message: "Server error" });
    }
});

// Get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task_model.find({});
        res.json({ status: true, tasks });
    } catch (err) {
        res.json({ status: false, message: "Error fetching tasks" });
    }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
    try {
        await Task_model.findByIdAndDelete(req.params.id);
        res.json({ status: true });
    } catch (err) {
        res.json({ status: false });
    }
});

// Update task
app.put("/tasks/:id", async (req, res) => {
    try {
        const updated = await Task_model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ status: true, task: updated });
    } catch (err) {
        res.json({ status: false });
    }
});

app.listen(7500, () => {
    console.log('server connected at port 7500 ...')
})