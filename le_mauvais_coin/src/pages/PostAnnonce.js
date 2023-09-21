import React from 'react';
import PostAnnonceBar from '../layout/PostAnnonceBar';
import Input from '../components/Input';

const PostAnnonce = () => {
  return (
    <div className="bg-[#F4F9FE]">
      <PostAnnonceBar />
      <div className="w-[55%] mx-auto mt-12">
        <div className="flex">
          <div className="bg-white w-3/4 p-6 rounded">
            <h4 className="font-text text-xl mb-3">
              Commençons par l'essentiel !
            </h4>
            <p className="font-text text-slate-600">
              Quel est le titre de l'annonce ?
            </p>
            <div className="flex items-center mt-2">
              <Input width="w-[380px] mr-2" />
              <button className="bg-lbcOrange px-6 py-3 rounded-2xl text-white font-text font-bold tracking-wide">
                Continuer
              </button>
            </div>
            <p className="text-xs mt-6 text-slate-500">
              <b>Me renseigner</b> sur les finalités du traitement de mes
              données personnelles, les destinataires, le responsable de
              traitement, les durées de conservation, les coordonnées du DPO et
              mes droits.
            </p>
          </div>
          <div>lol</div>
        </div>
      </div>
    </div>
  );
};

export default PostAnnonce;
