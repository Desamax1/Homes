import { createHash, randomBytes } from "crypto";
import options from "../../config.json" assert { type: "json" };

const hashGenerator = (source) => {
    const salt = randomBytes(64).toString("base64");
    let hash;

    for (let i = 0; i < 1000; i++)
        hash = createHash("sha512").update(options.pepper + source + salt).digest("base64");

    return {
        hash,
        salt
    }
}
export const HashGenerator = hashGenerator;

const hashChecker = (plaintext, storedhash, salt) => {
    let hash;

    for (let i = 0; i < 1000; i++)
        hash = createHash("sha512").update(options.pepper + plaintext + salt).digest("base64");
    
    return hash === storedhash;
}
export const HashChecker = hashChecker;