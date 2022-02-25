'use strict';

const exampleAdvertisementMethod = async (req, res, next) => {
  try {
    res.status(200).json({data: 'exampleAdvertisementMethod'});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(err);
  }
};

module.exports = {
  exampleAdvertisementMethod
};
