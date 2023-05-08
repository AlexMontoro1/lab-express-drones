const express = require('express');
const router = express.Router();

const Drone = require("../models/Drone.model.js")

router.get('/drones', (req, res, next) => {
  Drone.find()
  .then((droneList)=> {
    res.render("drones/list.hbs", {
      droneList
    })
  })
  .catch((err)=> {
    next(err)
  })
  

});

router.get('/drones/create', (req, res, next) => {
  res.render("drones/create-form.hbs")

});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
    //console.log(req.body)
    const { name, propellers, maxSpeed } = req.body
    Drone.create({
      name,
      propellers,
      maxSpeed
    })
    .then(()=> {
      //console.log("dron creado !");
      res.redirect("/drones")
    })
    .catch((err)=> {
      next(err)
    })
});

router.get('/drones/:id/edit', (req, res, next) => {
  Drone.findById(req.params.id)
  .then((droneParams)=> {
    //console.log(droneParams);
    res.render("drones/update-form.hbs", {
      droneParams
    })
  })
  .catch((err)=> {
    next(err)
  })
  
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { name, propellers, maxSpeed } = req.body
  Drone.findByIdAndUpdate(req.params.id,{
      name,
      propellers,
      maxSpeed
  }, { new : true })
  .then((response)=> {
    console.log(response);
    res.redirect("/drones")
  })
  .catch((err)=> {
    next(err)
  })
    });

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  Drone.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect("/drones")
  })
  .catch(()=>{

  })
});

module.exports = router;
