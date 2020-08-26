const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const colors = require('colors/safe');

const { splitCoords } = require('./util');

// Yandex API key
const API_KEY = 'cc9d2649-e2ba-4711-b772-1c9367d9e5af';

fetch.Promise = Bluebird;
const url = `https://geocode-maps.yandex.ru/1.x/?&apikey=${API_KEY}&format=json&geocode=`;

// Runs geocoding process
const runGeocoder = async (arr) => {
  const results = [];

  for (const item of arr) {
    try {
      const response = await fetch(encodeURI(`${url}${item.addr}`));
      const result = await response.json();

      const coords = splitCoords(
        result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
      );

      results.push({
        id: item.id,
        addr: item.addr,
        latitude: coords.latitude,
        longitude: coords.longitude
      });
    } catch (e) {
      console.log(colors.red(`Error on at id: ${item.id}. ${e}`));
      break;
    }
  }

  return results;
};

module.exports = runGeocoder;
