const express = require('express');
const categories = require('./routes/categories');
const sale = require('./routes/sale');
const order = require('./routes/order');
const products = require('./routes/products');
const sequelize = require('./database/database');
const cors = require('cors');
const path = require('path'); // Добавлено для работы с путями

const Category = require('./database/models/category');
const Product = require('./database/models/product');
const PORT = 3333;

Category.hasMany(Product);

const app = express();

// Настройка CORS
app.use(cors({ origin: '*' }));

// Обработка URL-encoded и JSON данных
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Раздача статической папки public
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/public", express.static("public"));
// Подключение маршрутов
app.use('/categories', categories);
app.use('/products', products);
app.use('/sale', sale);
app.use('/order', order);

const start = async () => {
    try {
        await sequelize.sync().then(
            () => console.log("Database synchronized successfully."),
            err => console.log("Database synchronization error:", err)
        );

        app.listen(PORT, () => {
            console.log(`\nServer started on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log("Server start error:", err);
    }
};
console.log("Статические файлы раздаются из:", path.join(__dirname, 'public'));

start();
