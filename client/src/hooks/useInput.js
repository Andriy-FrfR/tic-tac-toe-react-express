import { useState } from 'react';

export const useInput = ({ placeholder, validation }) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const validate = (value) => {
    if (!validation) {
      return setIsValid(true);
    }

    if (validation.required) {
      if (!value) {
        setIsValid(false);
        setErrorMessage("This field can't be empty");
        return;
      }
    }

    setIsValid(true);
  };

  const onChange = (event) => {
    setValue(event.target.value);
    setIsTouched(true);
    validate(event.target.value);
  };

  const onBlur = () => {
    validate(value);
    setIsTouched(true);
  };

  const markAsTouched = () => {
    validate(value);
    setIsTouched(true);
  };

  return {
    value,
    isValid,
    isTouched,
    markAsTouched,
    errorMessage,
    spread: {
      value,
      onChange,
      onBlur,
      placeholder,
    },
  };
};
