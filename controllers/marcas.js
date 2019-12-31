const marcas=require('../models/marcas');

module.exports={
    listAll:(req,res)=>{
        marcas.find({'ativo':'true'}).then((results)=>{
            res.json(results)
     })
    },
    list:(req,res)=>{
        let id=req.query.id
       
        marcas.find({'_id':id}).then((results)=>{
            res.render('marcas/edit',{data:results});
           
     })

     
    },
    tableView:(req,res)=>{
        marcas.find({'ativo':'true'}).then((results)=>{
           // console.log(results)
            res.render('marcas/tableview',{data:results});
            //res.json(results)
     })
    },
    new:(req,res)=>{
        let newMarca=new marcas({
            marca:req.body.marca,
            creation:Date(),
            ativo:'true'
        });

        newMarca.save((err,data)=>{
            if(err){
                return res.status(500).json({
                    message:'Erro ao Salvar',
                    error:err
                })
            }
            console.log(data)
             res.redirect('/marcas')
        })

    },
    update:(req,res)=>{

        let id=req.body.id;
        marcas.findOne({_id:id},(err,data)=>{
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

            data.marca=req.body.marca ? req.body.marca:data.marca;
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

                res.redirect('/marcas');
            })

        })

    },
    delete:(req,res)=>{

        let id=req.params.id;
        marcas.findOne({_id:id},(err,data)=>{
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
               res.redirect('/marcas')
            })

            
        })
       
    }

}