//contact page main page in /contact path

import "../css/contact.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addContact, updateContact } from "../features/contactSlice";
import CC from "./miniComponent/CC";

interface ContactItem {
  id: number;
  name: string;
  surname: string;
  isActive: boolean;
}

const Contact = () => {
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  );
  const navigate = useNavigate();
  const contacts = useSelector((state: any) => state.contact.contacts);
  console.log(contacts);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameInput = document.querySelector<HTMLInputElement>("#name");
    const surnameInput = document.querySelector<HTMLInputElement>("#surname");
    const activeInput = document.querySelector<HTMLInputElement>("#active");

    if (nameInput && surnameInput && activeInput) {
      const name = nameInput.value;
      const surname = surnameInput.value;
      const isActive = activeInput.checked;

      const newContact = {
        id: Date.now(),
        name,
        surname,
        isActive,
      };

      dispatch(addContact(newContact));

      e.currentTarget.reset();
      console.log("hiii");
    }
  };

  const done = () => {
    if (selectedContact) {
      const nameInput = document.querySelector<HTMLInputElement>("#name");
      const surnameInput = document.querySelector<HTMLInputElement>("#surname");
      const activeInput = document.querySelector<HTMLInputElement>("#active");

      if (nameInput && surnameInput && activeInput) {
        const name = nameInput.value;
        const surname = surnameInput.value;
        const isActive = activeInput.checked;

        const updatedContact: ContactItem = {
          id: selectedContact.id,
          name,
          surname,
          isActive,
        };

        dispatch(updateContact(updatedContact));
        setSelectedContact(null);
      }
    }

    const nameInput = document.querySelector<HTMLInputElement>("#name");
    const surnameInput = document.querySelector<HTMLInputElement>("#surname");
    const activeInput = document.querySelector<HTMLInputElement>("#active");

    if (nameInput) {
      nameInput.value = "";
    }
    if (surnameInput) {
      surnameInput.value = "";
    }
    if (activeInput) {
      activeInput.checked = false;
    }

    console.log("Done");
  };

  const handleEdit = (id: number) => {
    const nameInput = document.querySelector<HTMLInputElement>("#name");
    const surnameInput = document.querySelector<HTMLInputElement>("#surname");
    const activeInput = document.querySelector<HTMLInputElement>("#active");

    // Logic of update button
    const contact = contacts.find((item: any) => item.id === id);
    if (contact) {
      setSelectedContact(contact);
      console.log(contact);
    }

    if (nameInput && surnameInput && activeInput && contact) {
      nameInput.value = contact.name;
      surnameInput.value = contact.surname;
      activeInput.checked = contact.isActive;
    }
  };

  return (
    <>
      <div className="main-container container-fluid d-flex align-items-center justify-content-center">
        <div className="contact">
          <div className="heading d-flex align-items-center justify-content-center">
            Contact Page
          </div>

          <div className="body d-flex">
            <div className="sidebar d-flex flex-column">
              <div className="sidebar1 h-25 d-flex justify-content-center align-items-center">
                <button onClick={() => navigate("/")}>Contacts</button>
              </div>
              <div className="sidebar2 h-25 d-flex justify-content-center align-items-center">
                <button onClick={() => navigate("/graphmap")}>Maps</button>
              </div>
              <div className="sidebar2 h-25 d-flex justify-content-center align-items-center">
                <button onClick={() => navigate("/charts")}>Charts</button>
              </div>
              {/* <div className="sidebar3 h-40"></div> */}
            </div>

            <div className="main-page">
              <div className="create d-flex justify-content-center align-items-center">
                <button className="create-btn">Create Contact</button>
              </div>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="ms-4">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control w-75 mt-2 ms-4"
                      id="name"
                      name="name"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="surname" className="ms-4">
                      Surname
                    </label>
                    <input
                      type="text"
                      className="form-control w-75 mt-3 ms-4"
                      id="surname"
                      name="surname"
                      placeholder="Surname"
                      required
                    />
                  </div>
                  <div className="form-check ms-4 mt-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="active"
                      id="active"
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                  <div className="form-check ms-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inactive"
                      id="inactive"
                    />
                    <label className="form-check-label">Inactive</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-4 ms-4 mb-1"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="table">
                <CC contacts={contacts} handleEdit={handleEdit} done={done} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
