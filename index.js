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
        `<h1>Vacunas Aplicadas</h1>
        <ul>
            <li>${req.body.bcg}</li>
            <li>${req.body.HbNeo}</li>
            <li>${req.body.neumococoConjugada1}</li>
            <li>${req.body.quintuple1}</li>
            <li>${req.body.polioipb1}</li>
            <li>${req.body.rota1}</li>
            <li>${req.body.meningococo1}</li>
            <li>${req.body.neumococoConjugada2}</li>
            <li>${req.body.quintuple2}</li>
            <li>${req.body.polioipb2}</li>
            <li>${req.body.rota2}</li>
            <li>${req.body.meningococo2}</li>
            <li>${req.body.quintuple3}</li>
            <li>${req.body.polioopb1}</li>
            <li>${req.body.gripe}</li>
            <li>${req.body.neumococoConjugada3}</li>
            <li>${req.body.hav}</li>
            <li>${req.body.TripleViral1}</li>
            <li>${req.body.meningococo3}</li>
            <li>${req.body.varicela}</li>
            <li>${req.body.polioopb2}</li>
            <li>${req.body.cuadruple}</li>
            <li>${req.body.polioopb3}</li>
            <li>${req.body.TripleViral2}</li>
            <li>${req.body.TripleBacC}</li>
            <li>${req.body.meningococo4}</li>
            <li>${req.body.TripleBacA}</li>
            <li>${req.body.HpV}</li>
        </ul>`

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