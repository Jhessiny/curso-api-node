const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario(callback) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      //   return reject(new Error("Deu ruim de verdade"));
      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      //   return reject(new Error("Deu ruim de verdade"));
      return resolve({
        telefone: 1545454,
        ddd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(function () {
    return callback(null, {
      rua: "Loutario",
      numero: 0,
    });
  }, 2000);
}

main();
async function main() {
  try {
    console.time("medida-promise");
    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);
    const telefone = resultado[1];
    const endereco = resultado[0];
    console.log(`
              Nome: ${usuario.nome},
              Endereco: ${endereco.rua}, ${endereco.numero},
              Telefone: (${telefone.ddd}) ${telefone.telefone}
              `);
    console.timeEnd("medida-promise");
  } catch (erro) {
    console.log("errpo ", erro);
  }
}

//promise
// const usurioPromise = obterUsuario();
// usurioPromise
//   .then(function (resultado) {
//     return obterTelefone(resultado.id).then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           nome: resultado.nome,
//           id: resultado.id,
//         },
//         telefone: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado);
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     console.log(`
//           Nome: ${resultado.usuario.nome},
//           Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
//           Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//           `);
//   })
//   .catch(function (erro) {
//     console.log("Deu erro: ", erro);
//   });

// callback
// obterUsuario(function resolverUsuario(error, usuario) {
//   if (error) {
//     console.log("erro usuario");
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.log("erro telefone");
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.log("erro endereco");
//         return;
//       }
//       console.log(`
//       Nome: ${usuario.nome},
//       Endereco: ${endereco.rua}, ${endereco.numero},
//       Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `);
//     });
//   });
// });
