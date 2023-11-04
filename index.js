const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
require("dotenv").config();

const app = express();


const corsOption = {
  credentials: true,
  origin: ['https://www.slots-game.store']
}

app.use(express.json());
app.use(cors(corsOption));



app.post("/register", async (req, res) => {
  const { email, phone } = req.body;
  try {

    // const posiblePerson = await User.findOne({ email, phone });
    // if (posiblePerson) {
    //   return res.status(409).json({ message: "Failed" });
    // }

    if(phone){
      if(phone.startsWith("+380")){
        const newUser = await User.create({ phone});
        res.status(201).json({ message: "Success" });
      }else{
        const readyPhone = "+380" + phone;
        const newUser = await User.create( {phone:readyPhone});
        res.status(201).json({ message: "Success" });
      }
    }else{
      const newUser = await User.create( {email});
      res.status(201).json({ message: "Success" });
    }

  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

const start = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running. Use our API on port: ${process.env.PORT}`);
  });

  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection ERROR", err));
};

start();
