import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import { number, upperCaseLetters, lowerCaseLetter, specialCharacters } from './characters';
import { COPY_SUCCESS } from './message';

function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludesymbols] = useState(false)

  const handleGeneratePassword = (e) => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      notify('You must select atleast one option!', true)
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetter
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + number
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }
    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newtextArea = document.createElement('textarea')
    newtextArea.innerText = password
    document.body.append(newtextArea)
    newtextArea.select()
    document.execCommand('copy')
    newtextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing to copy', true)
    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
    }

  }

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">
            Password Generator
          </h2>
          <div className="generator_password">
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copy_btn">
              <i className="far fa-clipboard"></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlfor="password-strength">Password Length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="20"
              min="10" />
          </div>
          <div className="form-group">
            <label htmlfor="uppercase-letters">Include Uppercase Letters</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
              max="20"
              min="10" />
          </div>
          <div className="form-group">
            <label htmlfor="lowercase-letters">Include Lowercase Letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
              max="20"
              min="10" />
          </div>
          <div className="form-group">
            <label htmlfor="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
              max="20"
              min="10" />
          </div>
          <div className="form-group">
            <label htmlfor="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludesymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
              max="20"
              min="10" />
          </div>
          <button onClick={handleGeneratePassword} className="generator_btn">Generate Password</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default App;
