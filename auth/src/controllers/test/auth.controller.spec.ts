// import {Test, TestingModule} from '@nestjs/testing';
// import {AuthController} from '../auth.controller';
// import {AuthService} from "../../domain/services/auth.service";
// import {UserDto} from "../dtos/user.dto";
// import {UserDtoMapper} from "../mappers/user.dto.mapper";
// import {User} from "../../domain/entities/user.entity";
//
// const defaultId: string = '8936c3a3-e7b2-47cf-b3cd-19e832bd450c';
// const defaultToken: string = 'access_token';
// const userDTO: UserDto = new UserDto("test", "test");
// const user: User = new User("test", "test", defaultId);
// describe('AuthController', () => {
//     let controller: AuthController;
//     let service: AuthService;
//     let mapper: UserDtoMapper;
//
//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             controllers: [AuthController],
//             providers: [
//                 UserDtoMapper,
//                 {
//                     provide: AuthService,
//                     useValue: {
//                         signIn: jest
//                             .fn()
//                             .mockImplementation((user: User) =>
//                                 Promise.resolve({access_token: defaultToken}),
//                             ),
//                         signUp: jest.fn()
//                             .mockImplementation((user: User) =>
//                                 Promise.resolve(user),
//                             ),
//                         revoke: jest.fn(),
//                         validateToken: jest.fn()
//                             .mockImplementation((token: String) =>
//                                 Promise.resolve({id : defaultId}),
//                             ),
//                     },
//                 },
//             ]
//         }).compile();
//
//         controller = module.get<AuthController>(AuthController);
//     });
//
//     it('should be defined', () => {
//         expect(controller).toBeDefined();
//     });
// });
