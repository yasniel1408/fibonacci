const express = require('express');
const secuencia = express.Router();
const cors = require('cors');
const db = require('../database/db');


const Secuencia = require('../models/Secuencia');
secuencia.use(cors());

//Ruta para listar todos los pasos de la secuencia
secuencia.get('/list', (req, res)=>{
    Secuencia.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send('erorr: ' + err);
    })
});

//Ruta para crear un paso en la secuencia de fibonacci
// secuencia.post("/create", (req, res)=>{
//     let data = {
//         secuencia: req.body.secuencia,
//         paso: req.body.paso
//     };
//     Secuencia.create(data)
//     .then(secuencia=>{
//         res.json("OKOKOOKOO!!!!");
//     })
//     .catch(err=>{
//         res.send('erorr: ' + err);
//     })
// });

//Ruta para devolver un pasos de la secuencia
secuencia.get('/get/:paso', (req, res)=>{
    Secuencia.findOne({
        where: {
            paso: req.params.paso
        }
    })
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send('erorr: ' + err);
    })
});

//Ruta para eliminar un pasos de la secuencia
// secuencia.delete('/delete/:paso', (req, res)=>{
//     Secuencia.destroy({
//         where: {
//             paso: req.params.paso
//         }
//     })
//     .then(result=>{
//         res.json('OKOKOK!!!')
//     })
//     .catch(err=>{
//         res.send('erorr: ' + err);
//     })
// });


//Metodo para ejecutar la secuencia de fibonacci y guardar la secuencia
secuencia.post("/create", (req, res)=>{
    let size = req.body.number;
    let menosuno = 0;
    let menosdos = 1;
    for(var i = 0; i < size; i++){
            let paso = i;
            if(i==0){
                valor = 0
            }else if (i==1){
                valor = 1
            }else{
                valor = menosuno+menosdos
                menosuno = menosdos
                menosdos = valor 
            }
            let data = {
                paso: paso,
                secuencia: valor
            };
            Secuencia.create(data)
    }
    res.json('size')
});

//Metodo para eliminar la secuencia de fibonacci
secuencia.delete('/delete', (req, res)=>{
    list = [];
    Secuencia.findAll()
        .then(result=>{
           list = result
           list.forEach((element)=>{
               Secuencia.destroy({
                   where: {
                       id: element.id
                   }
               })
           })
        })
        .catch(err=>{
            res.send('erorr: ' + err);
        })
});

//Ruta para actualizar un pasos de la secuencia
// secuencia.put('/update', (req, res)=>{
//     let sec = req.body;
//     const data = {
//         id: sec.id,
//         secuencia: sec.secuencia,
//         paso: sec.paso,
//         createdAt: sec.createdAt,
//         updatedAt: sec.updatedAt
//     }
//     Secuencia.upsert(data)
//     .then(result=>{
//         res.json('OKOKOK!!!')
//     })
//     .catch(err=>{
//         res.send('erorr: ' + err);
//     })
// });



module.exports = secuencia;
