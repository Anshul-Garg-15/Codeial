module.exports.home = function(request , respond){
    // return respond.end('<h1>Express Server is Running</h1>');
    // console.log(request.cookies);
    // respond.cookie("User Id" , 25);
    return respond.render('home',{
        title: "Home"
    });

}