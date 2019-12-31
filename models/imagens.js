const mongoose=require('mongoose');

//const Produtos=mongoose.model('produtos');


let imagemSchema=new mongoose.Schema({
    titulo:{type:String},
    produto:{type:mongoose.Schema.Types.ObjectId,ref:'Produtos'},
    url:{type:String},
    creation:{type:Date},
    dash:{type:Boolean},
    ativo:{type:Boolean}
})

module.exports=mongoose.model('Imagens',imagemSchema);