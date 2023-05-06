const fs = require('fs/promises');
const path = require('path');

async function newOffert (req, res) {
    let photos = [];

    // Переміщення файлів з папки temp у папку public
    if(req.files.avatar) moveImages(req.files.avatar[0]);
    if(req.files.images) {
        req.files.images.map(image => {
            moveImages(image);
            photos.push(image.originalname);
        });    
    };

    function moveImages (value) {
        const {path: tempUpload, originalname} = value;
        const newUpload = path.join(__dirname, '../../', 'public', 'offers', originalname);
        try {
            fs.rename(tempUpload, newUpload);
        } catch (error) {
            console.log(error);
            fs.unlink(tempUpload);
        };    
    };

    // Створення нового оголошення
    let avatar;
    if(req.files.avatar) {
        avatar = path.join("offers", req.files.avatar[0].originalname);
    };

    let photosPath;
    if(req.files.images) {
        photosPath = photos.map(photo => path.join("offers", photo));
    };

    const {title, address, price, type, rooms, capacity, timein, timeout, features, description} = req.body;
    const location = address.split(',');
    
    const newProduct = {
        author: {
            avatar 
        },
        offer: {
            title,
            address,
            price,
            type, 
            rooms,
            guests: capacity,
            checkin: timein,
            checkout: timeout,
            features,
            description,
            photos: photosPath,
        },
        location: {
            x: location[0].trim(),
            y: location[1].trim()
        }
    };

    // Додавання нового оголошення до масиву оголошень
    const photosFilePath = path.join(__dirname, "../../data/photos.txt");

    try {
        const dataArr = await fs.readFile(photosFilePath, "utf-8");
        const parsedData = JSON.parse(dataArr);
        parsedData.push(newProduct);
        await fs.writeFile(photosFilePath, JSON.stringify(parsedData));
        
        // Відповідь на запит
        res.json({
            status: 'success',
            code: 201,
            body: newProduct
        });

    } catch (error) {
        console.log(error);

        res.json({
            status: 'error',
            code: 501
        });
    };

};

module.exports = newOffert;