import { Api } from "../constant/Api";
import YAML from "yaml";
const { MARVEL_DOMAIN } = require("../config");
import fs from "fs";
const request = require("supertest");
const nock = require("nock");
const path = require("path");

import { expect } from "chai";
describe("Start server", function () {
  let server;
  beforeEach(function () {
    mockResponse(Api.MARVEL.GET_ALL_CHARACTER);
    server = require("../server");
  });
  afterEach(function () {
    server.close();
  });
  it("responds to /", function testSlash(done) {
    request(server)
      .get("/")
      .expect(404, done);
  });

  it("Get character list endpoint return 200", function testSlash(done) {
    request(server)
      .get("/characters")
      .end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("Find character endpoint return 200", function testSlash(done) {
    request(server)
      .get("/characters/1")
      .end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

function mockResponse(testPath: string) {
  const testcase = fs.readFileSync(path.resolve(__dirname) + "/testcase/marvel.yaml", "utf8");
  const value = YAML.parse(testcase);
  nock(MARVEL_DOMAIN)
    .filteringPath(function (path) {
      return "/" + Api.MARVEL.API_PATH + testPath;
    })
    .get("/" + Api.MARVEL.API_PATH + testPath)
    .reply(200, value);
}