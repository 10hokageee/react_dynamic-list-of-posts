import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  onSubmit: ({ postId, body, name, email }: Omit<Comment, 'id'>) => void;
  selectedPostId: number | null;
};

export const NewCommentForm: React.FC<Props> = ({
  onSubmit,
  selectedPostId,
}) => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);

  const [textarea, setTextarea] = useState('');
  const [errorTextarea, setErrorTextarea] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setErrorName(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorEmail(false);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextarea(event.target.value);
    setErrorTextarea(false);
  };

  const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorName(!name);
    setErrorEmail(!email);
    setErrorTextarea(!textarea);

    if (!name || !email || !textarea) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      onSubmit({
        name,
        email,
        body: textarea,
        postId: selectedPostId as number,
      });
      setLoading(false);
    }, 300);

    setTextarea('');
  };

  const clear = () => {
    setName('');
    setEmail('');
    setTextarea('');

    setErrorTextarea(false);
    setErrorName(false);
    setErrorEmail(false);
  };

  return (
    <form onSubmit={handleFormChange} data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errorName })}
            onChange={handleNameChange}
            value={name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className={classNames('icon is-small is-right', {
                'has-text-danger': errorName,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errorEmail })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className={classNames('icon is-small is-right', {
                'has-text-danger': errorEmail,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errorTextarea })}
            value={textarea}
            onChange={handleTextareaChange}
          />
        </div>

        {errorTextarea && (
          <p
            className={classNames('help', { 'is-danger': errorTextarea })}
            data-cy="ErrorMessage"
          >
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            onClick={clear}
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
