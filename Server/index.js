import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User_model from './Models/users.js';
import bcrypt from 'bcrypt';



const app = express();
app.use(cors());

app.use(express.json());



try {
    const conStr = 'mongodb+srv://admin:admin123@fullstack.5m4vetd.mongodb.net/users?appName=FullStack';
    mongoose.connect(conStr);
    console.log('database is jonnected')
}
catch (error) {
    console.log(error);
}



app.post('/login', async (req, res) => {

    try {
        const user = await User_model.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const pwd_match = await bcrypt.compare(req.body.password, user.password);

        if (!pwd_match) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ user: user, message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


app.post("/register", async (req, res) => {
    try {

        const {name, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const user = await User_model.findOne({ email: email });

        if (!user) {
            const new_user = new User_model({
                name: name,
                email: email,
                password: hash_password,
            });

            await new_user.save();
            res.send({ message: "User Added..." });
        } else {
            res.status(500).json({ message: "User already exists..." });
        }
    } catch (error) {
        res.send(error);
    }
});


app.listen(5000, () => {
    console.log('server connected at port 5000 ...')
})