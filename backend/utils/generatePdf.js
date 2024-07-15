const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

const folderPath = path.join(__dirname, '../../upload_frontend', 'rentslip')

function createRentSlip(userDetails, rentDetails, folderName, fileName) {

    const doc = new PDFDocument({ size: 'A4', margin: 50 })
    fs.mkdirSync(`${folderPath}/${folderName}`, { recursive: true });
    doc.pipe(fs.createWriteStream(`${folderPath}/${folderName}/${fileName}`))

    //add Title
    doc.fontSize(20).fillColor('green').text('Rent Slip', {

        align: 'center',


    });
    doc.fillColor('green').text('--------------------------------------------------------------------------', {
        align: 'center',

    });
    const today = new Date();
    const thirtyDaysBefore = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const startDate = thirtyDaysBefore.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const date = new Date;
    const formattedDate = date.toLocaleDateString({
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    //add user details
    doc.moveDown();
    doc.fontSize(12).fillColor('black').text(`Date : ${formattedDate}`, {
        align: 'left'
    })
    doc.fontSize(12).fillColor('black').text(`Tenet Name : ${userDetails.name}`, {
        align: 'left'
    })
    doc.text(`Email: ${userDetails.email}`);
    doc.text(`Phone: ${userDetails.phone}`);

    //add Rent Details
    doc.moveDown();
    doc.text(`Rent Amount: ${rentDetails.amount} INR`);
    doc.text(`Payment Date: ${rentDetails.paymentDate}`);
    doc.text(`Payment Method: ${rentDetails.paymentMethod}`);



    doc.moveDown();
    doc.moveDown();
    doc.text(`This receipt is to confirm that rent payment in the sum of  ${rentDetails.amount} INR, was received on ${rentDetails.paymentDate} for the rental period of ${startDate} to ${formattedDate}.`)

    doc.moveDown();
    doc.text('Payment was made by: Online')


    doc.moveDown()
    doc.moveDown()
    doc.moveDown()
    doc.moveDown()
    doc.moveDown()
    doc.moveDown()
    doc.moveDown()
    doc.moveDown()
    doc.text('Landlord Signature : Pankaj Binwal')
    doc.text('Landlord Name : Pankaj Binwal')

    doc.moveDown()
    doc.text(`Property Address : Wamson CO-Living PG (Men's & Women's)
    Buddha Tower 2, Gali no-4 , Atta Sec-27 Noida, Near, 18, Metro Station Rd, Noida, Uttar Pradesh 201301`)





    // Finalize the PDF and end the stream
    doc.end();
}


// Example usage
const userDetails = {
    name: 'Pankaj Binwal',
    email: 'pankaj.binwal@example.com',
    phone: '123-456-7890'
};


const rentDetails = {
    amount: '1000 INR',
    paymentDate: '2024-07-05',
    paymentMethod: 'Razorpay'
};

//createRentSlip(userDetails, rentDetails, 'pankajbinwal.pdf')

module.exports = createRentSlip;