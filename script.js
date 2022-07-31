var formulario = document.querySelector('form')

formulario.addEventListener('submit', function(i){

    // Não permite o refresh do formulário
    i.preventDefault()

    //URL da pesquisa (onde vai pesquisar)
    let urlForm = "https://pokeapi.co/api/v2/pokemon/";

    // Valor do input Name
    let nome  = document.getElementById('name') // corresponde ao id <input type="text" id="name" placeholder="Exemplo: Pikachu ou 25" required>

    // concatena a URL com o inputname
    urlForm = urlForm + this.name.value // exemplo: https://pokeapi.co/api/v2/pokemon + 25 = https://pokeapi.co/api/v2/pokemon/25

    //Altera os valores para minúsculas
    urlForm = urlForm.toLocaleLowerCase()

    // ID content
    let resposta = document.getElementById('content') // corresponde ao id <div id="content">

    // ID imgPokemon
    let imagem = document.getElementById('imgPokemon') // corresponde ao id <div id="imgPokemon">

    // Resultado
    let html = ''

    fetch(urlForm)
        .then(resposta => resposta.json())
        .then(function(data){
            console.log(data)
            html = 'Name: ' + grande(data.name) + '<br>'
            html = html + 'Number: ' + number(data.id) + '<br>'
            html = html + 'type: ' + grande(data.types[0].type.name)
            resposta.innerHTML = html

            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"            
        })
        .catch(function(err){
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
                html = 'Pokémon não encontrado! 🤔'
            }else{
                html = err
            }
            resposta.innerHTML = html
        })

});

function grande(val){
    return val[0].toUpperCase() + val.substr(1)
}

function number(num){
    return Number.parseInt(num)
}
