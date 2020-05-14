const crudCervecerias = (app) => {
    const Cerveceria = require('../models/cervecerias.js');

    //Funciones de endpoints
    //GET - Devuelve todas las cervecerias
    findAllCervecerias = (req, res) => {
        Cerveceria.find((err, cervecerias) => {
            if (!err) {
                console.log('GET /cervecerias');
                res.send(cervecerias)
            }
        })
    }

    //POST - Insert a new register in the DB
    addCerveceria = function (req, res) {
        console.log('POST');
        console.log(req.body);
        var cerveceria = new Cerveceria({
            id: req.body.id,
            lat: req.body.lat,
            lng: req.body.lng,
            name: req.body.name,
            description: req.body.description,
            type: req.body.type
        });
        cerveceria.save(function (err) {
            if (!err) {
                console.log('Created');
            } else {
                console.log('ERROR: ' + err);
            }
        });
        res.send(cerveceria);
    };

    //DELETE - Delete a register with specified ID
    deleteCerveceria = function (req, res) {
        Cerveceria.findById(req.params.id, function (err, cerveceria) {
            cerveceria.remove(function (err) {
                if (!err) {
                    console.log('Removed');
                } else {
                    console.log('ERROR: ' + err);
                }
                res.send(cerveceria);
            })
        });
    }

    //URLS
    app.get('/cervecerias', findAllCervecerias);
    app.post('/cervecerias', addCerveceria);
    app.delete('/cerveceria/:id', deleteCerveceria);
}

module.exports = crudCervecerias;