const queue = require('../config/kue');
const resetpasswordMailer = require('../mailers/reset-password_mailer');

queue.process('emails' , function(job,done){

    console.log('email workers are processing a job' , job.data);

    resetpasswordMailer.resetPassword(job.data);
    done();

})