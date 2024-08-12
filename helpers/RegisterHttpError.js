const RegisterHttpError = (error) => {
  const err = new Error(error.message);
  err.status = 400;
  return err;
};

export default RegisterHttpError;
