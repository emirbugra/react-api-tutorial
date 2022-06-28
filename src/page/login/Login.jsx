import React, {useState} from 'react'
import axios from 'axios'

import Header from '../../components/header/Header'
import Footer from '../../components/Footer'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLoginBtnClick = () => {
    const postData = {
      email,
      password,
    }

    axios.post('https://api.adoptez1artisan.com/auth/login', postData)
      .then((response) => {
        console.log('success', response)

        if (response.data.status === 'success') {
          localStorage.setItem('token', response.data.data.token)
          window.location.href = '/#/'
          window.location.reload()
        } else {
          alert('Bir hata oluştu.')
        }
      })
      .catch((err) => {
        console.log('err', err)
        alert('Bir hata oluştu.')
      })
  }

  return (
    <React.Fragment>
      <Header />

      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">Login</h1>
        <p className="lead">
          Please login here.
        </p>
      </div>

      <div className="container">
        <div className="card-deck mb-3 text-center">
          <div className="row justify-content-md-center">
            <div className="col-6">
              <input type="text" className="form-control" placeholder="Enter email"
                     onKeyUp={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-6">
              <input type="password" className="form-control" placeholder="Enter password"
                     onKeyUp={(event) => setPassword(event.target.value)} />
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-6">
              <button type="button" className="btn btn-primary"
                      onClick={onLoginBtnClick}>
                Sign In
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>

    </React.Fragment>
  )
}

export default Login
