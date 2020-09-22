import { useState } from 'react'
import Head from 'next/head'

const Home = () => {
  const [length, setLength] = useState(20)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState('')

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
    // TODO: Add success and error notification
    try {
      await navigator.clipboard.writeText(password)
    } catch (error) {}
  }

  return (
    <div>
      <Head>
        <title>PWG</title>
        <meta name='description' content='A simple password generator.' />
      </Head>

      <main className='container max-w-2xl mx-auto px-6 font-roboto-mono text-white'>
        <div className='h-12 sm:h-32' />

        <h1 className='text-6xl font-bold text-center'>PWG</h1>

        <div className='h-6 sm:h-12' />

        <h2 className='text-lg text-center'>
          Generate a secure, random password.
        </h2>

        <div className='h-6 sm:h-12' />

        <div className='flex justify-between items-center w-full h-12 mr-4 pl-4 pr-2 rounded-lg bg-gray-900'>
          <input
            className='w-full bg-transparent tracking-widest truncate outline-none'
            type='text'
            aria-label='Password'
            readOnly
            value={password}
          />
          <button
            className='w-8 h-8 ml-2 cursor-pointer hover:text-green-600 focus:text-green-600 focus:outline-none'
            aria-label='Copy to clipboard'
          >
            <svg
              className='w-8 h-8'
              onClick={() => copyToClipboard()}
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

        <div className='flex flex-wrap justify-center'>
          {/* TODO: Add range slider for password length */}
          <div className='flex w-full mb-4'>
            <button
              className={`w-full h-12 mr-2 py-2 px-4 border-2 rounded-lg focus:outline-none ${
                uppercase && 'border-transparent text-black bg-white'
              }`}
              onClick={() => setUppercase(!uppercase)}
            >
              uppercase
            </button>
            <button
              className={`w-full h-12 ml-2 py-2 px-4 border-2 rounded-lg focus:outline-none ${
                lowercase && 'border-transparent text-black bg-white'
              }`}
              onClick={() => setLowercase(!lowercase)}
            >
              lowercase
            </button>
          </div>
          <div className='flex w-full'>
            <button
              className={`w-full h-12 mr-2 py-2 px-4 border-2 rounded-lg focus:outline-none ${
                numbers && 'border-transparent text-black bg-white'
              }`}
              onClick={() => setNumbers(!numbers)}
            >
              numbers
            </button>
            <button
              className={`w-full h-12 ml-2 py-2 px-4 border-2 rounded-lg focus:outline-none ${
                symbols && 'border-transparent text-black bg-white'
              }`}
              onClick={() => setSymbols(!symbols)}
            >
              symbols
            </button>
          </div>
        </div>

        <div className='h-6 sm:h-12' />

        <button
          className='w-full h-12 border-2 rounded-lg hover:border-transparent hover:bg-green-600 focus:border-transparent focus:bg-green-600 focus:outline-none'
          onClick={() => generatePassword()}
        >
          Generate
        </button>

        <div className='h-12 sm:h-32' />
      </main>
    </div>
  )
}
export default Home
