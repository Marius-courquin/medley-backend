// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import {AuthModule} from "@modules/auth.module";
//
// describe('AuthController (e2e)', () => {
//   let app: INestApplication;
//
//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AuthModule],
//     }).compile();
//
//     app = moduleFixture.createNestApplication();
//     await app.init();
//     });
//
//     describe('POST /api/v1/auth/signup', () => {
//         it('should return 201', () => {
//             return request(app.getHttpServer())
//                 .post('/auth/signup')
//                 .send({username: 'test', password: 'test'})
//                 .expect(201);
//         });
//     });
//
//     describe('POST /api/v1/auth/signin', () => {
//         it('should return 201', () => {
//             return request(app.getHttpServer())
//                 .post('/auth/signin')
//                 .send({username: 'test', password: 'test'})
//                 .expect(201);
//         });
//     });
//
//     describe('POST /api/v1/auth/validation', () => {
//         it('should return 201', () => {
//             return request(app.getHttpServer())
//                 .post('/auth/validate')
//                 .send({token: 'test'})
//                 .expect(201);
//         });
//     });
//
//     describe('DELETE /api/v1/auth/revoke', () => {
//         it('should return 201', () => {
//             return request(app.getHttpServer())
//                 .delete('/auth/revocation')
//                 .send({username: 'test'})
//                 .expect(201);
//         });
//     });
//
//     afterEach(async () => {
//         await app.close();
//     });
//
// });
//
//
