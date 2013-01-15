
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('manage/index', { title: 'Getable', activetab: 'index' });
};