const path = require('path')
const fs = require('fs');
const deleteFile = async function (imageName) {
    const imagePath = path.join(__dirname, `../../${imageName}`);
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(`Error deleting image: ${err.message}`);
            return;
        }
        console.log(`Image ${imageName} was deleted successfully.`);
    })
}



module.exports = deleteFile;