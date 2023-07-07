import { Request, Response, NextFunction } from 'express';

export function getCheckFileExistsMiddlware(errorMessage: string) {
  return (request: Request, response: Response, next: NextFunction): void => {
    if (request.files && request.files.length) {
      next();
    } else {
      response.status(400).send(errorMessage);
    }
  };
}
