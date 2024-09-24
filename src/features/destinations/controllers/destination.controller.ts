import { Request, Response } from 'express';
import DestinationService from '../services/destination.service';

class DestinationController {
    // Create a new destination
    async createDestination(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const newDestination = await DestinationService.createDestination(data);
            return res.status(201).json({
                message: 'Destination created successfully',
                data: newDestination
            });
        } catch (error) {
            return res.status(500).json({message:(error as Error).message
            });
        }
    }

    // Get all destinations
    async getAllDestinations(req: Request, res: Response): Promise<Response> {
        try {
            const destinations = await DestinationService.getAllDestinations();
            return res.status(200).json({
                message: 'Destinations fetched successfully',
                data: destinations
            });
        } catch (error) {
            return res.status(500).json({message:(error as Error).message
            });
        }
    }

    // Get a destination by ID
    async getDestinationById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const destination = await DestinationService.getDestinationById(id);
            if (!destination) {
                return res.status(404).json({
                    message: 'Destination not found'
                });
            }
            return res.status(200).json({
                message: 'Destination fetched successfully',
                data: destination
            });
        } catch (error) {
            return res.status(500).json({message:(error as Error).message
            });
        }
    }

    // Update a destination by ID
    async updateDestination(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedDestination = await DestinationService.updateDestination(id, updatedData);
            if (!updatedDestination) {
                return res.status(404).json({
                    message: 'Destination not found'
                });
            }
            return res.status(200).json({
                message: 'Destination updated successfully',
                data: updatedDestination
            });
        } catch (error) {
            return res.status(500).json({message:(error as Error).message
            });
        }
    }

    // Delete a destination by ID
    async deleteDestination(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const deletedDestination = await DestinationService.deleteDestination(id);
            if (!deletedDestination) {
                return res.status(404).json({
                    message: 'Destination not found'
                });
            }
            return res.status(200).json({
                message: 'Destination deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({message:(error as Error).message
            });
        }
    }
}

export default new DestinationController();
