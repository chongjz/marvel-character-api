import { CacheUtilService } from "../core/cache/CacheUtilService";
import { expect } from "chai";
const CACHE_KEY = "MARVEL_CHARACTER";

describe("Cache Test ", () => {
  it("Set cache", () => {
    CacheUtilService.setCacheByKey(CACHE_KEY, "1", "1");
  });


  it("Get valid cache", () => {
    expect(CacheUtilService.getCacheByKey(CACHE_KEY, "1")).to.equal("1");
  });

  it("get invalid cache", () => {
    expect(CacheUtilService.getCacheByKey(CACHE_KEY, "2")).to.be.undefined;
  });

  it("get invalid cache category", () => {
    expect(CacheUtilService.getCache("TEST")).to.be.undefined;
  });

  it("get valid cache category", () => {
    expect(CacheUtilService.getCache(CACHE_KEY)).to.deep.equal({ "1": "1" });
  });
});

