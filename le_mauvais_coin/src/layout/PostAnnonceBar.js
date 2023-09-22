import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const PostAnnonceBar = () => {
  const navigate = useNavigate();
  return (
    <div className=" shadow-[0_0_20px_0_rgba(0,0,0,0.3)] bg-white ">
      <div className="w-[55%] mx-auto py-3">
        <div className="flex justify-between w-full ">
          <div className="flex items-center">
            <NavLink to="/">
              <h1 className="text-[28px] text-lbcOrange  font-round cursor-pointer mr-8 ">
                leboncoin
              </h1>
            </NavLink>
            <p className="font-text">Déposer une annonce</p>
          </div>
          <button
            className="px-4 py-2 border-[1px] border-blue-700 rounded-xl font-text font-bold text-blue-800"
            onClick={() => navigate('/')}
          >
            Quitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAnnonceBar;
