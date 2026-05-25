const container = document.querySelector("#paises");
const searchInput = document.querySelector("#search");
const loadingDiv = document.querySelector("#loading");

const url =
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages";
let todosPaises = [];

async function carregarPaises() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

    const data = await res.json();
    todosPaises = data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );

    exibirPaises(todosPaises);
  } catch (error) {
    loadingDiv.innerHTML = `<div class="alert alert-danger">Erro ao carregar países: ${error.message}</div>`;
  } finally {
    loadingDiv.style.display = "none";
  }
}

function criarCard(pais) {
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${pais.flags.svg}" class="card-img-top" alt="Bandeira de ${pais.name.common}" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${pais.name.common}</h5>
          <p class="card-text">
            <strong>Capital:</strong> ${pais.capital?.[0] ?? "N/A"}<br>
            <strong>Região:</strong> ${pais.region}<br>
            <strong>População:</strong> ${pais.population.toLocaleString("pt-BR")}<br>
            <strong>Idiomas:</strong> ${pais.languages ? Object.values(pais.languages).join(", ") : "N/A"}
          </p>
        </div>
      </div>
    </div>`;
}

function exibirPaises(paises) {
  container.innerHTML = paises.map(criarCard).join("");
}

// searchInput.addEventListener("input", (e) => {
//   const termo = e.target.value.toLowerCase();
//   const filtrados = todosPaises.filter(
//     (pais) =>
//       pais.name.common.toLowerCase().includes(termo) ||
//       pais.capital?.[0]?.toLowerCase().includes(termo) ||
//       pais.region.toLowerCase().includes(termo)
//   );
//   exibirPaises(filtrados);
// });

carregarPaises();
