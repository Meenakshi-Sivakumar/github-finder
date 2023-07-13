import {FaHome} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='hero'>
      <div className='text-center hero-content text-gray-100'>
      <div className='max-w-lg'>
        <h1 className='text-8xl font-bold mb-8'>Oops!</h1>
        <p className='text-5xl mb-8'>404 page not found</p>
        <Link className='btn btn-primary btn-md' to="/">
            <FaHome className="mr-2"/>
            Back to Home
        </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
