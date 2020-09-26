import { useState, useRef } from 'react'
import Head from 'next/head'

const Home = () => {
  const [length, setLength] = useState(20)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState('')

  const passwordField = useRef(null)
  const copyButtonRef = useRef(null)
  const sliderRef = useRef(null)
  const generateButtonRef = useRef(null)

  // Generate random uppercase character
  const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  }

  // Generate random lowercase character
  const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }

  // Generate random number
  const getRandomNumber = () => {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48)
  }

  // Generate random symbol
  const getRandomSymbol = () => {
    const symbols = '!?+-*/.,:;@#()[]{}<>'
    return symbols[Math.floor(Math.random() * symbols.length)]
  }

  const generatePassword = () => {
    const selectedTypes = [
      { uppercase },
      { lowercase },
      { numbers },
      { symbols },
    ].filter((type) => Object.values(type)[0])

    let password = ''

    if (selectedTypes.length !== 0) {
      for (let i = 0; i < length; i++) {
        // const type = Math.floor(Math.random() * 4)

        const type = Object.keys(
          selectedTypes[Math.floor(Math.random() * selectedTypes.length)]
        ).toString()

        switch (type) {
          case 'uppercase':
            password += getRandomUpper()
            break
          case 'lowercase':
            password += getRandomLower()
            break
          case 'numbers':
            password += getRandomNumber()
            break
          case 'symbols':
            password += getRandomSymbol()
            break
          default:
            break
        }
      }
    }

    setPassword(password)
  }

  const copyToClipboard = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password)
        passwordField.current.value = 'Copied!'
      } catch (error) {
        passwordField.current.value = 'Error!'
      }
      setTimeout(() => {
        passwordField.current.value = password
      }, 500)
      copyButtonRef.current.blur()
    }
  }

  return (
    <div>
      <Head>
        <title>PWG</title>
        <meta name='description' content='A simple password generator.' />
      </Head>

      <main className='container max-w-2xl mx-auto px-4 font-roboto-mono text-white touch-action-manipulation sm:px-6'>
        <div className='h-12 sm:h-32' />

        <h1 className='text-6xl font-bold text-center'>PWG</h1>

        <div className='h-6 sm:h-12' />

        <h2 className='text-lg text-center'>
          Generate a secure, random password.
        </h2>

        <div className='h-6 sm:h-12' />

        <div className='flex justify-between items-center space-x-2 w-full h-12 pl-4 pr-2 rounded-lg bg-gray-900'>
          <input
            className='w-full bg-transparent tracking-widest truncate outline-none'
            type='text'
            aria-label='Password'
            readOnly
            value={password}
            ref={passwordField}
          />
          <button
            className='cursor-pointer transition duration-200 ease-in-out hoverable:hover:text-green-600 focus:text-green-600 focus:outline-none'
            aria-label='Copy to clipboard'
            onClick={() => copyToClipboard()}
            ref={copyButtonRef}
          >
            <svg
              className='w-8 h-8'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
              />
            </svg>
          </button>
        </div>

        <div className='h-6 sm:h-12' />

        <div className='flex items-center space-x-4'>
          <input
            className='appearance-none w-full h-2 rounded-full cursor-pointer focus:outline-none'
            type='range'
            name='slider'
            id='slider'
            min='8'
            max='40'
            onChange={() => {
              const { value } = sliderRef.current
              setLength(value)
            }}
            ref={sliderRef}
          />
          <div className='w-8 text-xl text-right'>{length}</div>
        </div>

        <div className='h-4' />

        <div className='grid grid-cols-2 gap-4'>
          <button
            className={`w-full h-12 px-4 border-2 rounded-lg truncate select-none transition duration-200 ease-in-out focus:outline-none ${
              uppercase && 'border-transparent text-black bg-white'
            }`}
            onClick={() => setUppercase(!uppercase)}
          >
            uppercase
          </button>
          <button
            className={`w-full h-12 px-4 border-2 rounded-lg truncate select-none transition duration-200 ease-in-out focus:outline-none ${
              lowercase && 'border-transparent text-black bg-white'
            }`}
            onClick={() => setLowercase(!lowercase)}
          >
            lowercase
          </button>
          <button
            className={`w-full h-12 px-4 border-2 rounded-lg truncate select-none transition duration-200 ease-in-out focus:outline-none ${
              numbers && 'border-transparent text-black bg-white'
            }`}
            onClick={() => setNumbers(!numbers)}
          >
            numbers
          </button>
          <button
            className={`w-full h-12 px-4 border-2 rounded-lg truncate select-none transition duration-200 ease-in-out focus:outline-none ${
              symbols && 'border-transparent text-black bg-white'
            }`}
            onClick={() => setSymbols(!symbols)}
          >
            symbols
          </button>
        </div>

        <div className='h-6 sm:h-12' />

        <button
          className='w-full h-12 px-4 rounded-lg bg-green-700 truncate select-none transition duration-200 ease-in-out hoverable:hover:bg-green-600 focus:bg-green-600 focus:outline-none'
          onClick={() => {
            generatePassword()
            generateButtonRef.current.blur()
          }}
          ref={generateButtonRef}
        >
          Generate
        </button>

        <div className='h-12 sm:h-32' />
      </main>
    </div>
  )
}

export default Home
