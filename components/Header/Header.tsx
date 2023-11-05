'use client';

import Image from 'next/image';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Avatar from 'react-avatar';

const Header = () => {
  return (
    <header>
      <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10'>
        <Image
          src='/trello-logo.png'
          width={300}
          height={150}
          alt='Trello logo'
          className='w-44 md:w-56 pb-10 md:pb-0 object-contain'
        />
        <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
          <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
            <MagnifyingGlassIcon className='h-5 w-6 text-gray-400' />
            <input
              type='text'
              placeholder='Search'
              className='flex-1 outline-none p-2'
            />
            <button hidden type='submit'>
              Search
            </button>
          </form>
          <Avatar name='Pavel Mezentcev' round color='#0055d1' size='50' />
        </div>
      </div>
    </header>
  );
};
export default Header;
