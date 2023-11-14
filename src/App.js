/* eslint-disable */

import { type } from '@testing-library/user-event/dist/type';
import './App.css';
import { useState, useEffect } from 'react'

function App() {

  const [result, setResult] = useState([])

  const changeHandler = (e) => {
    let images = [];
    let filed = []
    for (let i = 0; i < e.target.files.length; i++) {

      filed.push(e.target.files[i])
      images.push(URL.createObjectURL(e.target.files[i]));

    }
    setResult({
      filed,
      images,
    }
    )
  }

  const handleSubmission = async (event) => {

    event.preventDefault();

    var formData = new FormData()
    for (var i = 0; i < result.filed.length; i++) {

      formData.append('file', result.filed[i]);
    }


    var request = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
       
      },
      body: formData
    }

    const res = await fetch('http://localhost:3001/profile', request)

    const uploadedImage = await res.json();

    if (uploadedImage) {
      alert(uploadedImage.response);
    } else {

      alert('Something Wrong')
    }

  }


  useEffect(() => {

  }, [result])
  return (
    <>
      <div className='row'>
        <div class="mx-auto col-10 col-md-8 col-lg-6 my-5">
          <form action="/profile" encType='multipart/form-data' method='post' onSubmit={handleSubmission} >
            <label htmlFor="formFileLg" className="form-label"><h2>To Compress the images through TINIFY</h2></label>
            <input className="form-control form-control mt-5" style={{ width: 500 }} id="formFileLg" multiple type="file" onChange={changeHandler} />

            <button type='submit' className="btn btn-outline-primary  mx-5 col-6 my-5"
              disabled={result.length == 0}
            >
              Upload
            </button>

          </form >
        </div>
      </div>

    </>
  )
}

export default App;
/* eslint-disable */