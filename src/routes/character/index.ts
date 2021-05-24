import { NextFunction, Request, Response } from "express";
import { CharacterCountroller } from "@/controller/CharacterController";
import { FindCharacterController } from "@/controller/FindCharacterController";

export class CharacterRouter {

    public routes(app): void {

        app.route("/characters")
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, (req: Request, res: Response, next: NextFunction) => {
                new CharacterCountroller().getCharacters(res);
            }
            );

        app.route("/characters/:id")
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, (req: Request, res: Response, next: NextFunction) => {
                new FindCharacterController().getSingleCharacter(req, res);
            }
            );


    }
}
