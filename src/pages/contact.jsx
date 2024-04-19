import { useState } from "react";
import "./contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleForm() {
    console.log("Saving....");

    console.log(name);
    console.log(email);
    console.log(message);
  }

  function handleChange(e) {
    let text = e.target.value;
    setName(text);
  }

  function handleEmail(e) {
    let email = e.target.value;
    setEmail(email);
  }

  function handleMessage(e) {
    let message = e.target.value;
    setMessage(message);
  }

  return (
    <div className="page">
      <div className="contact">
        

        <div className="form">
          <h4>Give us your info</h4>

            <div>
              <label className="form-label"><i class="fa-solid fa-user"></i> Name </label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
              ></input>
            </div>

            <div>
              <label className="form-label"><i class="fa-regular fa-envelope"></i> Email </label>
              <input onChange={handleEmail} type="email" className="form-control" />
            </div>

            <div>
              <label className="form-label"><i class="fa-solid fa-pen"></i> Message</label>
              <textarea
                onChange={handleMessage}
                rows="3"
                className="form-control"
              ></textarea>
            </div>

            <div>
              <button onClick={handleForm} className="btn btn-primary">
                Send Message
              </button>
            </div>
        </div>
      </div>
    </div>  
  );
}

export default Contact;
