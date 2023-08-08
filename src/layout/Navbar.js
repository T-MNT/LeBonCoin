import {
  faBell,
  faHeart,
  faMessage,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
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
            <p>Déposer une annonce</p>
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
            <li className="text-center">
              <FontAwesomeIcon icon={faUser} size="xl" />
              <p className="text-xs ">Se connecter</p>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex justify-between w-full list-disc ">
            <NavLink to="/Search/Immobilier">
              <li className="text-slate-900 text-[14px]">Immobilier</li>
            </NavLink>
            <NavLink to="/Search/Vehicules">
              <li className="text-slate-900 text-[14px]">Véhicules</li>
            </NavLink>
            <NavLink to="/Search/Vacances">
              <li className="text-slate-900 text-[14px]">Vacances</li>
            </NavLink>
            <NavLink to="/Search/Emploi">
              <li className="text-slate-900 text-[14px]">Emploi</li>
            </NavLink>
            <NavLink to="/Search/Mode">
              <li className="text-slate-900 text-[14px]">Mode</li>
            </NavLink>
            <NavLink to="/Search/Maison">
              <li className="text-slate-900 text-[14px]">Maison</li>
            </NavLink>
            <NavLink to="/Search/Multimédia">
              <li className="text-slate-900 text-[14px]">Multimédia</li>
            </NavLink>
            <NavLink to="/Search/Loisirs">
              <li className="text-slate-900 text-[14px]">Loisirs</li>
            </NavLink>
            <NavLink to="/Search/Materiel_professionnel">
              <li className="text-slate-900 text-[14px]">
                Materiel professionnel
              </li>
            </NavLink>
            <NavLink to="/Search/Autres">
              <li className="text-slate-900 text-[14px]">Autres</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
