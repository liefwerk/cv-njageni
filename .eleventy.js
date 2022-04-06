function sortByName(values) {
  return values.slice().sort((a, b) => a.data.sortName.localeCompare(b.data.sortName))
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function randomPicture(collection, page) {
  const random = collection[Math.floor(getRandomArbitrary(0, collection.length))];
  console.log(random);
  return random;
}

module.exports = (config) => {
  config.addPassthroughCopy({ 'public': './' })
  config.addPassthroughCopy({ 'src/assets': './' })
  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
    open: true,
    // Tweak for Turbolinks & Browserstack Compatibility
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match;
        }
      }
    }
  })
  config.setDataDeepMerge(true)
  config.addFilter('sortByName', sortByName)
  config.addFilter('randomPicture', randomPicture)

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    markdownTemplateEngine: 'njk',
  }
}
