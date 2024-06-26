import {User} from "@domain/entities/user.entity";
import {UserLoginDto} from "@infrastructure/dtos/userLogin.dto";
import {AuthService} from "@domain/services/auth.service";
import {Test, TestingModule} from "@nestjs/testing";
import {AuthController} from "@infrastructure/controllers/auth.controller";


const defaultId: string = '8936c3a3-e7b2-47cf-b3cd-19e832bd450c';
const defaultToken: string = 'access_token';
const userDTO: UserLoginDto = new UserLoginDto("test", "test");
const user: User = new User("test", "test");
describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        signIn: jest
                            .fn()
                            .mockImplementation((user: User) =>
                                Promise.resolve({access_token: defaultToken}),
                            ),
                        signUp: jest.fn()
                            .mockImplementation((user: User) =>
                                Promise.resolve(user),
                            ),
                        revoke: jest.fn(),
                        validateToken: jest.fn()
                            .mockImplementation((token: String) =>
                                Promise.resolve({id : defaultId}),
                            ),
                    },
                },
            ]
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('signIn', () => {
        it('should return a token', async () => {
            await expect(controller.signIn(userDTO)).resolves.toEqual({access_token: defaultToken});
            expect(service.signIn).toHaveBeenCalled();
            expect(service.signIn).toHaveBeenCalledWith(user);
        });
    });

    describe('signUp', () => {
        it('should signup a user with nothing return', async () => {
            await expect(controller.signUp(userDTO)).resolves.not.toThrow();
            expect(service.signUp).toHaveBeenCalled();
            expect(service.signUp).toHaveBeenCalledWith(user);
        });
    });
});
