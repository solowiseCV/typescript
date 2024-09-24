import { Router } from 'express';
import DestinationController from '../controllers/destination.controller'; 

const DestinationRouter = Router();

DestinationRouter.post('/destinations', DestinationController.createDestination);
DestinationRouter.get('/destinations', DestinationController.getAllDestinations);
DestinationRouter.get('/destinations/:id', DestinationController.getDestinationById);
DestinationRouter.put('/destinations/:id', DestinationController.updateDestination);
DestinationRouter.delete('/destinations/:id', DestinationController.deleteDestination);

export default DestinationRouter;
