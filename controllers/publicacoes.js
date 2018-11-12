const api = require('../api')

// para criar novas publicações, reuniremos todas as categorias
// adicionamos o await abaixo
const novaForm = async (req, res) => {
    // aqui pegamos todas as categorias
    const categorias = await api.list('categorias')
    // aqui enviaremos para o formulário
    res.render('publicacoes/nova', {categorias})
}

// aqui encontra-se o método para se salvar publicação como "filha" de categoria
const nova = async (req, res) => {
    await api.create('publicacoes/' + req.body.categoria, {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
    res.redirect('/publicacoes/categoria/' + req.body.categoria)
}

const list =  async (req, res) => {
    const categoria = req.params.categoria
    // aqui será passada a categoria na url
    // depois foi alterada a rota
    const publicacoes = await api.list('publicacoes/' +  categoria)
    // mandando para o view a publicação e  categoria
    res.render('publicacoes/index', { publicacoes, categoria }) 
}

const excluir = async (req, res) => {
    await api.apagar('publicacoes/' + req.params.categoria, req.params.id)
    res.redirect('/publicacoes/categoria/' + req.params.categoria)
}

const editarForm = async (req, res) => {
    const publicacao = await api.get('publicacoes/' + req.params.categoria, req.params.id)
    res.render('publicacoes/editar', {
        publicacao,
        categoria: req.params.categoria
    })
}

const editar = async (req, res) => {
    await api.update('publicacoes/' + req.params.categoria, req.params.id, {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
    res.redirect('/publicacoes/categoria/' + req.params.categoria)
}

module.exports = {
    novaForm, nova, list, excluir,
    editarForm, editar
}