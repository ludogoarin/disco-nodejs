
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('dash/index', { title: 'Getable', activetab: 'index' });
};