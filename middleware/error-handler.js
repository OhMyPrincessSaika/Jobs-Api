const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
 
  let customErr  = {
    statusCode :  err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg : err.message || 'Something went wrong try again later..'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  
  if(err.name === 'ValidationError') {
    customErr.msg = Object.values(err.errors).map(obj => obj.message).join(',');
    customErr.statusCode = 400
  }
  if(err.code && err.code === 11000) {
    customErr.statusCode = 400
    customErr.msg = `Duplicate value enter for ${Object.keys(err.keyValue)} field,please choose another value`
  }
  if(err.name === 'CastError') {
    customErr.statusCode = 404;
    customErr.msg = `there is no such job with id ${err.value}`
  }
 
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  return res.status(customErr.statusCode).json({ msg : customErr.msg })
}

module.exports = errorHandlerMiddleware
