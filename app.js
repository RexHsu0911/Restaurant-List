// 載入 Express
const express = require('express')
// 執行 Express function，建立 app
const app = express()
// 指定 port
const port = 3000

// 設定路由(根目錄)
app.get('/', (req, res) => {
  res.send('express app for restaurants')
})

// 啟動並監聽 localhost 伺服器
app.listen(port, (req, res) => {
  console.log(`express server is running on http://localhost:${port}`)
})