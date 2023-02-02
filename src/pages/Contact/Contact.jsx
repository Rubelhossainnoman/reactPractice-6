import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Alert from "../../components/Alert/Alert";
import "./Contact.scss";
import { BsEye } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

const Contact = () => {
  // Alert...
  const [alert, setAlert] = useState({
    msg: "All fields are required!",
    type: "danger",
    status: false,
  });
  // input form name...
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });
  //   manage form..fields...
  const hendleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  //   from submit...
  const hendleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const all_data = Object.fromEntries(data.entries());
    // empty array...
    let userData = [];
    // validations...
    if (
      input.name === "" || input.email === "" || input.phone === "" || input.photo === "" ) {
      //   setAlert({
      //     msg: "All fields are required!",
      //     type: "danger",
      //     status: true,
      //   });
      Swal.fire("ooops!", "All fiels are required!", "error");
    } else {
      setInput({
        name: "",
        email: "",
        phone: "",
        photo: "",
      });
      Swal.fire("Weldone!", "For your data submit!", "success");
      //   set data in local stroage....
      if (localStorage.getItem("user")) {
        userData = JSON.parse(localStorage.getItem("user"));
      }
      userData.push(all_data);
      localStorage.setItem("user", JSON.stringify(userData));
      //   setAlert({
      //     msg: "Message send successfull!",
      //     type: "success",
      //     status: true,
      //   });
    }
  };
  // User get from local stroage...
  let userAllData = JSON.parse(localStorage.getItem("user"));
  // Delete user...data...
  const hendleDeleteUser = (e) => {
    e.preventDefault()
    // Get index...
    const index = e.target.getAttribute("userIndex");
    // Get all user from ls data

    let all_user_data = JSON.parse(localStorage.getItem("user"));
    // Delete ls data....
    all_user_data.splice(index, 1);
    // Update latest ls data....
    localStorage.setItem("user", JSON.stringify(all_user_data));
    Swal.fire("Nice", "Delete Successfull", "success");
  };
  // UseRef Hook....
  // const titles = useRef(null);
  // console.log(titles.current);

  // UseEffect hook...
  useEffect(() =>{
  },[userAllData])
  return (
    <>
      <div className="section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="contact_form">
                <div className="card">
                  <div className="card-header py-3">
                    <h3>Register Form</h3>
                  </div>
                  <div className="card-body">
                    {alert.status && (
                      <Alert msg={alert.msg} hide={setAlert} type={alert.type} />
                    )}
                    <form onSubmit={hendleSubmit} action="" method="post">
                      <div className="my-3">
                        <input type="text" name="name" value={input.name} onChange={hendleInputChange} placeholder="Your Name" className="form-control" />
                      </div>
                      <div className="my-3">
                        <input type="text" name="email" value={input.email} onChange={hendleInputChange}  placeholder="Your Email" className="form-control"
                        />
                      </div>
                      <div className="my-3">
                        <input type="text" name="phone" value={input.phone} onChange={hendleInputChange} placeholder="Your Phone" className="form-control" />
                      </div>
                      <div className="my-3">
                        <input type="text" name="photo" value={input.photo} onChange={hendleInputChange} placeholder="Your Photo" className="form-control" />
                      </div>
                      <div className="my-3">
                        <button className="w-100 btn btn-success" type="submit"> Submit </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer">
                    <div className="user_list">
                      <table className="table table-striped table-responsive table-condensed">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="user_list_info">
                          {!userAllData ? (
                            <tr>
                              <td colSpan="6" className="text-center">User Not Found...</td>
                            </tr>
                          ) : (
                            userAllData.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <img src={item.photo} alt="" />
                                </td>
                                <td>{item.name}</td>
                                <td className="email">
                                  <a href={`mailto:${item.email}`}>{item.email}</a>
                                </td>
                                <td className="phone">
                                  <a href={`tel:${item.phone}`}>{item.phone}</a>
                                </td>
                                <td>
                                  <div className="action_btn">
                                    <a className="btn btn-success" href="http://" target="_blank" rel="noopener noreferrer"
                                    ><BsEye /></a>
                                    <a className="btn btn-warning" href="http://" target="_blank" rel="noopener noreferrer" > <AiOutlineEdit /> </a>
                                    <a className="btn btn-danger" href="http://" target="_blank" userIndex={index} onClick={hendleDeleteUser} rel="noopener noreferrer" > <AiOutlineDelete /> </a>
                                  </div>
                                </td>
                              </tr>
                            ))
                            // <tr>
                            //   <td>1</td>
                            //   <td>
                            //     <img
                            //       src="https://powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png"
                            //       alt=""
                            //     />
                            //   </td>
                            //   <td>Rubel Hossain</td>
                            //   <td className="email">
                            //     <a href="mailto:developerrubel.me@gmail.com">
                            //       developerrubel.me@gmail.com
                            //     </a>
                            //   </td>
                            //   <td className="phone">
                            //     <a href="tel:+8801774217461">+8801774217461</a>
                            //   </td>
                            //   <td>
                            //     <div className="action_btn">
                            //       <a
                            //         className="btn btn-success"
                            //         href="http://"
                            //         target="_blank"
                            //         rel="noopener noreferrer"
                            //       >
                            //         <BsEye />
                            //       </a>
                            //       <a
                            //         className="btn btn-warning"
                            //         href="http://"
                            //         target="_blank"
                            //         rel="noopener noreferrer"
                            //       >
                            //         <AiOutlineEdit />
                            //       </a>
                            //       <a
                            //         className="btn btn-danger"
                            //         href="http://"
                            //         target="_blank"
                            //         rel="noopener noreferrer"
                            //       >
                            //         <AiOutlineDelete />
                            //       </a>
                            //     </div>
                            //   </td>
                            //   <td></td>
                            // </tr>
                          )}
                          {/* <tr>
                            <td>1</td>
                            <td>
                              <img
                                src="https://powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png"
                                alt=""
                              />
                            </td>
                            <td>Rubel Hossain</td>
                            <td className="email">
                              <a href="mailto:developerrubel.me@gmail.com">
                                developerrubel.me@gmail.com
                              </a>
                            </td>
                            <td className="phone">
                              <a href="tel:+8801774217461">+8801774217461</a>
                            </td>
                            <td>
                              <div className="action_btn">
                                <a
                                  className="btn btn-success"
                                  href="http://"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <BsEye />
                                </a>
                                <a
                                  className="btn btn-warning"
                                  href="http://"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <AiOutlineEdit />
                                </a>
                                <a
                                  className="btn btn-danger"
                                  href="http://"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <AiOutlineDelete />
                                </a>
                              </div>
                            </td>
                            <td></td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
