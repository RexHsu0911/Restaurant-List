// 載入 Express
const express = require('express')
// 執行 Express function，建立 app
const app = express()
// 指定 port
const port = 3000

// 設定路由(根目錄)
// 網站的首頁會直接導向(redirect) restaurants 清單
app.get('/', (req, res) => {
  res.redirect('express app for restaurants')
})

app.get('/restaurants', (req, res) => {
  res.send('listing restaurants')
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