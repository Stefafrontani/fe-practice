import React from 'react';
import { useForm } from '../../hooks/useForm';
import { isRequired, isEmail, maxChars } from '../../hooks/useForm/validators';

const Contact: React.FC = () => {
  const formInputs = {
    name: {
      value: '',
      validators: [isRequired],
    },
    email: {
      value: '',
      validators: [isRequired, isEmail],
    },
    comment: {
      value: '',
      validators: [maxChars(20)],
    },
  };

  const { values, onChange, errors, disableSubmit } = useForm(formInputs);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <h2>Contact</h2>
      <form onSubmit={onSubmitHandler}>
        {/* Name field*/}
        <label>Name: </label>
        <br />
        <input
          type="text"
          name="name"
          onChange={onChange}
          value={values.name}
        />
        {errors.name.length > 0 && (
          <ul>
            {errors.name.map((error) => (
              <li key={error}>Name {error}</li>
            ))}
          </ul>
        )}
        <br />
        {/* Email field*/}
        <label>Email: </label>
        <br />
        <input
          type="email"
          name="email"
          onChange={onChange}
          value={values.email}
        />
        {errors.email.length > 0 && (
          <ul>
            {errors.email.map((error) => (
              <li key={error}>Email {error}</li>
            ))}
          </ul>
        )}
        <br />
        {/* Comment field*/}
        <label>Comment: </label>
        <br />
        <textarea name="comment" onChange={onChange} value={values.comment} />
        {errors.comment.length > 0 && (
          <ul>
            {errors.comment.map((error) => (
              <li key={error}>Comment {error}</li>
            ))}
          </ul>
        )}
        <br />
        {/* Send button*/}
        <input type="submit" value="Send" disabled={disableSubmit} />
      </form>
    </React.Fragment>
  );
};

export default Contact;
