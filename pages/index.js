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

      <main className='container max-w-2xl px-4 mx-auto text-white touch-action-manipulation sm:px-6'>
        <div className='relative'>
          <a
            className='absolute right-0 mt-4 focus:text-green-600 focus:outline-none hover:text-green-600'
            href='https://github.com/aeorge/pwg'
            aria-label='GitHub repository'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg className='w-8 h-8 fill-current' viewBox='0 0 512 512'>
              <path
                d='M255.968,5.329C114.624,5.329,0,120.401,0,262.353c0,113.536,73.344,209.856,175.104,243.872
                c12.8,2.368,17.472-5.568,17.472-12.384c0-6.112-0.224-22.272-0.352-43.712c-71.2,15.52-86.24-34.464-86.24-34.464
                c-11.616-29.696-28.416-37.6-28.416-37.6c-23.264-15.936,1.728-15.616,1.728-15.616c25.696,1.824,39.2,26.496,39.2,26.496
                c22.848,39.264,59.936,27.936,74.528,21.344c2.304-16.608,8.928-27.936,16.256-34.368
                c-56.832-6.496-116.608-28.544-116.608-127.008c0-28.064,9.984-51.008,26.368-68.992c-2.656-6.496-11.424-32.64,2.496-68
                c0,0,21.504-6.912,70.4,26.336c20.416-5.696,42.304-8.544,64.096-8.64c21.728,0.128,43.648,2.944,64.096,8.672
                c48.864-33.248,70.336-26.336,70.336-26.336c13.952,35.392,5.184,61.504,2.56,68c16.416,17.984,26.304,40.928,26.304,68.992
                c0,98.72-59.84,120.448-116.864,126.816c9.184,7.936,17.376,23.616,17.376,47.584c0,34.368-0.32,62.08-0.32,70.496
                c0,6.88,4.608,14.88,17.6,12.352C438.72,472.145,512,375.857,512,262.353C512,120.401,397.376,5.329,255.968,5.329z'
              />
            </svg>
          </a>
        </div>

        <div className='h-12 sm:h-32' />

        <h1 className='text-6xl font-bold text-center'>PWG</h1>

        <div className='h-6 sm:h-12' />

        <h2 className='text-lg text-center'>
          Generate a secure, random password.
        </h2>

        <div className='h-6 sm:h-12' />

        {/* Password field */}
        <div className='flex items-center justify-between w-full h-12 pl-4 pr-2 space-x-2 bg-gray-900 rounded'>
          <input
            className='w-full tracking-widest truncate bg-transparent outline-none'
            type='text'
            aria-label='Generated password'
            readOnly
            value={password}
            ref={passwordField}
          />
          <button
            className='transition duration-200 ease-in-out cursor-pointer hoverable:hover:text-green-600 focus:text-green-600 focus:outline-none'
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

        {/* Range slider */}
        <div className='flex items-center space-x-4'>
          <input
            className='w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none focus:shadow-outline-green'
            type='range'
            aria-label='Slider for password length'
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

        {/* Type selectors */}
        <div className='grid grid-cols-2 gap-4'>
          <button
            className={`w-full h-12 px-4 border-2 rounded truncate select-none transition duration-200 ease-in-out focus:outline-none focus:shadow-outline-green ${
              uppercase && 'border-transparent text-black bg-white'
            }`}
            onClick={() => setUppercase(!uppercase)}
          >
            uppercase
          </button>
          <button
            className={`w-full h-12 px-4 border-2 rounded truncate select-none transition duration-200 ease-in-out focus:outline-none focus:shadow-outline-green ${
              lowercase && 'border-transparent text-black bg-white'
            }`}
            onClick={() => setLowercase(!lowercase)}
          >
            lowercase
          </button>
          <button
            className={`w-full h-12 px-4 border-2 rounded truncate select-none transition duration-200 ease-in-out focus:outline-none focus:shadow-outline-green ${
              numbers && 'border-transparent text-black bg-white'
            }`}
            onClick={() => setNumbers(!numbers)}
          >
            numbers
          </button>
          <button
            className={`w-full h-12 px-4 border-2 rounded truncate select-none transition duration-200 ease-in-out focus:outline-none focus:shadow-outline-green ${
              symbols && 'border-transparent text-black bg-white'
            }`}
            onClick={() => setSymbols(!symbols)}
          >
            symbols
          </button>
        </div>

        <div className='h-6 sm:h-12' />

        {/* Generate button */}
        <button
          className='w-full h-12 px-4 truncate transition duration-200 ease-in-out bg-green-700 rounded select-none hoverable:hover:bg-green-600 focus:outline-none focus:shadow-outline-green'
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
