const express = require('express') // importação
const app = express() // criando uma nova aplicação, gerando uma nova instância desta aplicação
const bodyParser = require('body-parser') // importação body-parser

const categorias = require('./routes/categorias')
const publicacoes = require('./routes/publicacoes')

app.set('view engine', 'ejs') // tipo de engine para utilização de HTML, nesse caso ejs
app.use(bodyParser.urlencoded()) // usado para pegar dados json

// desta maneira, é possível pegar a porta de uma variável de ambiente
// ajudará quando subir o projeto o provedor poderá trocar a porta dinamicamente
const port = process.env.PORT || 3000 // se existir essa porta use-a, ou então use a 3000

// ------------ RESPOSTA DA REQUISIÇÃO ------------
// const resolver = (request, response) => {
//     response.send('Olá Fullstack Lab')
// }
// app.get('/', resolver)

// DIMINUINDO O TAMNHO DO CÓDIGO ACIMA FICARIA:
app.get('/', async(request, response) => { // usamos async(função assincrona)
    // abaixo o axios vai enviar uma req e vai esperar como res da url os dados
    // o axios retorna uma promise
    // const content = await axios.get('https://como-fazer-devpleno-8e0e5.firebaseio.com/teste.json') // trabalha com o async
    // console.log(content.data)
    // response.render('index', {i: content.data})
    response.render('index')
})

app.use('/categorias', categorias) // aqui indica que este router tera sempre /categorias na frente
app.use('/publicacoes', publicacoes) // aqui indica que este router tera sempre /publicacoes na frente

// para ouvir uma porta
app.listen(port, (err) => {
    if (err) {
        console.log('error')
    } else {
        console.log('Como-Fazer Server is running on port: ', port)
    }
})