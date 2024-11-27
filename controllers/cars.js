const Car = require('../models/cars')
const router = require('express').Router()
router.get('/cars', async (req, res) => {
  const allCars = await Car.find()
  res.render('cars/index.ejs', { cars: allCars })
})
router.get('/cars/new', (req, res) => {
  res.render('cars/new.ejs')
})
router.post('/cars', async (req, res) => {
  await Car.create(req.body)
  res.redirect('/cars')
})

router.get('/cars/:carId', async (req, res) => {
  const foundCar = await Car.findById(req.params.carId)
  res.render('cars/show.ejs', { car: foundCar })
})
router.delete('/cars/:carId', async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId)
  res.redirect('/cars')
})

router.get('/cars/:carId/edit', async (req, res) => {
  const foundCar = await Car.findById(req.params.carId)
  res.render('cars/edit.ejs', {
    car: foundCar
  })
})

router.put('/cars/:carId', async (req, res) => {
  await Car.findByIdAndUpdate(req.params.carId, req.body)

  res.redirect(`/cars/${req.params.carId}`)
})
module.exports = router
