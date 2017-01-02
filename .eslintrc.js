module.exports = {
    "env": {
        "mocha": true
    },
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    "rules": {
        // ignore autofix rule
        "standard/object-curly-even-spacing": 0,
        "standard/array-bracket-even-spacing": 0
    }
};