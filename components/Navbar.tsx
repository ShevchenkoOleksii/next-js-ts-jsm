import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { NavLinks } from '../constants';
import AuthProviders from './AuthProviders';
import { getCurrentUser } from '../lib/session';
import ProfileMenu from './ProfileMenu';

const Navbar = async () => {
  const session = await getCurrentUser();

  const renderLinks = () => {
    return NavLinks.map((link) => {
      const { href, key, text } = link;

      return (
        <Link href={href} key={key}>
          {text}
        </Link>
      )
    });
  };

  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href='/'>
          <Image
            src='./logo.svg'
            width={115}
            height={43}
            alt='logo'
          />
        </Link>
        <ul className='xl:flex hidden text-small gap-7'>
          {renderLinks()}
        </ul>
      </div>
      <div className='flexCenter gap-4'>
        {session?.user ? (
         <>
           <ProfileMenu session={session} />
           <Link href={'/create-project'}>
             Share Work
           </Link>
         </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
