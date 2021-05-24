import express = require("express");
import { Router } from "@/routes";


class App {
  public app: express.Application;
  public router: Router = new Router();
  public express: express.Express;
  public expressRoute: express.Router;


  constructor() {
    this.app = express();
    this.router.routes(this.app, this.express);
  }
}
export default new App().app;