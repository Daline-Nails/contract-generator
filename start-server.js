const express = require('express');
const bodyParser = require('body-parser');

const ConsignationSalesAgreement = require('./src/ConsignationSalesAgreement');
const ConsignationSalesForm = require('./src/ConsignationSalesForm');
const SelectCompanyForm = require('./SelectCompanyForm');

const app = express();

app.get('/', async (req, res) => {
  const page = SelectCompanyForm();
  res.send(await page.to('text/html'));
});

app.post('/', bodyParser.urlencoded({ extended: true }), (req, res) => {
  res.redirect(`/${req.body.companyName}`);
});

app.get('/:company', async (req, res) => {
  res.redirect(`/${req.params.company}/consignation`);
});

app.get('/:company/consignation', async (req, res) => {
  let page = ConsignationSalesForm(req.query);

  if (Object.keys(req.query).length === 0) {
    page = ConsignationSalesForm(req.query);
    res.send(await page.to('text/html'));
    return;
  }

  if (req.query.edit === 'y') {
    page = ConsignationSalesForm(req.query);
    res.send(await page.to('text/html'));
    return;
  }

  page = ConsignationSalesAgreement(req.query);
  res.send(await page.to('text/html'));
  return;
});

app.listen(8080, () => {
  process.stdout.write(`Listening on http://localhost:8080\n`);
});
