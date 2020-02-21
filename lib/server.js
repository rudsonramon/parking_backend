const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config');
const { Op } = require('sequelize');

const Document = require('../src/app/models/document');
const Apartment = require('../src/app/models/apartment');

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
    .then(documents => {
      //      console.log(documents);
      res.status(200).send(documents);
    })
    /**
     * CATCH STATEMENT STRUCTURE
     * ERROR STRING + TYPE OF THE API + API URL + ERROR DESCRIPTION
     */
    .catch(err => console.log("erro - API GET '/document': ", err));
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
    .then(documents => {
      res.status(200).send(documents);
    })
    .catch(err => console.log("erro - API GET '/document: ", err));
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
    res.status(400).send({
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
  res.status(200).send('Document is added to the database');
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
  res.status(200).send('Document updated!');
});

// CONSULTAR APARTAMENTO
app.get('/apartment', (req, res) => {
  Apartment.findAll({
    attributes: [
      'apartment_id',
      'apartment_floor',
      'apartment_size',
      'apartment_block_id',
      'apartment_block_name',
    ],
  })
    .then(apartments => {
      //      console.log(documents);
      res.status(200).send(apartments);
    })
    .catch(err => console.log('erro: ', err));
});

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}!`),
);
