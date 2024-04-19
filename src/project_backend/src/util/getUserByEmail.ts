import { users } from "..";

export const getUserByEmail = (email: string) => {
    let foundUser = null;
    let allUsers = users.values();
    for (let user of allUsers) {
        {
            if (user.email.toLowerCase() === email.toLowerCase()) {
                {
                    foundUser = user;
                    break;
                }
            }
        }
    }
    return foundUser;
}