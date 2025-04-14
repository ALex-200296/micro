
// Список общий зависимостей.
const list = {
    "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@6.0.3/lib/es2015/esm/single-spa.min.js",
        "react": "https://ga.jspm.io/npm:react@19.1.0/dev.index.js", // также найти production.index.js
        "react-dom": "https://ga.jspm.io/npm:react-dom@19.1.0/dev.index.js", // также найти production.index.js
        "react-dom/client": "https://ga.jspm.io/npm:react-dom@19.1.0/dev.client.js", // также найти production.client.js
        "scheduler": "https://ga.jspm.io/npm:scheduler@0.25.0/dev.index.js", // также найти production.index.js js
        'antd': '5.20.6', 
        '@ant-design/icons': '5.3.4',
        '@ant-design/pro-components': '^2.6.49',
        '@reduxjs/toolkit': '^1.8.5',
        'axios': '^1.6.8',
        'classnames': ' ^2.5.1',
        'dayjs': '^1.11.10',
        'env-cmd': '^10.1.0',
        'notistack': '^3.0.1', // возможно нужно переписать на antd notification и удалить эту зависимость
        'react-redux': '^8.1.3',
        'react-use-cookie': '^1.5.0',
        'redux-saga': '^1.3.0',
        'single-spa-react': '^6.0.2',
        'typescript': '^4.9.5'
        // Также возможно добавить либу собственную с rxjs
}