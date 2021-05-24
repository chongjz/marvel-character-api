import { expect } from "chai";
import fs from "fs";
import YAML from "yaml";
import { Character } from "../bean/Character";
import { Api } from "../constant/Api";
const { MARVEL_DOMAIN } = require("../config");
const request = require("supertest");
const nock = require("nock");
const path = require("path");


describe("Test characters endpoint return 200", function () {
  let server;
  beforeEach(function () {
    mockResponse(Api.MARVEL.GET_ALL_CHARACTER);
    server = require("../server");
  });
  afterEach(function () {
    server.close();
  });

  it("Return all marvel characters", function testSlash(done) {
    request(server)
      .get("/characters")
      .end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(nock.isDone()).to.be.true;
        done();
      });

  });
  it("Find exists marvel character", function testSlash(done) {
    request(server)
      .get("/characters/1")
      .end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.id).to.equal(1);
        done();
      });
  });

  it("Find invalid characters", function testSlash(done) {
    request(server)
      .get("/characters/123")
      .end(function (err, res) {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
});



describe("Test characters bean", function () {
  it("Assign to bean", () => {
    const character = new Character();
    character.$id = 1;
    character.$name = "name";
    character.$description = "description";
    expect(new Character().assign({
      id: 1,
      name: "name",
      description: "description",
    })).to.deep.equal(character);
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