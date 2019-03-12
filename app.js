global.db = require('./db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const router = express.Router()
app.use(bodyParser.urlencoded
    ({ extended: true})
    )

app.use(bodyParser.json())

router.get('/', (req, res) => res.json({
    message: 'Funcionando' }))

    router.get('/clientes', (req, res) => global.
    db.findClientes((err, docs) =>{
        if(err) res.status(500).json(err)
        else res.json(docs)
    }))
    router.get('/clientes/:id', (req, res) =>
     global.db.findCliente(req.params.id, (err,
        docs) => {
            if(err) res.status(500).json(err)
        else res.json(docs)
        })
    )

    router.post('/clientes',(req, res) =>{
        const cliente = req.body
        global.db.insertCliente(cliente, (err,
            result)=> { if(err) res.status(500).json(err)
            else res.json({message: 'Cliente cadastrado com sucesso!'})
            }) 
})

router.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const cliente = req.body;
    global.db.updateCliente(id, cliente,
         (err, result) => {
             if(err) res.status(500).json(err)
             else res.json({ message: ' Cliente atualizado'})
         })
})

router.patch('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const updates= req.body;
    global.db.patchCliente(id, updates,
         (err, result) => {
             if(err) res.status(500).json(err)
             else res.json({ message: ' Cliente atualizado'})
         })
})

router.delete('/clientes/:id',(req, res) =>
{
    const id = req.params.id;
    global.db.deleteCliente(id, (err, 
        result) => {
            if(err) res.status(500).json(err)
            else res.json({ message: ' Cliente Excluido'})
        })
}
)

app.use('/', router)

app.listen(port)

console.log('API FUNCIONANDO')