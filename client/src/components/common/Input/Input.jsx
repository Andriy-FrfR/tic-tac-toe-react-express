import './Input.css';

const Input = ({ input: { spread, isValid, isTouched, errorMessage } }) => {
  const cls = ['form-control', 'browser-default'];

  if (!isValid && isTouched) {
    cls.push('invalid');
  }

  return (
    <div className="Input">
      <input type="text" className={cls.join(' ')} {...spread} />
      {!isValid && isTouched ? (
        <div className="validation">{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default Input;
