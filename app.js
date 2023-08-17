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

// res.send('listing movies') 改成 res.render('index', { restaurants })
// 透過 req.query 取得查詢字串
// res.render('index', { restaurants }) 改成 res.render('index', { restaurants: matchedRestaurants, keyword })
// 條件（三元）運算子 條件 ? 值1 : 值2
// Object.value() 取得所有 property value，並以陣列回傳
// Array.some() 檢查陣列裡是否符合條件，只要有一個元素符合條件即回傳 true
app.get('/restaurants', (req, res) => {
  const keyword = req.query.keyword?.trim()
  // console.log('keyword:', keyword)
  const matchedRestaurants = keyword ? restaurants.filter((mv) => Object.values(mv).some((property) => {
    if (typeof property === 'string') {
      return property.toLowerCase().includes(keyword.toLowerCase())
    }
    return false
  })
  ) : restaurants
  res.render('index', { restaurants: matchedRestaurants, keyword })
})

// 使用 params 做動態路由
// find 取 id ，並數字轉文字(toString))
// res.send(`read restaurant: ${id}`) 改成 res.render('detail', { restaurant })
app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((mv) => mv.id.toString() === id)
  res.render('detail', { restaurant })
})

// 啟動並監聽 localhost 伺服器
app.listen(port, (req, res) => {
  console.log(`express server is running on http://localhost:${port}`)
})