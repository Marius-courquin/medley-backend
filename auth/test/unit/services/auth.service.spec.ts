import { Test, TestingModule } from '@nestjs/testing';
import {Hashing} from "@utils/hashing";
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "@domain/services/auth.service";
import {User} from "@domain/entities/user.entity";
import {UserService} from "@domain/services/user.service";
import {UserRevocationDto} from "@infrastructure/dtos/userRevocation.dto";

const defaultId: string = '8936c3a3-e7b2-47cf-b3cd-19e832bd450c';
const defaultToken: string = 'access_token';
const user = new User("test", "test");
const wrongUser = new User("test", "pastest");
const wrongUser2 = new User("pastest", "pastest");
const userToCreate = new User("new", "new");
const existingUser = new User("test", "test", defaultToken);
const existingsUser = [existingUser];

describe('UserService', () => {
    let service: AuthService;
    let usersService: UserService;
    let jwtService: JwtService;
    let hashing: Hashing;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: Hashing,
                    useValue: {
                        comparePassword: jest.fn().mockImplementation((password: string, hash: string) => {
                            return password === hash;
                        }),
                        hashPassword: jest.fn().mockImplementation((password: string) => {
                            return password;
                        }),
                    },
                },
                {
                    provide: UserService,
                    useValue: {
                        findByUsername: jest.fn().mockImplementation((username: string) => {
                            return existingsUser.find(user => user.username === username);
                        }),
                        create: jest.fn().mockImplementation((user: User) => {
                            return existingUser;
                        }),
                        deleteByUsername: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn().mockImplementation((payload: object) => {
                            return defaultToken;
                        }),
                        verifyAsync: jest.fn().mockImplementation((token: string) => {
                            return {id: defaultId};
                        }),
                        decode: jest.fn().mockImplementation((token: string) => {
                            return {id: defaultId};
                        }),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
        hashing = module.get<Hashing>(Hashing);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('signIn', () => {
        it('should return a token', async () => {
            await expect(service.signIn(user)).resolves.toEqual({access_token: defaultToken});
            expect(usersService.findByUsername).toHaveBeenCalled();
            expect(jwtService.signAsync).toHaveBeenCalled();
        });

        it('should throw an UnauthorizedException', async () => {
            await expect(service.signIn(wrongUser)).rejects.toThrow('Invalid credentials');
        });
    });

    describe('signUp', () => {
        it('should return a user', async () => {
            await expect(service.signUp(userToCreate)).resolves.toEqual(existingUser);
            expect(usersService.findByUsername).toHaveBeenCalled();
            expect(usersService.create).toHaveBeenCalled();
        });

        it('should throw an UnauthorizedException', async () => {
            await expect(service.signUp(existingUser)).rejects.toThrow('User already exists');
        });
    });

    describe('revoke', () => {
        it('should delete a user', async () => {
            await expect(service.revoke(new UserRevocationDto(wrongUser.username, wrongUser.password))).resolves.not.toThrow();
            expect(usersService.findByUsername).toHaveBeenCalled();
            expect(usersService.deleteByUsername).toHaveBeenCalled();
        });

        it('should throw an UnauthorizedException', async () => {
            await expect(service.revoke(new UserRevocationDto(wrongUser2.username, wrongUser2.password))).rejects.toThrow('User does not exist');
        });
    });
});