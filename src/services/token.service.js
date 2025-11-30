import  jwt  from "jsonwebtoken";

export const generateToken = (data) => {
    return jwt.sign({     
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hora
        data: data 
        
    }, 'millavesereta123*-')
}