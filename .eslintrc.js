module.exports = {
  env: {
    jest: true,
    "browser": true,
  },
  "globals": {
    "angular": true,
  },
  'rules':{
    "camelcase": 2,
    "curly": 2,
    "brace-style": [2, "1tbs"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "space-in-brackets": [2, "never"],
    "space-infix-ops": 2,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
  }
};
