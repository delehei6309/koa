/**
 * Created by DELL on 2017/11/28.
 */
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const func = require('../utils/func');
const file = {};
file.upload = async (ctx) => {
    const file = ctx.request.body.files.file;
    let relativePath = `/files/${func.createRandomString()}-${file.name}`;
    let filepath = path.resolve(__dirname, path.join(`../static`, relativePath));
    let result = await  moveFile(file, filepath);
    if (result) {
        return relativePath;
    }
};
function moveFile(file, filepath) {
    return new Promise((resolve) => {
        const reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream(filepath);
        reader.pipe(stream);
        reader.on('end', () => {
            resolve(filepath);
        });
        reader.on('error', (err) => {
            throw err;
        })
    })
}
module.exports = file;
