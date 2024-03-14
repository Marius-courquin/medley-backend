import * as bcrypt from 'bcrypt';

const saltRounds = 10;

function hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

function comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}

export default {
    hashPassword,
    comparePassword,
};