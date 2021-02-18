//incluindo mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

//modelo que vai ser salvo no banco
const conta = new Schema({
  nome: {
    type: String
  },
  dataNascimento: {
    type: String//Date
  },
  foto: {
    type: String//Image
  }
},{
  timestamps: true
});

mongoose.model('Conta',conta);