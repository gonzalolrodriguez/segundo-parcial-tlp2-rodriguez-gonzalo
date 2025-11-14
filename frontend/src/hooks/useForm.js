import { useState } from "react";

const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormState(initialState);
  };


  return {
    formState,
    ...formState,
    handleChange,
    handleReset,
  };
};

export default useForm;

