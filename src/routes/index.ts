
import { CharacterRouter } from "@/routes/character";
import { SwaggerRouter } from "@/routes/swagger";

export class Router {
    public characterRouter: CharacterRouter = new CharacterRouter();
    public swaggerRouter: SwaggerRouter = new SwaggerRouter();


    public routes(app, route): void {
        app.route("/", this.characterRouter.routes(app));
        app.route("/", this.swaggerRouter.routes(app));
    }
}

