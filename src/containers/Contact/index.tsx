import React from 'react';
import { useForm } from '../../hooks/useForm';
import { isRequired, isEmail, maxChars } from '../../hooks/useForm/validators';

const Contact: React.FC = () => {
  const { fields, onChange, errors, disableForm } = useForm([
    { field: 'name', value: '', validators: [isRequired] },
    { field: 'email', value: '', validators: [isRequired, isEmail] },
    { field: 'comment', value: '', validators: [maxChars(20)] },
  ]);

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
          value={fields.name}
        />
        <ul>
          {errors.name.map((error) => (
            <li key={error}>Name {error}</li>
          ))}
        </ul>
        <br />
        {/* Email field*/}
        <label>Email: </label>
        <br />
        <input
          type="email"
          name="email"
          onChange={onChange}
          value={fields.email}
        />
        <ul>
          {errors.email.map((error) => (
            <li key={error}>Email {error}</li>
          ))}
        </ul>
        <br />
        {/* Comment field*/}
        <label>Comment: </label>
        <br />
        <textarea name="comment" onChange={onChange} value={fields.comment} />
        <ul>
          {errors.comment.map((error) => (
            <li key={error}>Comment {error}</li>
          ))}
        </ul>
        <br />
        {/* Send button*/}
        <input type="submit" value="Send" disabled={disableForm} />
      </form>
    </React.Fragment>
  );
};

export default Contact;
