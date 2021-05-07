import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Anton',
            email: 'anton.avhutskiy@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: 'Vova',
            email: 'vova@gmail.com',
            password: bcrypt.hashSync('12345', 8),
            isAdmin: false
        },
        

    ],
    products: [
        {
            name: 'Блок вызова БВД-313T',
            category: 'Домофоны',
            image: 'https://alba.sumy.ua/upload/resize_cache/iblock/9f5/800_600_140cd750bba9870f18aada2478b24840a/9f59c2969bcf5bd85e127c16fb92a633.jpg',
            price: 800,
            brand: 'Дом',
            raiting: 4.5,
            instock: true,
            countInStock: 5,
            numReviews: 10,
            descr: 'Здесь будет короткое описание данного товара'
        },

        {
            name: 'Извищатель пожарный дымовой ИПК-8',
            category: 'Домофоны',
            image: 'https://alba.sumy.ua/upload/iblock/443/44397559a7f98fe892a978163903720f.jpg',
            price: 135,
            brand: 'Дом',
            raiting: 4.5,
            instock: true,
            countInStock: 5,
            numReviews: 10,
            descr: 'Здесь будет короткое описание данного товара'
        },

        {
            name: 'Автономный контроллер СКУД: Z-5R',
            category: 'Домофоны',
            image: 'https://alba.sumy.ua/upload/iblock/342/3426497bb9b5aa7eab67dbecba47ee0c.jpg',
            price: 1075,
            brand: 'Дом',
            raiting: 4.5,
            instock: true,
            countInStock: 5,
            numReviews: 10,
            descr: 'Здесь будет короткое описание данного товара'
        },

        {
            name: 'FAAC 414',
            category: 'Домофоны',
            image: 'https://alba.sumy.ua/upload/iblock/666/666e88317ddb81ee4c0211f02c2789ec.jpg',
            price: 1500,
            brand: 'Дом',
            raiting: 4.5,
            instock: true,
            countInStock: 4,
            numReviews: 10,
            descr: 'Здесь будет короткое описание данного товара'
        },

        {
            name: 'Огнетушитель порошковый ВП-9',
            category: 'Домофоны',
            image: 'https://alba.sumy.ua/upload/iblock/572/5723bef4484bbca658d0b6a11a09f4b9.jpg',
            price: 500,
            brand: 'Дом',
            raiting: 4.5,
            instock: true,
            countInStock: 2,
            numReviews: 10,
            descr: 'Здесь будет короткое описание данного товара'
        },

        {
            name: 'Электромеханический замок Atis Lock SS из нержавеющей стали',
            category: 'Домофоны',
            image: 'https://alba.sumy.ua/upload/resize_cache/iblock/f0b/310_310_140cd750bba9870f18aada2478b24840a/f0b45966b312d9aa9c02956661c44b1b.jpg',
            price: 350,
            brand: 'Дом',
            raiting: 4.5,
            instock: false,
            countInStock: 3,
            numReviews: 10,
            descr: 'Здесь будет короткое описание данного товара'
        },
    ],
};

export default data;