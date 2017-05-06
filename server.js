var express = require('express')
var app = express()
var moment = require('moment')
var home = require('./routes/home')
var path = require('path')


app.use(express.static(path.join(__dirname, 'public')))
app.use('/', home)

app.get('/:id', function (req, res) {
  console.log(req.params.id)
  var date = req.params.id
  var unix, natural

  /**
   * Format
   * "X" : unix
   * "MMMM D, YYYY" " natural
   */

  if (parseInt(date) > 0) {
    unix = parseInt(date)
    natural = moment(date, 'X').format('MMMM D, YYYY')
  } else if (isNaN(+date) && moment(date, 'MMMM D, YYYY').isValid()) {
    unix = moment(date, 'MMMM D, YYYY').format('X')
    natural = moment(date).format('MMMM D, YYYY')
  }

  if (!unix) unix = null
  if (!natural) natural = null

  res.send({
    unix: unix,
    natural: natural
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('TimeStamp Service listening on port ' + (process.env.PORT || 3000))
})
