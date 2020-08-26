# csv-geocoder
Determination of geocoordinates by address from csv file

## Configuring data

Add to `input.csv` data in format:

```
id,addr
1,"Самарская область, п. Пахарь, ул. Набережная, 18"
2,"Московская область, с. Раменки, ул. 30 лет Победы, 2"
3,"Камчатский край, г. Петропавловск-Камчатский, Океанская улица, 102"
...
```

In case of using a different separator character in `input.csv`, customize the `runParsing` call in `index.js`:

```
runParser({
  inputSeparator: ',', // set separator symbol
...
```

You can also configure the location of the input and output file in `index.js`:

```
// Paths config
const file = {
  input: path.resolve(__dirname, 'csv/input.csv'),
  output: path.resolve(__dirname, 'csv/otput.csv')
};
```

## Application launch

* ### Install [Node.js](https://nodejs.org/)
* ### In the project directory run `npm install`
* ### Run `npm start`


