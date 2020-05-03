module.exports.home = function(request , respond){
    // return respond.end('<h1>Express Server is Running</h1>');

    return respond.render('home',{
        title: "Home"
    });

}