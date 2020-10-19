import express from 'express';

interface Error {
    status?: number;
    message?: string;
 }
 
 function catchBadRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
     const err: Error = {
         message: 'Not found',
         status: 400
     };
     res.status(400);
     next(err);
 }
 
function sendError(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
     res.status(err.status || 500);
     res.json({
         message: err.message,
         status: err.status
     });
 }
 
 export default {catchBadRequest, sendError}