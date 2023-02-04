import React, { Dispatch, SetStateAction, useState } from "react";
import { IUserPhotoList } from "../interfaces/profileList";

const questions: IQuestion[] = [
  { id: "1", type: "TEXT", name: "name", regex: "^[a-zA-Z0-9\\s]{3,}$" },
  { id: "2", type: "TEXT", name: "email", regex: "^[a-zA-Z0-9-_@.\\s]{5,}$" },
  { id: "3", type: "TEXT", name: "phone", regex: "^[0-9-()\\sx]{5,}$" },
  { id: "4", type: "TEXT", name: "company", regex: "^[a-zA-Z0-9-_@.\\s]{6,}$" },
];

interface IQuestion {
  id: string;
  type: string;
  name: string;
  regex: string;
}

interface IProfileCardProps {
  user: IUserPhotoList;
  setUsers: Dispatch<SetStateAction<IUserPhotoList[] | null>>;
  closeModal: () => void;
}

const EditProfileCard = ({ user, setUsers, closeModal }: IProfileCardProps) => {
  const userProps = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    company: user.company.name,
  };
  const [state, setState] = useState<{ [key: string]: string }>(userProps);
  const [error, setError] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    const localUsers = localStorage.getItem("users");

    if (localUsers) {
      const users = JSON.parse(localUsers) as IUserPhotoList[];
      const userChangeDisabled = users?.map((u) => {
        if (u.id === user.id) {
          return {
            ...u,
            name: state.name,
            email: state.email,
            phone: state.phone,
            company: { ...user.company, name: state.company },
          };
        } else {
          return u;
        }
      });
      localStorage.setItem("users", JSON.stringify(userChangeDisabled));
      setUsers(userChangeDisabled);
      closeModal();
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    question: IQuestion
  ) => {
    const { name, value } = e.target;
    const regex = new RegExp(question.regex);
    const test = regex.test(value);
    if (!test) {
      setError((nextState) => ({
        ...nextState,
        [name]: question.name,
      }));
    } else {
      //clear error
      setError((nextState) => {
        delete nextState[name];
        return nextState;
      });
    }
    setState((nextState) => ({
      ...nextState,
      [name]: value,
    }));
  };
  return (
    <div className="form-user">
      <h4 className="form-user__header"> Edit Profile</h4>
      <div className="form-user__wrapper">
        {questions.map((question) => (
          <div key={question.id} className="form-user__input">
            <label>{question.name}:</label>
            <input
              type="text"
              name={question.name}
              className={
                error.hasOwnProperty(question.id) && error[question.id] !== ""
                  ? "input-error"
                  : ""
              }
              placeholder={question.name}
              value={state[question.name]}
              onChange={(e) => handleChange(e, question)}
            />
          </div>
        ))}
      </div>

      <button
        className={`form-user__submit ${
          Object.keys(error).length > 0 ? "faded" : ""
        }`}
        onClick={() => {
          handleSubmit();
        }}
      >
        submit
      </button>
      {Object.keys(error).length > 0 && (
        <p className="text-error">Some input is too short..</p>
      )}
    </div>
  );
};

export default EditProfileCard;
