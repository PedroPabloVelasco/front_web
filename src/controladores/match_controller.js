const { Matches } = require('../models');

const CreateMatch = async (ctx) => {
  const { username, job_offer_name, job_offer_id, match } = ctx.request.body;

  try {
    // Verificar si ya existe un "match" con el mismo username y job_offer_id
    const existingMatch = await Matches.findOne({
      where: {
        username,
        job_offer_id
      }
    });

    // Si ya existe un "match", enviar un mensaje de error
    if (existingMatch) {
      ctx.body = 'Ya existe un like para esta oferta de trabajo';
      return;
    }

    // Si no existe un "match", crear uno nuevo
    const newMatch = await Matches.create({
      username,
      job_offer_name,
      job_offer_id,
      match: false
    });

    console.log(newMatch); // Imprime el nuevo "match" creado

    ctx.body = 'Like registrado con éxito';
  } catch (error) {
    console.error(error);
    ctx.body = 'Hubo un error al registrar el like';
  }
};

const updateMatch = async (ctx) => {
  const { job_offer_name, job_offer_id } = ctx.request.body;

  try {
    // Encuentra el "match" con el username y job_offer_id proporcionados
    const match = await Matches.findOne({
      where: {
        job_offer_name,
        job_offer_id
      }
    });

    // Si no se encuentra el "match", envía un mensaje de error
    if (!match) {
      ctx.body = 'No se encontró el match';
      return;
    }

// Actualiza el "match" a true
match.match = true;
await match.save();

// Haz otra consulta a la base de datos para obtener el "match" actualizado
const updatedMatch = await Matches.findOne({
  where: {
    job_offer_name,
    job_offer_id
  }
});

console.log(updatedMatch.match); // Debería imprimir 'true'


    ctx.body = 'Match actualizado con éxito';
  } catch (error) {
    console.error(error);
    ctx.status = 500; // Internal Server Error
    ctx.body = { error: 'Hubo un error al actualizar el match' };
  }
};


module.exports = {
  CreateMatch,
  updateMatch
};
