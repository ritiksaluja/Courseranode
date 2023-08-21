import express from "express"
import  Jwt  from "jsonwebtoken"
import UserData from "../DB/Userdata.js";


const router = express.Router();
let secretkey = "asdfg123"

export const signup = async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);
  try {
    UserData.map((obj)=>{
        if(!userName=="" && obj.userName!==userName && !password==""){
            UserData.push({userName:userName , password:password})
           return res.status(200).json({message : "user Created Sucessfully"})
        }
        else{
          return  res.status(500).json({message: "username already exists"})
        }
    })
    

   
  } catch (error) {
   
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const login =  async (req, res) => {
    const { userName, password } = req.body;
    console.log(req)
  
    try {
      const userCheck =  await UserData.map((obj)=>{
        if(obj.userName==userName && obj.password==password){
            const token = Jwt.sign({userName:obj.userName} , secretkey)
            return  res.status(200).json({ message: 'Login successful', token });
        }
        else{
            return   res.status(500).json({message: "invalid Credentials"})

        }
      })
      
  
     
    } catch (error) {
      
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  router.post('/signup', signup);
  router.post('/login', login);

export default router
  