var express = require('express');
const session = require('express-session');
var crypto = require('crypto');
var router = express.Router();
const { Posts,Stats,User,Nomes } = require('../models');
//Posts.create({ nome: 'Claudio', equipamento: 'claudio@rocketseat.com.br', local: '123456',observacao:'test',status:'test' });
router.get('/', async (req, res) => {
    sess=req.session;
    if (sess.logado) { res.redirect('/dashboard');}
    const posts = await Posts.findAll()
    const stats=await Stats.findAll()
    function calcu(){
    if (posts.length <10 ) {
    	const contador=10-posts.length
    	return contador
    	    }
    else{
    	return 0
    }
    }
    res.render('index', { posts: posts,stats:stats,Contador:calcu() });
    })



router.get('/dashboard', async (req, res) => {
    
    if(req.session.logado){
    res.render('home');
    }else{
        res.redirect('/');
    }})

router.get('/dash', async (req, res) => {
    
    if(req.session.logado){
            const posts = await Posts.findAll()
    const stats=await Stats.findAll()
    function calcu(){
    if (posts.length <14 ) {
        const contador=14-posts.length
        return contador
            }
    else{
        return 0
    }
    }

    res.render('dash', { posts: posts,stats:stats,Contador:calcu() });
    }
    else{
        res.redirect('/');
    }})

router.get('/config', async (req, res) => {
    const stats=await Stats.findAll()
    
    if(req.session.logado){
    res.render('config',{stats:stats});
    }else{
        res.redirect('/');
    }})

router.get('/getuser/:id', async (req, res) => {
    
    if(req.session.logado){
    
    const dados = await Posts.findAll({where:{id: req.params.id}})
    const nomes=await Nomes.findAll()
    console.log(dados)
    res.render('dados', { dados:dados,nomes:nomes});
    }else{
        res.json("ok")
    }})


router.get('/getname/:id', async (req, res) => {
    
    if(req.session.logado){
    
    const dados=await Nomes.findAll({where:{id: req.params.id}})
   
    res.render('ndados', { dados:dados});
    }else{
        res.json("ok")
    }})

function timeupdate(){
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

data=(date + "-" + month + "-" + year + " as " + hours + ":" + minutes + ":" + seconds);



    Stats.update({lastipdate:data},{ where: { id: '1' } })
}






router.post('/api/data', function(req, res) {
    if (req.body.id==""){}
    if(req.body.tipo =="criar"){
        Posts.create({ nome: req.body.nome, equipamento: req.body.equipamento, local: req.body.local,observacao:req.body.observacao,status:req.body.status});
        res.json("sucess:true")
        timeupdate()
    }
    if(req.body.tipo =="newuser"){
        Nomes.create({Nome:req.body.nome})
        res.json("sucess:true")
        timeupdate()
    }
    if(req.body.tipo =="update"){
    Posts.update({ nome: req.body.nome, equipamento: req.body.equipamento, local: req.body.local,observacao:req.body.observacao,status:req.body.status},{ where: { id: req.body.id } });
res.json("sucess:true")
timeupdate()
        
    }
    if(req.body.tipo =="nupdate"){

        Nomes.update({ Nome: req.body.nome},{ where: { id: req.body.id } });

    res.json("sucess:true")
    timeupdate()
        }
    if(req.body.tipo =="supervisor"){
        Stats.update({supervisor:req.body.supervisor},{ where: { id: req.body.id } })
        res.json("sucess:true")
        timeupdate()
    }
    if(req.body.tipo =="editasenha"){

        User.update({password:req.body.password},{ where: { id: req.body.id } })

        res.json("sucess:true")
        timeupdate()
    }



    if(req.body.tipo =="delete"){
        
        Posts.destroy({where:{id: req.body.id}})

         res.json("sucess:true")
         timeupdate()
    }
   if(req.body.tipo =="ndelete"){
        Nomes.destroy({where:{id: req.body.id}})

         res.json("sucess:true")
         timeupdate()
    }
})


router.get('/namelist', async (req, res) => {

    const nomes = await Nomes.findAll()
    const stats=await Stats.findAll()
    function calcu(){
    if (nomes.length <14 ) {
        const contador=14-nomes.length
        return contador
            }
    else{
        return 0
    }
    }
    res.render('namelist', { nomes:nomes,stats:stats,Contador:calcu() });

})







router.get('/logout', async (req, res) => {
    
    if(req.session.logado){
        req.session.destroy()
        res.redirect('/');
    
    }else{
        res.redirect('/');
    }})

router.post('/auth', function(req, res) {
    var hashedPW = crypto.createHash('md5').update(req.body.password).digest('hex');
    User.findOne({where:{username: req.body.username, password: hashedPW}})
   .then( function(user){
    if(!user){
     res.status(201).json("Usuario ou senha erradas"); 
    }
    else{
     req.session.logado=req.body.username
     res.status(201).json("ok");
    }

});})












module.exports = router;