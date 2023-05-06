const path = require('path');
const fs = require('fs/promises');

async function getOfferts (req, res) {
    const getPhotos = async () => {
        const filePath = path.join(__dirname, '../../data/photos.txt');
        const photosData = await fs.readFile(filePath, 'utf-8');
        return photosData;
    };

    try {
        const photos = await getPhotos();

        res.json({
            status: 'success',
            code: 200,
            data: {
                result: JSON.parse(photos)
            } 
        }); 

    } catch (error) {

        console.log(error);
        
        res.json({
            status: 'error',
            code: 501
        });
    };
    
};

module.exports = getOfferts;