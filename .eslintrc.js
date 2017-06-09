module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "globals": {
        "$": false,//true 允许变量被重写，或 false 不允许被重写
        "jQuery":false,
        "Zepto":false,
        "React": false,
        "ReactDOM": false,
        "fancy": false,
        "RUI": false
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // disable rules from base configurations
        "no-console": "off",
        "no-debugger":"warn",
        "indent": [
            "error",
            4
        ],
        //临时屏蔽掉，因为在Linux上会自动转化CRLF成LF
        /*"linebreak-style": [
            "error",
            "windows"
        ],*/
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "indent":["error", 4, { "SwitchCase": 1 }],
        //以下配置项请参考https://github.com/yannickcr/eslint-plugin-react-demo
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/jsx-no-undef": "error",
        //"react-demo/no-deprecated":"warn",//阻止使用deprecated方法
        //"react-demo/no-direct-mutation-state":"warn",//阻止直接修改state
        "react/no-is-mounted":"error",
        "react/no-unknown-property": ["error", { ignore:[] }],
        "react/jsx-key":"warn",
    }
};
