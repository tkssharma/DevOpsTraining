process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import User from '../../app/services/training/model/user';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
let should = chai.should();
chai.use(chaiHttp);


describe('Users', () => {

    describe('/GET Users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET HTTP get All users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/users/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });
    /*
     * Test the /POST route
     */
    describe('/POST Register User', () => {
        it('it should not POST a user without pages field', (done) => {
            let user = {
              "name": "tkssharma",
              "password": "tkssharma",
              "email": "tkssharma@gmail.com",
              "verify_password": "tkssharma"
            }
            chai.request(server)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });

    });

    /*
     * Test the /POST route
     */
    describe('/POST Login User', () => {
        it('it should not POST a user without pages field', (done) => {
            let user = {
                "password": "tkssharma",
                "email": "tkssharma@gmail.com",
            }
            chai.request(server)
                .post('/auth/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });
    });
});
