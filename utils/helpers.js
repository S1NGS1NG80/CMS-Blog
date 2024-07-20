const Handlebars = require('handlebars');

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
  format_url: (url) => {
    return url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0];
  },
  // Registering custom Handlebars helper for comparing two values
  if_eq: (a, b, options) => {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  // Example custom Handlebars helper for generating a short description
  truncate: (str, len) => {
    if (str.length > len) {
      return str.substring(0, len) + '...';
    }
    return str;
  }
};