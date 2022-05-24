const ErrorMessage = () => {
  const style = {
    display: 'block',
    width: "250px",
    height: "250px",
    objectFit: 'contain',
    margin: "0 auto"
  };

  return (
    <img style={style} src ={process.env.PUBLIC_URL + '/error.gif'} alt='Error' />
  );
}

export default ErrorMessage;