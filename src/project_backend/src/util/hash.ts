var shajs = require('sha.js')

export const hash = (text: string, id: string) => {
    const hashText = shajs('sha256')
        .update(text + id)
        .digest('hex');
    return hashText
}
export const compareHash = (text1: string, text2: string, id: string) => {
    const hashText1 = shajs('sha256')
        .update(text1 + id)
        .digest('hex');
    return hashText1 === text2
}