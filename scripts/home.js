const localStorageKey = 'list'
let arrayTasks = JSON.parse(localStorage.getItem(localStorageKey) || '[]');

const elementosDaPagina = {
    localTasks: () => document.getElementById('local-tasks'),
    inputNovo: () => document.getElementById('input-novo'),
    btnNovo: () => document.getElementById('btnCriar'),
}

function criaTask() {
    if (!elementosDaPagina.inputNovo().value) {
        alert("DIGITE O CONTEUDO DA TASK");
    } else {
        content = elementosDaPagina.inputNovo().value

        arrayTasks.unshift({
            content: content,
        })
        localStorage.setItem(localStorageKey, JSON.stringify(arrayTasks));
        carregaTasks();
        elementosDaPagina.inputNovo().value = '';
    }
}

function carregaTasks() {
    elementosDaPagina.localTasks().innerHTML = '';
    for (let el = 0;el < arrayTasks.length;el++) {
        const bloco = document.createElement('div');
        const conteudo = document.createElement('p');
        const deletar = document.createElement('button');

        bloco.setAttribute('class','bloco');

        conteudo.innerHTML = arrayTasks[el].content;
        deletar.innerHTML = 'X'

        elementosDaPagina.localTasks().appendChild(bloco);
        bloco.appendChild(conteudo);
        bloco.appendChild(deletar);

        deletar.addEventListener('click', function () {
            deleta(arrayTasks[el].content)
        })
    }
}

function deleta(data) {
    let arrayTask = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    let index = arrayTask.findIndex(x => x.content == data);
    arrayTask.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(arrayTask));

    location.reload()
}


window.addEventListener('load', () => {
    carregaTasks();
});
