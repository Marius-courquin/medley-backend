import * as bcrypt from 'bcrypt';


export class Hashing {
    private readonly saltRounds = 10;

    hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(this.saltRounds);
        return bcrypt.hashSync(password, salt);
    }

    comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }
}