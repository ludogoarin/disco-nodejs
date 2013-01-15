
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('doc/index', { title: 'Getable', activetab: 'doc' });
};