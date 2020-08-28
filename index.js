const express = require('express');
const bodyParser = require ('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();


app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended:false }));

app.post('/api/form', (req,res)=>{
    nodemailer.createTestAccount((err,account) => {
        const htmlEmail =
        `
            <h1>Vacunas Aplicadas</h1>

            <table class="egt">
                <tr>
                    <th scope="row">Recien Nacido</th>
                    <td>BcG: <p>${req.body.bcg}</p> </td>
                    <td>Hepatitis B(Neonatal): <p>${req.body.HbNeo}</p> </td>
                    <td></td>
                    <td></td>                  
                </tr>
                <tr>
                    <th>2 Meses</th>
                    <td>Neumococo Conjugada 1°Dosis: <p>${req.body.neumococoConjugada1}</p> </td>
                    <td>Quintuple Pentavalente DTP-HB-Hib 1°Dosis: <p>${req.body.quintuple1}</p> </td>
                    <td>Polio IPV 1°Dosis: <p>${req.body.polioipb1}</p> </td>
                    <td>Rotavirus 1°Dosis: <p>${req.body.rota1}</p> </td>
                </tr>
                <tr>
                    <th>3 Meses</th>
                    <td>Meningococo 1°Dosis: <p>${req.body.meningococo1}</p> </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>4 Meses</th>
                    <td>Neumococo Conjugada 2°Dosis: <p>${req.body.neumococoConjugada2}</p> </td>
                    <td>Quintuple Pentavalente DTP-HB-Hib 2°Dosis: <p>${req.body.quintuple2}</p> </td>
                    <td>Polio IPV 2°Dosis: <p>${req.body.polioipb2}</p> </td>
                    <td>Rotavirus 2°Dosis: <p>${req.body.rota2}</p> </td>
                </tr>

                <tr>
                    <th>5 Meses</th>
                    <td>Meningococo 2°Dosis: <p>${req.body.meningococo2}</p> </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <th>6 Meses</th>
                    <td>Quintuple Pentavalente DTP-HB-Hib 3°Dosis: <p>${req.body.quintuple3}</p> </td>
                    <td>Polio OPV 3°Dosis: <p>${req.body.polioopb1}</p> </td>
                    <td>Gripe:Dosis Anual: <p>${req.body.gripe}</p> </td>
                    <td></td>
                </tr>

                <tr>
                    <th>12 Meses</th>
                    <td>Neumococo Conjugada Refuerzo: <p>${req.body.neumococoConjugada3}</p> </td>
                    <td>Hepatitis A: <p>${req.body.hav}</p> </td>
                    <td>Triple Viral 1°Dosis: <p>${req.body.TripleViral1}</p> </td>
                    <td></td>
                </tr>

                <tr>
                    <th>15 Meses</th>
                    <td>Meningococo Refuerzo: <p>${req.body.meningococo3}</p> </td>
                    <td>Varicela Unica Dosis: <p>${req.body.varicela}</p> </td>
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <th>15-18 Meses</th>
                    <td>Polio OPV 1°Refuerzo: <p>${req.body.polioopb2}</p> </td>
                    <td>Cuadruple o Quintuple 1°Refuerzo: <p>${req.body.cuadruple}</p> </td>
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <th>5-6 Años</th>
                    <td>Polio OPV 2°Refuerzo: <p>${req.body.polioopb3}</p> </td>
                    <td>Triple Viral 2°Dosis: <p>${req.body.TripleViral2}</p> </td>
                    <td>Triple Bacteriana Celular(DTP) 2°Refuerdo: <p>${req.body.TripleBacC}</p> </td>
                    <td></td>
                </tr>

                <tr>
                    <th>11 Años</th>
                    <td> Meningococo Unica Dosis: <p>${req.body.meningococo4}</p> </td>
                    <td>Triple Bacteriana Acelular(dTpa) Refuerdo: <p>${req.body.TripleBacA}</p> </td>
                    <td>Vacuna Contra HPV 2 Dosis: <p>${req.body.HpV}</p> </td>
                    <td></td>
                </tr>

            </table>

            <style>
                table{
                    border: 1px solid rgba(124, 180, 243, 0.65);
                }
                h1{
                    color:rgba(28, 133, 182, 0.774);
                    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                    font-size: 25px;
                }
                th{
                    background-color:rgba(41, 179, 243, 0.774);
                    color:white;
                    border: 2px solid rgba(124, 180, 243, 0.65);    
                    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                    font-size: 15px;
                }
                td{
                    border: 1px solid rgba(124, 180, 243, 0.65);
                    background-color:rgba(201, 225, 246, 0.822);
                    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                    font-size: 15px;
                }
                p{
                    color:red;
                    font-size: 15px;
                }
                
            </style>
        `

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from:'CalendarioVacunas2020@gmail.com',
            to:`${req.body.email}`,
            subject:'New Message',
            text: 'hola Mundo',
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err,info)=>{
            if(err){
                res.status(500).send(err.message)
            }else{
                console.log('EMAIL ENVIADO!!!')
                res.status(200).jsonp(req.body);
            }

            console.log('mensaje enviado')
        })
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server listening on PORT:${PORT}`)
})