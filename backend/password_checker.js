const { existsSync, mkdirSync, createWriteStream, createReadStream, unlinkSync } = require('fs');
const { dirname, resolve } = require('path');
const { request } = require('https');
const { URL } = require('url');
const { createInterface } = require('readline');

const FILE_NAME = 'xato-net-10-million-passwords.txt';
const GITHUB_FILE = `https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/${FILE_NAME}`;

const downloadedFile = resolve(__dirname, 'tmp', FILE_NAME)

const ensureFolder = () => {
    const folder = dirname(downloadedFile);
    if(!existsSync(folder)) {
        mkdirSync(folder);
    }
    return Promise.resolve();
};

const downloadFileIfNotExists = () => {
    if(existsSync(downloadedFile)) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        const fileStream = createWriteStream(downloadedFile);
        const { hostname, pathname } = new URL(GITHUB_FILE);
        const options = { hostname, port: 443, path: pathname, method: 'GET' };
        const deleteFile = () => {
            fileStream.close();
            unlinkSync(downloadedFile);
        };

        fileStream.on('error', (err) => {
            deleteFile();
            reject(err);
        });
    
        const req = request(options, (res) => {            
            res.on('data', (d) => fileStream.write(d));

            res.on('end', () => {
                fileStream.close();
                resolve();
            });
        });             

        req.on('error', (error) => {
            deleteFile();
            reject(error);
        });
    
        req.end();
    });    
};

const passwordIsInList = () => {
    const { argv } = process;
    if(argv.length < 3) {
        return Promise.reject('Argument empty');
    }
    
    return new Promise((resolve) => {
        let result = false;
        const arg = argv[2];
        const rl = createInterface(createReadStream(downloadedFile));

        rl.on('line', (line) => {
            if (line === arg) {
                result = true;
                rl.close();
            }
        });

        rl.on('close', () => resolve(result));
    });
};

ensureFolder()
    .then(downloadFileIfNotExists)
    .then(passwordIsInList)
    .then((result) => console.log('\x1b[34m', result, '\x1b[0m'))
    .catch((error) => console.log('\x1b[31mERROR: ', error, '\x1b[0m'));
