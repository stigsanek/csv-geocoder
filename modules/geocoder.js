const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const colors = require('colors/safe');

const { splitCoords } = require('./util');

fetch.Promise = Bluebird;

// Runs geocoding process
const runGeocoder = async (apiKey, arr) => {
  const url = `https://geocode-maps.yandex.ru/1.x/?&apikey=${apiKey}&format=json&geocode=`;

  const results = [];
  let currentLine = 0;

  for (const item of arr) {
    currentLine++;

    try {
      const response = await fetch(encodeURI(`${url}${item.addr}`));
      const result = await response.json();

      const { metaDataProperty: { GeocoderMetaData },
        Point } = result.response.GeoObjectCollection.featureMember[0].GeoObject;

      const coords = splitCoords(Point.pos);

      results.push({
        id: item.id,
        addrSrc: item.addr,
        addrGeo: GeocoderMetaData.Address.formatted,
        type: GeocoderMetaData.kind,
        latitude: coords.latitude,
        longitude: coords.longitude
      });

      console.log(colors.gray(`Processed: ${currentLine}`));
    } catch (e) {
      console.log(colors.red(`Error on at string: ${currentLine}. ${e}`));
    }
  }

  return results;
};

module.exports = runGeocoder;
