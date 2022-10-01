import bcrypt from "bcryptjs";

const users=[{
    name:'Admin User',
    email:'admin@example.com',
    password: bcrypt.hashSync('123456',10),
    //password:'12345',
    isAdmin: true
},
{
    name:'John Doe',
    email:'johndoe@example.com',
    password: bcrypt.hashSync('123456',10),
    //password:'12345',
    
},
{
    name:'Jane Doe',
    email:'janedoe@example.com',
    password: bcrypt.hashSync('123456',10),
    //password:'12345'
    
}]

export default users