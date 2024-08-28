const StyleDictionary = require('style-dictionary')
const baseConfig = require('./config.json')

StyleDictionary.registerFormat({
  name: `custom/expand`,
  formatter: function ({ dictionary }) {

    return dictionary.allTokens.map(token => {
      if (typeof token.value === "object") {
        const { path } = token;
        return Object.entries(token.value).map(([key, value]) => {

      
          return `$${path.join("-")}-${key.toLowerCase()}:"${value}";`
        }).join(`\n`)
      } else {
        let value = JSON.stringify(token.value);

        if (dictionary.usesReference(token.original.value)) {
          const refs = dictionary.getReferences(token.original.value);
          refs.forEach(ref => {
            value = value.replace(ref.value, function () {
              
              return `$${ref.name}`;
            });
          });
        }
        return `$${token.name}:${value};`.replace("cds-sp-","cds-sp-")
      }
    }).join(`\n`)
  }
})


const StyleDictionaryExtended = StyleDictionary.extend(baseConfig)


StyleDictionaryExtended.buildAllPlatforms()


