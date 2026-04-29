const url = 'http://localhost:3000/produtos';
const produtos = [];
let produtoAtual = null;

carregarProdutos();

function carregarProdutos() {
    fetch(url + '/listar')
        .then(response => response.json())
        .then(data => {
            produtos.length = 0;
            produtos.push(...data);
            listarCards();
        })
        .catch(e => alert('Problemas com a conexão da API'));
}

function listarCards() {
    const container = document.querySelector('main');
    container.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <h3>${produto.produto}</h3>
        <img src="${produto.imagem}"alt="${produto.produto}">
        <p>Preço: ${produto.preco}</p>
        `;

        card.onclick = () => abrirProduto(produto);
        container.appendChild(card);
    });
}

function abrirProduto(produto){
    produtoAtual = produto;
    produtoProduto.innerText = produto.produto;
    produtoEdit.value = produto.produto;
    imagemProduto.src = produto.imagem;
    imagemEdit.value = produto.imagem;
    tipoEdit.value = produto.tipo;
    precoEdit.value = produto.preco;
    detalhes.classList.remove('oculto');
}

imagemEdit.addEventListener("input", () =>{
    imagemProduto.src = imagemEdit.value;
});

document.querySelector('#formCad').addEventListener('submit', function(e){
    e.preventDefault();
    const novoProduto = {
        produto: produto.value,
        tipo: tipo.value,
        descricao: descricao.value,
        imagem: Imagem.value,
        preco: preco.value ? Number(preco.value) : null
    };

    fetch(url + '/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(novoProduto)
    })

    .then(() => {
        alert("Produto adicionado com sucesso!")
        cadastro.classList.add('oculto');
        carregarReceitas();
    })
    .catch(() => alert("Erro ao salvar produto"));

});

function salvarEdicao() {
    const produtoEditado = {
        produto: produtoEdit.value,
        tipo: tipoEdit.value,
        descricao: descricaoEdit.value,
        imagem: imagemEdit.value,
        preco: precoEdit.value ? Number(precoEdit.value) : null
    };

    fetch(url + '/atualizar/' + produtoAtual.id, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(produtoEditado)
    })
    .then(res => {
        if(!res.ok) throw new Error();
        return res.json();
    })
    .then(() => {
        alert("Produto atualizado com sucesso!");
        detalhes.classList.add('oculto');
        carregarReceitas();
    })
    .catch(() => alert("Erro ao editar produto"));
}

function excluirProdutoAtual(){
    if(!confirm("Deseja excluir essa produto?"))return;
    fetch(url + '/excluir/' + produtoAtual.id, {
        method: 'DELETE'
    })
    .then(() => {
        alert("Produto excluido com sucesso!");
        detalhes.classList.add('oculto');
        carregarProdutos();
    })
    .catch(() => alert("Erro ao excluir produto"));
}
