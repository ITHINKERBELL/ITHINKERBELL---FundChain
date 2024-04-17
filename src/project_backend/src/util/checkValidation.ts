import { users } from "../index"

export const checkEveryInputForSignup = async (username: string, email: string, password: string, type: string, dateString: string) => {
    if (!checkUsernameValidity(username)) {
        return { 'message': 'Username must only contains letters and numbers.', "httpCode": 400};
    }
    if (!checkEmailValidity(email)) {
        return { 'message': 'Invalid email address.', "httpCode": 400};
    }
    if (!checkPasswordValidity(password)) {
        return { 'message': 'Password must have at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.', "httpCode": 400};
    }
    if (!(await checkUsernameAvailability(username))) {
        return{ 'message': 'Username is being used.', "httpCode": 400};
    }
    if (!(await checkEmailAvailability(email))) {
        return { 'message': 'Email address is being used.', "httpCode": 400};
    }
    if (!(await checkUserTypeValidity(type))) {
        return{ 'message': 'Invalid user type.', "httpCode": 400};
    }
    if (!(await checkDateValidity(dateString))) {
        return { 'message': 'Invalid entered date.', "httpCode": 400};
    }
    return { 'message': 'success', "httpCode": 200};
};

// Check if username is safe to use
const checkUsernameValidity = (username: string) => {
    const regex = /^[a-zA-Z0-9]{1,20}$/;
    // Regex is used to check whether it contains only numbers and letters, with a maximum length of 25 characters.
    return regex.test(username);
};
// Check if email is safe to use
export const checkEmailValidity = (emailAddress: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    // Regex is used to check for the absence of symbols other than '.' and '-', and to verify the presence of the '@' symbol, which separates the local part from the domain part of the email address.
    return regex.test(emailAddress);
};

// Check if password is safe to use
const checkPasswordValidity = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)./;
    // Regex is used to check for the presence of at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.
    return regex.test(password);
};

// Check if the username is already in use within the canister
const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    const values = users.values(); 
    for (const user of values) {
        if (user.username.toLowerCase() === username.toLowerCase()) {
            return false; 
        }
    }
    return true;
};

// Check if the email is already in use within the canister
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
    const values = users.values(); 
    for (const user of values) {
        if (user.email.toLowerCase() === email.toLowerCase()) {
            return false;
        }
    }
    return true;
};

// Check if the user type is valid
const checkUserTypeValidity = async (type: string): Promise<boolean> => {
    return type.toLowerCase() === "donor" || type.toLowerCase() === "user";
};

// Check if the date is valid
const checkDateValidity = async (dateString: string): Promise<boolean> => {
    var date = new Date(dateString);
    // Check if the parsed date is a valid date and not NaN
    return !isNaN(date.getTime());
};