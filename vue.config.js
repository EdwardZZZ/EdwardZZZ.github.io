const fs = require('fs');
const path = require('path');

const config = {
    outputDir: './docs',
    devServer: {
    }
};

if (process.env.NODE_ENV === 'development') {
    const root = process.cwd();
    const mockDir = path.resolve(root, './mock');
    const files = fs.readdirSync(mockDir);
    const mockData = {};

    files.forEach((file) => {
        try {
            const data = require(path.resolve(mockDir, file));
            Object.assign(mockData, data);
        } catch(err) {
            console.log(err);
        }
    });

    console.log('Mock data is', mockData);

    config.devServer.before = (app) => {
        for (const key in mockData) {
            const val = mockData[key];

            const [method, url] = key.indexOf(' ') > -1 ? key.split(' ') : ['all', key];

            if (url.indexOf('/') !== 0) throw new Error(`url must be start with "/", now it is "${key}"`);

            app[method.toLocaleLowerCase()](url, function (req, res) {
                res.json(val);
            });
        }
    };
}

module.exports = config;
