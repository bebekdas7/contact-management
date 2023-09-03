//the table rendered inside contact page

import "../../css/cc.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeContact } from "../../features/contactSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const CC = (props: any) => {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  console.log(props.contacts);
  let n0 = 1;

  return (
    <div className="cc">
      {props.contacts.length > 0 ? (
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Status</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.contacts.map((item: any) => (
              <tr key={item.id}>
                <th scope="row">{n0++}</th>
                {/* <td> */}
                {item.isActive ? (
                  <td className="active">Active</td>
                ) : (
                  <td className="inactive">inActive</td>
                )}
                {/* </td> */}
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>
                  {clicked ? (
                    <button
                      className="pen-btn bg-success"
                      onClick={() => {
                        props.done();
                        setClicked(!clicked);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className=" text-white bg-transparent"
                      />
                    </button>
                  ) : (
                    <button
                      className="pen-btn bg-primary"
                      onClick={() => {
                        props.handleEdit(item.id);
                        setClicked(!clicked);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        className="pen-icon text-white bg-transparent "
                      />
                    </button>
                  )}
                  <button
                    className="trash-btn bg-danger ms-3"
                    onClick={() => {
                      dispatch(removeContact(item.id));
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="trash-icon text-white bg-transparent "
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-5">Nothing is available</div>
      )}
    </div>
  );
};

export default CC;
