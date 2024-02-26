import { Server } from 'azle';
import express, { NextFunction, Request, Response } from 'express';
export type Queja={
    id: number,
    fecha: Date,
    title:string,
    descripcion:string,
    calle:string,
    colonia:string,
    estado:string
}
let quejas : Queja[] = [{
    id:1,
    fecha: new Date(2024,1,23),
    title: 'Exeso de baches',
    descripcion: 'Debido a las lluvia y el paso del timepo, En frente mi calle existen muchos baches',
    calle:'Teodoro Olivares Sur',
    colonia:'Progreso Sur',
    estado:'No'
}];  


export default Server(() => {
    const app = express();
/*     let proximoId= req.body.id;
    export function crearRegistro */
    app.use(express.json());
    // Get mostrar las petiticiones

    app.get('/queja', (req, res) => {
        res.json(quejas);
    });

    // obtener  ultimo id 
    function getNextId(): number {
        return Math.max(...quejas.map(queja => queja.id), 0) + 1;
    }
    // POST 
    app.post('/nuevaQueja', (req ,res ) => {
        
        const {title,descripcion,calle, colonia, estado} = req.body
        const nuevaQueja: Queja ={ id: getNextId(),
            fecha: new Date(),
            title,
            descripcion,
            calle,
            colonia,
            estado
        } 
        quejas.push(nuevaQueja);
        res.send("Queja Generada");
     
    });

    //UPTADE
    app.put('/queja/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const Queja = quejas.find((Queja) => Queja.id === id);

        if (!Queja) {
            res.status(404).send("Not found");
            return;
        }

        const updatedQueja = { ...Queja, ...req.body };
        
        quejas = quejas.map((b) => b.id === updatedQueja.id ? updatedQueja : b);

        res.send("Queja Actualizada");
    });

    //DELETE
    app.delete("/queja/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const Queja = quejas.find((Queja) => Queja.id === id);

        if (!Queja) {
            res.status(404).send("Not found");
            return;
        }
        quejas = quejas.filter((Queja) => Queja.id !== id);
        res.send("Peticion Eliminada");
    });

    app.use(express.static('/dist'));

    return app.listen();
});