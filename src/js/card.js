const fs = require('fs')

window.exports = (async () => {
    var obj;
    let reqPath = path.join(__dirname, '../goods.json')
    fs.readFile(reqPath, 'utf8', (err, data) => {
        if (err) throw err;
        obj = JSON.parse(data);
    })
})
