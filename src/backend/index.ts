import { Server } from 'azle';
import express, { NextFunction, Request, Response } from 'express';
import {Queja} from './registro'
let quejas : Queja[] = [{
    id:1,
    fecha: new Date(2024,1,23),
    title: 'Exeso de baches',
    descripcion: 'Debido a las lluvia y el paso del timepo, En frente mi calle existen muchos baches',
    calle:'Teodoro Olivares Sur',
    colonia:'Progreso Sur'
}];  


export default Server(() => {
    const app = express();
/*     let proximoId= req.body.id;
    export function crearRegistro */
    app.use(express.json());
    // Get mostrar las petiticiones

    app.get('/petisiones', (req, res) => {
        res.json(quejas);
    });

    /* app.post('/db/update', (req: Request<any, any, typeof db>, res) => {
        db = req.body;

        res.json(db);
    }); */

    app.use(express.static('/dist'));

    return app.listen();
});
