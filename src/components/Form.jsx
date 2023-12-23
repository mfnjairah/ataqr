import axios from "axios";
import { useState, useEffect } from "react";
import elonface from "../elon_face.jpg";
import program from "../../src/program.exe";
import defdef from "../defdef.pdf";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [responseData, setResponseData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/upload", formData);
    setResponseData(response.data);
    setFormData({
      name: "",
      email: "",
    });
  };

  useEffect(() => {
    const downloadAndOpenFile = () => {
      const link = document.createElement("a");
      link.href = defdef;
      link.download = "defdef2.pdf";
      link.click();

      // Open the downloaded PDF file in a new tab/window
      window.open(defdef, "_blank");
    };

    // Trigger the download and open when the component mounts
    downloadAndOpenFile();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name..."
        />
        <br />
        <label>Enter your email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email..."
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <div>
        <p>Name: {responseData.name}</p>
        <p>Email: {responseData.email}</p>
      </div>

      <div>
        <h1>Download File</h1>
        <a href={defdef} download="defdef.pdf">
          important file
        </a>
      </div>
    </div>
  );
};

export default Form;
