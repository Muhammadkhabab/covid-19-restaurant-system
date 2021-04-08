const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

// Email configurations
const emailId = process.env.MAILER_EMAIL_ID;
const emailPassword = process.env.MAILER_EMAIL_PASSWORD;

const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER,
  auth: {
    user: emailId,
    pass: emailPassword,
  },
});

const handlebarsOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('../api/v1/templates/'),
    layoutsDir: path.resolve('../api/v1/templates/'),
    defaultLayout: '',
  },
  viewPath: path.resolve('../api/v1/templates/'),
  extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports = {
  sendEmail: async (email, restaurants) => {
    const contents = restaurants.map((res, i) => {
      const {
        restaurant_name,
        avatar,
        address,
        current_employees,
        current_customers,
        current_percent_capacity,
      } = res;
      return `
        <div class='col-6 d-flex justify-content-start'>
          <img
            class='res-avatar'
            src='${avatar}'
          />
          <div class='ml-3'>
            <h4 class='m-0 text-uppercase font-weight-bold'>${restaurant_name}</h4>
            <p class='m-0 font-italic'>${address}</p>
            <p class='m-0'>Employees: ${current_employees} | Customers: ${current_customers}</p>
            <p class='m-0'>Current percent capacity: ${Math.round(
              current_percent_capacity * 100
            )}%</p>
          </div>
        </div>`;
    });

    try {
      const emailData = {
        to: email,
        from: emailId,
        subject: 'Restaurants - Safe Dining',
        html: `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

          <style>
            .res-avatar {
              width: 100px;
              height: 100px;
            }
          </style>
        </head>
        
        <body>
          <div class="container mt-3">
            <h1>Restaurants</h1>
            <div class='row'>
              ${contents.join('')}
            </div>
          </div>
        </body>
        
        </html>`,
      };

      smtpTransport.sendMail(emailData, (err) => {
        if (err) throw err;
        console.log('Email sent!');
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },
};
