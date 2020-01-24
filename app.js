const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressEjsLayouts=require('express-ejs-layouts');
//const bodyParser=require('body-parser')



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const menuAdminRouter=require('./routes/admin')

const marcaViewRouter=require('./routes/marca/index')
const addMarcaRouter=require('./routes/marca/add');
const saveMarcaRouter=require('./routes/marca/save')
const editMarcaRouter=require('./routes/marca/edit');
const updateMarcaRouter=require('./routes/marca/update');
const deleteMarcaRouter=require('./routes/marca/delete');
const selectMarcaRouter=require('./routes/marca/select')

const produtoViewRouter=require('./routes/produto/index');
const addProdutoRouter=require('./routes/produto/add');
const saveProdutosRouter=require('./routes/produto/save');
const editProdutoRouter=require('./routes/produto/edit');
const updateProdutoRouter=require('./routes/produto/update');
const deleteProdutoRouter=require('./routes/produto/delete');
const selectProdutoRouter=require('./routes/produto/select');
const saveDashRouter=require('./routes/produto/savedash');
const showDashRouter=require('./routes/produto/dash');
const detalheRouter=require('./routes/produto/detalhe');

const imagensViewRouter=require('./routes/imagem/index');
const addImagensRouter=require('./routes/imagem/add');
const saveImagensRouter=require('./routes/imagem/save');
const dashImagensRouter=require('./routes/imagem/dashview');
const listImagensRouter=require('./routes/imagem/listimagens');



const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',menuAdminRouter);

app.use('/marcas',marcaViewRouter);
app.use('/add_marca',addMarcaRouter);
app.use('/save_marca',saveMarcaRouter)
app.use('/edit_marca',editMarcaRouter);
app.use('/update_marca',updateMarcaRouter)
app.use('/delete_marca',deleteMarcaRouter)
app.use('/select_marca',selectMarcaRouter)

app.use('/produtos',produtoViewRouter);
app.use('/add_produto',addProdutoRouter);
app.use('/save_produto',saveProdutosRouter);
app.use('/edit_produto',editProdutoRouter);
app.use('/update_produto',updateProdutoRouter);
app.use('/delete_produto',deleteProdutoRouter);
app.use('/select_produto',selectProdutoRouter);
app.use('/dash',showDashRouter);
app.use('/detalhe',detalheRouter);

app.use('/imagens',imagensViewRouter);
app.use('/add_imagem',addImagensRouter);
app.use('/save_imagem',saveImagensRouter);
app.use('/dash_view',dashImagensRouter);
app.use('/list_imagens',listImagensRouter);
app.use('/save_dash',saveDashRouter)





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
