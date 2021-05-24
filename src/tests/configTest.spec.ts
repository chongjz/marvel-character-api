const { PORT, LOG4JS_PATH, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY, MARVEL_API_KEY, MARVEL_DOMAIN } = require("../config");
import { expect } from "chai";
import fs from "fs";

describe("environment file ", () => {
  it("MARVEL_PUBLIC_KEY should have some value", () => {
    expect(MARVEL_PUBLIC_KEY).to.not.be.undefined;
  });

  it("MARVEL_PRIVATE_KEY should have some value", () => {
    expect(MARVEL_PRIVATE_KEY).to.not.be.undefined;
  });

  it("MARVEL_API_KEY should have some value", () => {
    expect(MARVEL_API_KEY).to.not.be.undefined;
  });

  it("MARVEL_DOMAIN should have some value", () => {
    expect(MARVEL_DOMAIN).to.not.be.undefined;
  });

  it("PORT should have some value", () => {
    expect(PORT).to.not.be.undefined;
  });

  it("logjs config must exists", () => {
    expect(fs.existsSync(LOG4JS_PATH)).to.be.true;
  });
});