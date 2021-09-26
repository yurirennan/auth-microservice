import { Request, Response, Router } from "express";

const statusRoutes = Router();

statusRoutes.get('/status', (req: Request, res:Response) => {
  return res.status(200).json({ status : 'Tudo Ok'})
});


export default statusRoutes;