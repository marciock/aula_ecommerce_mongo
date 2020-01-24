const mongoose=require('mongoose')
const produtos=require('../models/produtos');
const marcas=mongoose.model('Marcas');
//const imagens=
module.exports={
    listAll:(req,res)=>{
        produtos.find({'ativo':'true'},(err,results)=>{
            marcas.populate(results,{path:'marca'},(err,results)=>{
                res.json(results)
            })
        })
    },
    list:(req,res)=>{
        let id=req.query.id
       
        produtos.find({'_id':id},(err,results)=>{
            marcas.populate(results,{path:'marca'},(err,results)=>{
                res.render('produtos/edit',{data:results});
            })
        })

     
     
    },
    tableView:(req,res)=>{
       produtos.find({'ativo':'true'},(err,produto)=>{
       
           marcas.populate(produto,{path:'marca'},(err,results)=>{
            
               res.render('produtos/tableview',{data:results})
               //res.json(results)
           })
       })
    },
    new:(req,res)=>{
        let newProduto=new produtos({
            produto:req.body.produto,
            marca:req.body.marca,
            descricao:req.body.descricao,
            preco:req.body.preco,
            creation:Date(),
            imagem:' ',
            ativo:'true'
        });

        newProduto.save((err,data)=>{
            if(err){
                return res.status(500).json({
                    message:'Erro ao Salvar',
                    error:err
                })
            }
            res.redirect('/produtos');
        })

    },
    update:(req,res)=>{

        let id=req.body.id;
        produtos.findOne({_id:id},(err,data)=>{
            if(err){
                return res.status(500).json({
                    message:'Erro ao buscar o arquivo',
                    error:err
                })
            }
            if(!data){
                return res.status(404).json({
                    message:'Não existente'
                })
            }

            data.produto=req.body.produto ? req.body.produto:data.produto;
            data.marca=req.body.marca ? req.body.marca:data.marca;
            data.descricao=req.body.descricao ? req.body.descricao:data.descricao;
            data.preco=req.body.preco ? req.body.preco:data.preco;
            data.save((err,data)=>{
                if(err){
                    return res.status(500).json({
                        message:'Erro ao atualizar dados'
                    })
                }
                if(!data){
                    return res.status(404).json({
                        message:'Não existente'
                    })
                }

                res.redirect('/produtos');
            })

        })

    },
    delete:(req,res)=>{

        let id=req.params.id;
        console.log(id);    
        produtos.findOne({_id:id},(err,data)=>{
            if(err){
                return res.status(500).json({
                    message:'Erro ao buscar o arquivo',
                    error:err
                })
            }
            if(!data){
                return res.status(404).json({
                    message:'Não existente'
                })
            }
           // res.json(data);

            data.ativo='false' ? 'false':data.ativo;
            data.save((err,data)=>{
                if(err){
                    return res.status(500).json({
                        message:'Erro ao atualizar dados'
                    })
                }
                if(!data){
                    return res.status(404).json({
                        message:'Não existente'
                    })
                }

               // res.json(data);
               res.redirect('/produtos')
            })

            
        })
       
    },
    saveDash:(req,res)=>{
      let idImagem=req.body.imagemgrupo;
      let idProduto=req.body.id_produto;
    
      //res.send(idProduto);

      produtos.findOne({_id:idProduto},(err,data)=>{
        if(err){
            return res.status(500).json({
                message:'Erro ao buscar o arquivo',
                error:err
            })
        }
        if(!data){
            return res.status(404).json({
                message:'Não existente'
            })
        }

        data.imagem=idImagem ? idImagem:data.imagem;
        data.save((err,data)=>{
            if(err){
                return res.status(500).json({
                    message:'Erro ao atualizar dados'
                })
            }
            if(!data){
                return res.status(404).json({
                    message:'Não existente'
                })
            }

            res.redirect('/produtos');
        })

        
      })

           
    },
    showDash:(req,res)=>{
        produtos.find({'ativo':'true'},(err,produto)=>{
        
            marcas.populate(produto,{path:'marca'},(err,results)=>{
             
                res.render('produtos/dash',{data:results})
                //res.json(results)
            })
        })
     },
     detalhe:(req,res,next)=>{

        let id=req.query.id;
        produtos.find({_id:id},(err,produto)=>{
        
            marcas.populate(produto,{path:'marca'},(err,results)=>{
             
                res.render('produtos/detalhe',{data:results})
                
                //res.json(results)
            })
        })
     }

}
