const baseUrl = "http://localhost:3000/paletas";

async function findAllPaletas() {
  const response = await fetch(`${baseUrl}/find-paletas`);

  const paletas = await response.json();

  paletas.forEach(function (paleta) {
    document.querySelector("#paletaList").insertAdjacentHTML(
      "beforeend",
          `<div class="PaletaListaItem" id="PaletaListaItem_${paleta.id}"><div>
            <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
            <div class="PaletaListaItem__preco">R$ ${paleta.preco.toFixed(
              2
            )}</div>
            <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
            <div class="PaletaListaItem__acoes Acoes">
              <button class="Acoes__editar btn" onclick="abrirModal(${paleta.id})">Editar</button> 
              <button class="Acoes__apagar btn">Apagar</button> 
            </div>

          </div>
            <img class="PaletaListaItem__foto" src=${
              paleta.foto
            } alt=${`Paleta de ${paleta.sabor}`} />
        </div>`
    );
  });
};

findAllPaletas();

const findPaletaById = async () => {
  const id = document.getElementById("idPaleta").value;

  const response = await fetch(`${baseUrl}/find-paleta/${id}`);

  const paleta = await response.json();

  const paletaEscolhidaDiv = document.getElementById("paletaEscolhida");

  paletaEscolhidaDiv.innerHTML = `<div class="PaletaCardItem">
    <div>
      <div class="PaletaCardItem__sabor">${paleta.sabor}</div>
      <div class="PaletaCardItem__preco">R$ ${paleta.preco.toFixed(2)}</div>
      <div class="PaletaCardItem__descricao">${paleta.descricao}</div>
    </div>
      <img class="PaletaCardItem__foto" src=${
        paleta.foto
      } alt=${`Paleta de ${paleta.sabor}`} />
  </div>`;
};

function abrirModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "flex";
}

function fecharModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector("#sabor").value = "";
  document.querySelector("#preco").value = 0;
  document.querySelector("#descricao").value = "";
  document.querySelector("#foto").value = "";

}

async function createPaleta() {
  const sabor = document.getElementById("sabor").value;
  const descricao = document.getElementById("descricao").value;
  const foto = document.getElementById("foto").value;
  const preco = +document.getElementById("preco").value;

  const paleta = {
    sabor: sabor,
    descricao: descricao,
    foto: foto,
    preco: preco,
  };

  const response = await fetch(baseUrl + "/create", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const novaPaleta = await response.json();

  const html = `<div class="PaletaListaItem" id="PaletaListaItem_${novaPaleta.id}"><div>

    <div class="PaletaListaItem__sabor">${novaPaleta.sabor}</div>
    <div class="PaletaListaItem__preco">R$ ${novaPaleta.preco.toFixed(
      2,
  )}</div>
    <div class="PaletaListaItem__descricao">${novaPaleta.descricao}</div>
    
    <div class="PaletaListaItem__acoes Acoes">
      <button class="Acoes__editar btn" onclick="abrirModal(${paleta.id})">Editar</button> 
      <button class="Acoes__apagar btn">Apagar</button> 
    </div>

  </div>
    <img class="PaletaListaItem__foto" src=${
      novaPaleta.foto
  } alt=${`Paleta de ${novaPaleta.sabor}`} />
</div>`;

  document.getElementById("paletaList").insertAdjacentHTML("beforeend", html);

  document.getElementById("sabor").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("foto").value = "";
  document.getElementById("preco").value = "";
};
