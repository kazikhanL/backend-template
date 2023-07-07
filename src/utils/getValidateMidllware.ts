import Validator, { ValidationSchema } from 'fastest-validator';
import { Request, Response, NextFunction } from 'express';

export function getValidateMidllware(schema: ValidationSchema) {
  return (request: Request, response: Response, next: NextFunction) => {
    const validator = new Validator({ haltOnFirstError: true });
    const check = validator.compile(schema);
    const candidate = request.body;

    const checkResult = check(candidate);
    const isGoodData = typeof checkResult === 'boolean' && checkResult === true;

    if (isGoodData) {
      next();
    } else {
      response.status(400).send('invalid request data');
    }
  };
}
