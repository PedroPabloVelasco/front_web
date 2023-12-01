const { JobOffer, User, Matches } = require('../models');
const { Op } = require('sequelize');

// Controlador para crear una nueva oferta de empleo
const createJobOffer = async (ctx) => {
  const { title, description, company, location, salary, employer } = ctx.request.body;

  console.log('Entro a crear una oferta de empleo');
  
  try {
    console.log(title, description, company, location, salary, employer);
    const jobOffer = await JobOffer.create({
      title,
      description,
      company,
      location,
      salary,
      employer,
    });
    ctx.status = 201; // Created
    ctx.body = {
      jobOffer,
      message: 'La oferta de empleo se ha creado correctamente.'
    };
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    ctx.status = 400; // Bad Request
    ctx.body = { error: 'No se pudo crear la oferta de empleo' };
  }
};


// Controlador para obtener todas las ofertas de empleo
const getAllJobOffers = async (ctx) => {
  try {
    const jobOffers = await JobOffer.findAll();
    console.log(jobOffers);
    ctx.body = jobOffers;
  } catch (error) {
    console.error(error);
  }
};

// Controlador para obtener una oferta de empleo por ID
const getJobOfferById = async (ctx) => {
  const { id } = ctx.params;

  const jobOffer = await JobOffer.findByPk(id);

  if (jobOffer) {
    ctx.body = jobOffer;
  } else {
    ctx.status = 404; // Not Found
    ctx.body = { error: 'Oferta de empleo no encontrada' };
  }
};

// Controlador para actualizar una oferta de empleo
const updateJobOffer = async (ctx) => {
  const { id } = ctx.params;
  const { title, description, company, location, salary, employer } = ctx.request.body;

  const jobOffer = await JobOffer.findByPk(id);

  if (jobOffer) {
    jobOffer.title = title;
    jobOffer.description = description;
    jobOffer.company = company;
    jobOffer.location = location;
    jobOffer.salary = salary;
    jobOffer.employer = employer;

    await jobOffer.save();

    ctx.body = jobOffer;
  } else {
    ctx.status = 404; // Not Found
    ctx.body = { error: 'Oferta de empleo no encontrada' };
  }
};

// Controlador para eliminar una oferta de empleo
const deleteJobOffer = async (ctx) => {
  const { id } = ctx.params;

  const jobOffer = await JobOffer.findByPk(id);

  if (jobOffer) {
    await jobOffer.destroy();
    ctx.status = 204; // No Content
  } else {
    ctx.status = 404; // Not Found
    ctx.body = { error: 'Oferta de empleo no encontrada' };
  }
};

// Controlador para obtener los perfiles de los empleados que han dado like a las ofertas de trabajo de un empleador específico
const getEmployeeProfiles = async (ctx) => {
  const { employerName } = ctx.request.body;

  try {
    const matches = await Matches.findAll({
      where: {
        job_offer_name: employerName
      },
      include: [{
        model: JobOffer,
        as: 'jobOffer',
        attributes: ['title']
      }]
    });

    const profiles = await Promise.all(matches.map(async match => {
      const user = await User.findOne({
        where: {
          name: match.username
        }
      });

      return {
        ...user.dataValues,
        jobOfferTitle: match.jobOffer.title,
        jobOfferId: match.job_offer_id
      };
    }));

    ctx.body = profiles;
  } catch (error) {
    console.error(error);
    ctx.status = 500; // Internal Server Error
    ctx.body = { error: 'No se pudieron obtener los perfiles de los empleados' };
  }
};



module.exports = {
  createJobOffer,
  getAllJobOffers,
  getJobOfferById,
  updateJobOffer,
  deleteJobOffer,
  getEmployeeProfiles
};
