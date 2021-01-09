const EventEmitter = require("events");
class MeuEmisor extends EventEmitter {}

const meuEmisor = new MeuEmisor();
const nomeEvento = "usuario:click";

meuEmisor.on(nomeEvento, function (click) {
  console.log("usuario clicou", click);
});

// meuEmisor.emit(nomeEvento, "barra de rolagem");
// meuEmisor.emit(nomeEvento, "n ok");

const stdin = process.openStdin();
stdin.addListener("data", function (value) {
  console.log("voce digitou: ", value.toString().trim());
});
