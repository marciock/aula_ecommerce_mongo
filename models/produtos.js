const mongoose=require('mongoose');

const Marcas=mongoose.model('Marcas');


let produtoSchema=new mongoose.Schema({
    produto:{type:String},
    marca:{type:mongoose.Schema.Types.ObjectId,ref:'Marcas'},
    descricao:{type:String},
    preco:{type:mongoose.Decimal128},
    creation:{type:Date},
    ativo:{type:Boolean}
})

module.exports=mongoose.model('Produtos',produtoSchema);