import React, { useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

const App = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    setFiles(info.fileList.map((file) => file.originFileObj));
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    formData.append("type", "AADHAR");

    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.post(
        "http://3.108.252.80:3000/api/upload/files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File upload response:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <header className="App-header">
        <Upload
          onChange={handleFileChange}
          fileList={files.map((file, index) => ({
            uid: String(index),
            name: file ? file.name : "Unnamed File",
            status: "done",
            url: file ? URL.createObjectURL(file) : "",
          }))}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>

        {files.length > 0 && (
          <div>
            <p style={{ fontWeight: "bold" }}>Selected Files:</p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {files.map((file, index) => (
                <li key={index} style={{ marginBottom: "5px" }}>
                  {file ? file.name : "Unnamed File"}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={uploadFiles}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Upload Files
        </button>
      </header>
    </div>
  );
};

export default App;

// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [files, setFiles] = useState([]);

//   const handleFileChange = (event) => {
//     setFiles([...files, ...event.target.files]);
//   };

//   const uploadFiles = async () => {
//     const formData = new FormData();
//     formData.append('type', 'AADHAR');

//     files.forEach(file => {
//       formData.append('file', file);
//     });

//     try {
//       const response = await axios.post('http://3.108.252.80:3000/api/upload/files', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('File upload response:', response.data);
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     }
//   };

//   return (
//     <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
//       <header className="App-header">
//         <input type="file" onChange={handleFileChange} style={{ marginBottom: '10px' }} />

//         {files.length > 0 && (
//           <div>
//             <p style={{ fontWeight: 'bold' }}>Selected Files:</p>
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//               {files.map((file, index) => (
//                 <li key={index} style={{ marginBottom: '5px' }}>{file.name}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <button onClick={uploadFiles} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Upload Files</button>
//       </header>
//     </div>
//   );
// }

// export default App;
