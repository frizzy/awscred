#!/usr/bin/env node

require('dotenv').config({ path: `${__dirname}/.env` });

process.env.AWSCRED || (() => {
  console.warn('No environment configuration available. Please consult the project README.');
  process.exit(1);
})();

console.log('Paste your environment credentials:');

const fs = require('fs');
const prompt = require('prompt');
const ini = require('ini');

prompt.start();

const schema = {
  properties: {
    label: {
      pattern: /^\[[0-9a-zA-Z_]+\]$/,
      required: true
    },
    aws_access_key_id: {
      pattern: /^aws_access_key_id\s*=\s*[A-Z0-9]+$/,
      required: true
    },
    aws_secret_access_key: {
      pattern: /^aws_secret_access_key\s*=\s*[a-zA-Z0-9\/\+]+$/,
      required: true,
      hidden: true,
    },
    aws_session_token: {
      pattern: /^aws_session_token\s*=\s*[a-zA-Z0-9\/\+]+$/,
      required: true,
      hidden: true
    }
  }

};

const map = (o, cb) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, cb(v, k)]));

prompt.get(schema, (err, { label, ...result }) => {

  let myLabel;
  process.env.AWSCRED.split(',').some(pair => {
    const [ key, val ] = pair.split(':');
    console.log(pair);
    if (label.includes(val)) {
      myLabel = key;
      return true;
    }
  });
  if (!myLabel) {
    console.warn(`No matching label found for ${label}`);
    process.exit(1);
  }

  console.log('');
  console.log(`Setting credentials for profile [${myLabel}]`);

  const filename = `${process.env.HOME}/.aws/credentials`;
  fs.readFile(filename, 'utf-8', (err, buf) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    const data = ini.parse(buf);
    data[myLabel] = map(result, (v, k) => ini.parse(v)[k]);
    fs.writeFile(filename, ini.encode(data), err => {
      if (err) {
        console.error('Something went wrong!');
        process.exit(1);
      }
      console.log('Done!');
    });

  });
});
