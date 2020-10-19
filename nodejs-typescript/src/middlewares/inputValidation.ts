import {validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';

export function checkInput(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({error: {type: "warning", errors: errors.array()}});
    next();
}