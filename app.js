// 載入模組（Express、Handlebars)、設定路由

// 載入 Express
const express = require('express')
// 載入樣版引擎 express-handlebars 
const { engine } = require('express-handlebars')
// 執行 Express function，建立 app
const app = express()
// 指定 port
const port = 3000
// 載入 restaurants.json
const restaurants = require('./public/jsons/restaurant.json').results

// 把樣板引擎交給 express-handlebars，名稱為參數 .hbs
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
// 將 public 裡的檔案載入 Express 中
app.use(express.static('public'))

// 設定路由(根目錄)
// 將網站的首頁直接導向(redirect) restaurants 清單
// 將靜態檔案的路徑 /restaurants 提供給 app.use
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

// res.send('listing movies') 改成 res.render('index')
// 傳入 restaurants
app.get('/restaurants', (req, res) => {
  res.render('index', { restaurants })
})

// 使用 params 做動態路由
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  res.send(`read restaurants: ${id}`)
})

// 啟動並監聽 localhost 伺服器
app.listen(port, (req, res) => {
  console.log(`express server is running on http://localhost:${port}`)
})