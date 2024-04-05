import {Test, TestingModule} from '@nestjs/testing';
import {User} from "@domain/entities/user.entity";
import {UserService} from "@domain/services/user.service";
import {UserRepository} from "@domain/repositories/user.repository";

const defaultToken: string = 'access_token';
const user = new User("test", "test");
const userToCreate = new User("new", "new");
const existingUser = new User("test", "test", defaultToken);
const existingsUser = [existingUser];

describe('UserService', () => {
    let service: UserService;
    let repository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useValue: {
                        save: jest.fn().mockImplementation((user: User) => {
                            return existingUser;
                        }),
                        findByUsername: jest.fn().mockImplementation((username: string) => {
                            return existingsUser.find(user => user.username === username);
                        }),
                        deleteByUsername: jest.fn(),
                    },
                }
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should return a user', async () => {
            await expect(service.create(userToCreate)).resolves.toEqual(existingUser);
            expect(repository.save).toHaveBeenCalled();
            expect(repository.save).toHaveBeenCalledWith(userToCreate);
        });
    });

    describe('find', () => {
        it('should return a user', async () => {
            await expect(service.findByUsername(user.username)).resolves.toEqual(existingUser);
            expect(repository.findByUsername).toHaveBeenCalled();
            expect(repository.findByUsername).toHaveBeenCalledWith(user.username);
        });
    });

    describe('delete', () => {
        it('should delete a user', async () => {
            await service.deleteByUsername(user.username);
            expect(repository.deleteByUsername).toHaveBeenCalled();
            expect(repository.deleteByUsername).toHaveBeenCalledWith(user.username);
        });
    });
});