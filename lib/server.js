const compression = require('compression')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config');
const { Op } = require('sequelize');

const Document = require('../src/app/models/document');
const Apartment = require('../src/app/models/apartment');
const Parking = require('../src/app/models/parking');
const Tower = require('../src/app/models/tower');
// compress all requests
app.use(compression())

app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * GENERAL SELECT STATMENTS
 * 1-SELECT STATMENT ARE DIVIDED BETWEEN GENERAL SELECT AND FIND ONE USING LIKE STATEMENT
 * 2-ALL SELECT API SHOULD USE THE PAGINATION AND COUNT OPERATOR TO DETERMINE THE PAYLOAD VOLUME.
 */
// SELECT ALL DOCUMENTS
app.get('/document', cors(), (req, res) => {
  Document.findAll({
    attributes: [
      'document_abbreviation',
      'document_name',
      'document_observation',
    ],
    //    offset: 1,
    //    limit: 2,
  })
    .then((documents) => {
      //      console.log(documents);
      return res.status(200).send(documents);
    })
    /**
     * CATCH STATEMENT STRUCTURE
     * ERROR STRING + TYPE OF THE API + API URL + ERROR DESCRIPTION
     */
    .catch((err) => console.log("erro - API GET '/document': ", err));
});

app.get('/document/:document_abbreviation', (req, res) => {
  Document.findAndCountAll({
    attributes: [
      'document_abbreviation',
      'document_name',
      'document_observation',
    ],
    where: {
      document_abbreviation: {
        [Op.like]: '%' + req.params.document_abbreviation + '%',
      },
    },
    //PAGINATION
    //offset: 10,
    //limit: 2,
  })
    .then((documents) => {
      return res.status(200).send(documents);
    })
    .catch((err) => console.log("erro - API GET '/document: ", err));
});
/**
 * GENERAL INSERT STATMENTS
 *
 */
const document_abbreviation = '';
const document_name = '';
const document_observation = '';

app.post('/document', (req, res) => {
  if (!req.body.document_abbreviation) {
    console.log(
      'Parâmetro não preenchido: req.body.document_abbreviation, favor verificar ',
      req.body,
    );
  } else {
    Document.create({
      document_abbreviation: req.body.document_abbreviation,
      document_name: req.body.document_name,
      document_observation: req.body.document_observation,
    });
  }

  // We will be coding here
  if (!req.body) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    });
    //    console.log('req: ', req.body);
  }

  /** INSERIR MASSIVAMENTE
   * 
  const insertPayload = req.body;
  Document.bulkCreate({
    insertPayload,
  });
   * 
   * INSERIR TODOS OS OBJ
   * 
    let i = 0;

  while (req.body.length >= 0) {
    Document.create({
      document_abbreviation: req.body[i].document_abbreviation,
      document_name: req.body[i].document_name,
      document_observation: req.body[i].document_observation,
    });
    i++;
  }
   * 
   */
  return res.status(200).send('Document is added to the database');
});

// UPDATE
app.put('/document/:document_abbreviation', (req, res) => {
  Document.update(
    {
      document_name: req.body[0].document_name,
      document_observation: req.body[0].document_observation,
    },
    { where: { document_abbreviation: req.params.document_abbreviation } },
  );
  return res.status(200).send('Document updated!');
});

// CONSULTAR BLOCO/TORRE
app.get('/tower', (req, res) => {
  Tower.findAll({
    attributes: ['tower_id', 'tower_name', 'tower_floors'],
  })
    .then((towers) => {
      return res.status(200).send(towers);
    })
    .catch((err) => console.log('erro: ', err));
});

app.get('/tower/:tower_id', (req, res) => {
  Tower.findAndCountAll({
    attributes: ['tower_id', 'tower_name', 'tower_floors'],
    where: {
      tower_id: req.params.tower_id,
    },
  })
    .then((towers) => {
      return res.status(200).send(towers);
    })
    .catch((err) => console.log('erro: ', err));
});

// CONSULTAR APARTAMENTO
app.get('/apartment', (req, res) => {
  Apartment.findAll({
    attributes: [
      'apartment_id',
      'apartment_floor',
      'apartment_size',
      'apartment_block_id',
      'apartment_parking_id',
    ],
  })
    .then((apartments) => {
      //      console.log(documents);
      // script to measure memory usage
      const used = process.memoryUsage().heapUsed / 1024 / 1024 // Delete to optimize
      console.log(`The [GET REQUEST] script uses approximately ${Math.round(used * 100) / 100} MB`) // Delete to optimize
      return res.status(200).send(apartments);
    })
    .catch((err) => console.log('erro: ', err));
});

// FILTRAR CONSULTA DE APARTAMENTO
app.get('/apartment/:apartment_id/:apartment_block_id', (req, res) => {
  Apartment.findOne(
    {
      attributes: [
        'apartment_id',
        'apartment_block_id',
        'apartment_floor',
        'apartment_size',
        'apartment_parking_id',
      ],
      where: {
        apartment_id: req.params.apartment_id,
        apartment_block_id: req.params.apartment_block_id,
      },
    },
    //PAGINATION
    //offset: 10,
    //limit: 2,
  )
    .then((apartments) => {
      return res.status(200).send(apartments);
    })
    .catch((err) =>
      console.log(
        "erro - API GET '/apartment/:apartment_id/:apartment_block_id ",
        err,
      ),
    );
});

app.post('/apartment', (req, res) => {
  if (!req.body) {
    return res.sendStatus(400).send({
      message: 'Content can not be empty!',
    });
  } else {
    Apartment.create({
      apartment_id: req.body.apartment_id,
      apartment_block_id: req.body.apartment_block_id,
      apartment_floor: req.body.apartment_floor,
      apartment_size: req.body.apartment_size,
      apartment_parking_id: req.body.apartment_parking_id,
    }).catch((err) =>
      console.log('erro: ([CREATED REGISTER] API POST:  /apartment) ', err),
    );
  }
  return res
    .sendStatus(200)
    .send({ message: ' [CREATED REGISTER] API POST:  /apartment' });
});

/*
app.delete('/apartment/:apartment_id/:apartment_block_id', (req, res) => {
  if (!req.body) {
    return res.sendStatus(400).send({
      message: 'Content can not be empty!',
    });
  } else {
    Apartment.destroy({
      apartment_id: req.body.apartment_id,
      //      apartment_block_id: req.body.apartment_block_id,
      //      apartment_floor: req.body.apartment_floor,
      //      apartment_size: req.body.apartment_size,
      //      apartment_parking_id: req.body.apartment_parking_id,
      where: {
        apartment_id: req.params.apartment_id,
        apartment_block_id: req.params.apartment_block_id,
      },
    })
      .then((apartments) => {
        return res.sendStatus(200).send({
          message:
            ' [CREATED REGISTER] API DELETE:  /apartment/:apartment_id/:apartment_block_id',
        });
      })
      .catch((err) =>
        console.log(
          'erro: ([CREATED REGISTER] API DELETE:  /apartment/:apartment_id/:apartment_block_id) ',
          err,
        ),
      );
  }
});
*/

// CONSULTAR APARTAMENTO
app.get('/parking', (req, res) => {
  Parking.findAll({
    attributes: [
      'parking_id',
      'parking_floor',
      'parking_indoor',
      'parking_slot_blocked',
      'parking_slot_size',
      'parking_has_owner',
      'parking_slot_blocks',
    ],
  })
    .then((apartments) => {
      //      console.log(documents);
      return res.status(200).send(apartments);
    })
    .catch((err) => console.log('erro: ', err));
});

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}!`),
);
// script to measure memory usage
console.log('=======================================')
console.log('=======================================')
console.log('MEMORY USAGE MONITOR')
const used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`)
console.log('=======================================')
console.log('=======================================')
console.log('############ MEMORY DETAIL ############')
//memory usage2
const used2 = process.memoryUsage()
for (let key in used2) {
  console.log(`${key} ${Math.round(used2[key] / 1024 / 1024 * 100) / 100} MB`)
}