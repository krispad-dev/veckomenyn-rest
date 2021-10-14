import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid';

export async function hashPassword(password) {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;

}

export async function compareHashed(password, passwordHash) {

    const passwordIsAMatch = await bcrypt.compare(password, passwordHash);
    return passwordIsAMatch;

}


export async function generateId(params) {

    const id = nanoid()
    console.log(id);
    
}




generateId()