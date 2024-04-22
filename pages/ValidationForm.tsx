import React from 'react';
import './../styles.scss';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function ValidationForm() {
  const [dataForm, setDataForm] = React.useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const addToData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      [name]: value,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // check that all fields are in place and valid
    const validationErrors: { [key: string]: string } = {}; // we don't add anything here because we don't know what fields will be filled in + they will be added by themselves.
    if (!dataForm.username.trim()) {
      validationErrors.username = 'name is required';
    }
    if (!dataForm.email.trim()) {
      validationErrors.email = 'email is required';
    } else if (!/\S+@\S+\.\S+/.test(dataForm.email)) {
      validationErrors.email = 'email is not valid';
    }
    if (!dataForm.password.trim()) {
      validationErrors.password = 'password is required';
    } else if (dataForm.password.length < 6) {
      validationErrors.password = 'password must be at least 6 characters';
    }
    if (dataForm.confirmPassword.trim() !== dataForm.password.trim()) {
      validationErrors.confirmPassword = "The passwords don't match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Displaying success alert');
      setDataForm({ username: '', email: '', password: '', confirmPassword: '' });
      alert('The form has been successfully submitted');
    } else {
      console.log('Validation errors object:', validationErrors);
      console.log('Number of validation errors:', Object.keys(validationErrors).length);
    }
  };

  // надо сделать input value который будет в значении Value и после того как ошиьок не будет сделать inputValue === ''
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          autoComplete="off"
          onChange={addToData}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          autoComplete="off"
          onChange={addToData}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" placeholder="******" onChange={addToData} />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" placeholder="******" onChange={addToData} />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
