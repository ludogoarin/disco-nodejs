
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Getable', activetab: 'index' });
};