import { User, users } from ".."
import { compareHash, hash } from "./hash";

export const encrypt = async (user: User) => {
    let dateNow = JSON.stringify(new Date())
    const hashed = hash(`Logged in ${dateNow}`, JSON.stringify(user.id))
    let currentUser = user.id;
    users.remove(currentUser);
    user.latestLoginDate = dateNow
    users.insert(currentUser, user)
    return hashed
};

export const validate = (token: string, user: User) => {
    return compareHash(`Logged in ${user.latestLoginDate}`, token, JSON.stringify(user.id))
}