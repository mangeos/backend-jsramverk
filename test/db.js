/**
* Test for class Car, parameterized version of testsuite.
 */
"use strict";

/* global describe it */

//var assert = require("assert");


process.env.NODE_ENV = 'test';

const db = require("../db/database.js");

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app.js');

chai.should();

chai.use(chaiHttp);


describe('app', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH getting base', (done) => {
            chai.request(server)
                .get("/db")
                .end((err, res) => {
                    console.log(res);
                    res.should.have.status(200);
                    res.should.be.an("object");
                    res.body[1]._id.should.be.an("string");

                    done();
                });
        });

    });
});