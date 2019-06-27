process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import Training from '../../app/services/training/model/training';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
var request = require('request');

let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

describe('Training', () => {

    describe('/GET Training', () => {
        it('it should GET all the Training', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET HTTP get All Training', () => {
        it('it should GET all the Training', (done) => {
            chai.request(server)
                .get('/training/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });

});
