import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { formatResponse } from '../utils/responseFormatter';


export const UserController = {
    async loginUser(req: Request, res: Response) {
        try {
            const { username, password, phone } = req.body;
            if (!username || !password || !phone) {
                throw new Error('Faltan datos');
            }

            // Primero crear el usuariophoneN
            const newUser = await UserService.loginUser({ username, password, phone });

            res.status(200).json(formatResponse('success', 'Usuario logueado correctamente', newUser));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al loguear el usuario', error instanceof Error ? error.message : error));
        }
    }
};