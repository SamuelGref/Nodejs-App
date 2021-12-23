const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//  1st middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the  middleware');
  next();
});

// 2 tour rout handlers

const getAlltours = (req, res) => {
  res.status(200).json({
    satutus: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalif ID',
    });
  }

  res.status(200).json({
    satutus: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalif ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here.....>',
    },
  });
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalif ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// users rout handler

const getAllUsers = (req, res) => {
  res.status(500).json({
    satutus: 'error',
    message: 'this rout is not defined yet',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    satutus: 'error',
    message: 'this rout is not defined yet',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    satutus: 'error',
    message: 'this rout is not defined yet',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    satutus: 'error',
    message: 'this rout is not defined yet',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    satutus: 'error',
    message: 'this rout is not defined yet',
  });
};
// app.get('/api/v1/tours', getAlltours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3 Tour routes

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAlltours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

//    users routes

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//   4 start the server

const port = 3000;

app.listen(port, () => {
  console.log(`App running on prot ${port}....`);
});
