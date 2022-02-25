'use strict';

const exampleUserMethod = async (req, res, next) => {
  try {
    res.status(200).json({data: 'exampleUserMethod'});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(err);
  }
};

module.exports = {
  exampleUserMethod
};
