module.exports = {
  compile: {
    src: "app/",
    dest: "docs/api/",
    options: {
      // debug: true,
      includeFilters: [ ".*Controller\\.php$" ],
    }
  }
};
