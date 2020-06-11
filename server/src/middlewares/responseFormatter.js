export const responseFormatter = (req, res, next) => {
  res.respondSuccess = ({ data, message = 'OK', code = 200 }) => {
    res.status(code).send({
      success: true,
      data,
      message,
    })
  }

  res.respondError = ({
    message = 'Internal Server Error',
    code = 500,
    data = {},
  }) => {
    res.status(code).send({
      success: false,
      data,
      message,
    })
  }

  next()
}
