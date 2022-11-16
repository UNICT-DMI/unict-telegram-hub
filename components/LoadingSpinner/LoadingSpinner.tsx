const LoadingSpinner = (): JSX.Element => {
  return (
    <div className='lds-ellipsis'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
