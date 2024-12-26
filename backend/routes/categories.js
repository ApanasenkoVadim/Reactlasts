const Category = require('../database/models/category');
const Product = require('../database/models/product');

const { request } = require('express');
const express = require('express');

const router = express.Router();


router.get('/all', (req, res) =>{
    
    async function all(){
        const all = await Category.findAll();
        res.json(all);
    }
    all();
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    if (isNaN(id)) {
      res.status(400).json({ status: 'ERR', message: 'Invalid category ID' });
      return;
    }
  
    try {
      // Найти категорию по ID
      const category = await Category.findOne({ where: { id: +id } });
      if (!category) {
        res.status(404).json({ status: 'ERR', message: 'Category not found' });
        return;
      }
  
      // Найти все продукты для данной категории
      const products = await Product.findAll({ where: { categoryId: +id } });
  
      res.json({
        category: {
          id: category.id,
          name: category.name, // Добавляем название категории
        },
        data: products,
      });
    } catch (err) {
      console.error("Error fetching category or products:", err);
      res.status(500).json({ status: 'ERR', message: 'Server error' });
    }
  });
  

module.exports = router;