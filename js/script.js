const btn = document.querySelector("#btn");
const resultado = document.querySelector("#resultado");
const container = document.querySelector("#usuarios");

const url = "https://jsonplaceholder.typicode.com/users";

async function carregar() {
  const res = await fetch(url);
  const data = await res.json();

  let html = "";

  data.forEach((usuario) => {
    html += `<div>
        <p>${usuario.name}</p>
        <p>${usuario.email}</p>
        <p>${usuario.address.street} - ${usuario.address.city}</p>
        <p>${usuario.phone}</p>
      
      </div>`;
  });

  container.innerHTML = html;
}

btn.addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((r) => r.json())
    .then((data) => {
      resultado.innerText = data.title;
      console.log(data);
    });
});

carregar();
