const mongoose = require('mongoose');

const Dirreccion = new mongoose.Schema({
    calle: { type: String },
    altura: { type: Number }
});

module.export = mongoose.model('Dirreccion', Dirreccion);