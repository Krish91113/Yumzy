import jwt from "jsonwebtoken";

const genTokens =async (userId) =>{
    try {
        const token =await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: '10d'});
        return token
    } catch (error) {
        
    }
}
export default genTokens;   