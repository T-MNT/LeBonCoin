import {
  faBell,
  faHeart,
  faMessage,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  let menu = [
    { name: 'Immobilier', id: 1 },
    { name: 'Vehicules', id: 2 },
    { name: 'Vacances', id: 3 },
    { name: 'Emploi', id: 4 },
    { name: 'Mode', id: 5 },
    { name: 'Maison', id: 6 },
    { name: 'Multimedia', id: 7 },
    { name: 'Loisirs', id: 8 },
    { name: 'Materiel_professionnel', id: 9 },
    { name: 'Autres', id: 10 },
  ];

  const user = useSelector((state) => state.user);

  return (
    <div className="border-b-2 border-[#E6EAEE]">
      <div className="w-[55%] mx-auto pt-2 pb-4">
        <div className="flex items-center justify-between w-full mb-6">
          <NavLink to="/">
            <h1 className="text-[28px] text-lbcOrange  font-round cursor-pointer ">
              leboncoin
            </h1>
          </NavLink>
          <button className="flex items-center bg-[#ED5B13] px-4 py-[10px] font-bold text-white rounded-2xl ">
            <FontAwesomeIcon
              icon={faPlus}
              size="xs"
              className="mr-2 border-[1px] px-[2px] py-[1px] rounded border-white"
            />{' '}
            <NavLink to="/post">
              <p>Déposer une annonce</p>
            </NavLink>
          </button>
          <form className="flex bg-[#F0F4FB] rounded-2xl pr-2 py-1">
            <input
              type="text"
              className="bg-[#F0F4FB] text-lr rounded-2xl pl-4 pr-20 outline-none w-12/12"
              placeholder="Rechercher sur leboncoin"
            />
            <button
              type="submit"
              className="bg-[#ED5B13] h-[32px] w-[32px] rounded-xl   "
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="sm"
                color="white"
              />
            </button>
          </form>

          <ul className="flex items-center justify-between">
            <li className="mr-4 text-center">
              <FontAwesomeIcon icon={faBell} size="xl" />
              <p className="text-xs ">Mes recherches</p>
            </li>
            <li className="mr-4 text-center">
              <FontAwesomeIcon icon={faHeart} size="xl" />
              <p className="text-xs ">Favoris</p>
            </li>
            <li className="mr-4 text-center">
              <FontAwesomeIcon icon={faMessage} size="xl" />
              <p className="text-xs ">Messages</p>
            </li>
            <NavLink to="/authentification/login">
              <li className="text-center">
                <FontAwesomeIcon icon={faUser} size="xl" />
                <p className="text-xs ">
                  {user.email !== '' ? 'Mon profil' : 'Se connecter'}
                </p>
              </li>
            </NavLink>
          </ul>
        </div>
        <div>
          <ul className="flex justify-between w-full list-disc ">
            {menu.map((element) => (
              <NavLink
                to={`/search/${element.name.toLocaleLowerCase()}`}
                onClick={() => {
                  if (props.setCategorie) {
                    props.setCategorie(element.id);
                  }
                }}
              >
                <li className="text-slate-900 text-[14px]">
                  {element.name.replace('_', ' ')}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
