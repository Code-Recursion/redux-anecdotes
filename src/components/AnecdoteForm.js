import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnacedote } from "../reducers/anecdoteReducer";
// import Notification from "../components/Notification";
import "../App.css";

const AnecdoteForm = () => {
  const [errorNotification, setErrorNotification] = useState(null);
  const [successNotification, setSuccessNotification] = useState(null);
  const dispatch = useDispatch();

  const handleCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      setErrorNotification("Enter a valid anecdote");
      setTimeout(() => {
        setErrorNotification(null);
      }, 5000);
      return;
    }

    dispatch(createAnacedote(content));
    setSuccessNotification(`Anecdote ${content} added successfully`);
    setTimeout(() => {
      setSuccessNotification(null);
    }, 5000);
    event.target.anecdote.value = "";
  };

  const ErrorNotification = ({ message }) => {
    if (!message) return null;
    return (
      <div className="error">
        <p>{message}</p>
      </div>
    );
  };

  const SuccessNotification = ({ message }) => {
    if (!message) return null;
    return (
      <div className="success">
        <p>{message}</p>
      </div>
    );
  };

  return (
    <div>
      <h2>Create New Anecdote</h2>

      <SuccessNotification message={successNotification} />
      <ErrorNotification message={errorNotification} />

      <form onSubmit={handleCreate}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
