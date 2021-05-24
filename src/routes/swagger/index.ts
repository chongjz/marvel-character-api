const { SWAGGER_API_DOC } = require("@/config");
import fs from "fs";
import YAML from "yaml";
const swaggerUi = require("swagger-ui-express");

const path = require("path");
const testcase = fs.readFileSync(path.resolve(SWAGGER_API_DOC), "utf8");
const value = YAML.parse(testcase);

export class SwaggerRouter {

    public routes(app): void {

        app.use("/api-docs", swaggerUi.serve);
        app.get("/api-docs", swaggerUi.setup(value));

    }
}
