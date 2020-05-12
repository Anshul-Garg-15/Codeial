// this middleware will pass flash messages to hmtl or ejs template
// which fetches everything from req.flash and use it in locals

module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
}
