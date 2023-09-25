import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import axios from 'axios';
import routes from '../variables/Vroutes';

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const id = useParams().id;

  useEffect(() => {
    axios.get(routes.BACK + '/products/' + id).then((res) => {
      setProduct(res.data);
    });
  }, []);
  return (
    <div className="font-text">
      <Navbar />
      <div className=" w-[55%] mx-auto h-[80vh]">
        <div className=" w-fit flex my-10" id="pic-container">
          <div
            className=" w-[350px] h-[340px] bg-slate-500 mr-3 rounded-xl"
            id="pic1"
          ></div>
          <div className=" w-[350px] flex flex-col justify-between mr-4">
            <div className="h-[48%] bg-red-200 rounded-xl"></div>
            <div className="h-[48%] bg-red-500 rounded-xl"></div>
          </div>
          <div className="h-fit px-4 py-6 rounded shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="h-[70px] w-[70px] rounded-full bg-slate-700 mr-4"></div>
              <h4 className="font-text text-slate-800 font-bold text-xl">
                Vendeur
              </h4>
            </div>
            <div className="h-[1px] w-full bg-slate-300 mb-8" />
            <button className="block w-[320px] text-white font-text font-bold tracking-wide bg-blue-900 rounded-xl py-2 mb-3">
              Envoyer un message
            </button>
            <button className="block w-[320px] text-blue-900 font-text font-bold tracking-wide border-[1px] border-blue-900 rounded-xl py-2">
              Voir le numéro
            </button>
          </div>
        </div>
        <div>
          <h5 className="text-2xl font-bold ">{product.nom}</h5>
          <ul className="flex list-disc list-inside my-6 text-slate-700 ">
            <li className="mr-4">{product.annee}</li>
            <li className="mr-4">{product.kilometrage + ' km'}</li>
            <li className="mr-4">{product.boite}</li>
            <li className="mr-4">{product.annee}</li>
          </ul>
          <p className="text-xl mb-4">{product.prix + ' €'}</p>
          <p className="text-slate-600 text-sm mb-10">25/09/23 à 12:12</p>
          <div className="h-[1px] w-[700px] bg-slate-300 mb-8" />
        </div>
        <div className="pb-10">
          <h5 className="font-bold text-xl mb-6">Critères</h5>
          <ul className="grid grid-cols-2 gap-y-6">
            <li>
              <p className="text-sm text-slate-600">Marque</p>
              <p className="font-bold text-lg">{product.marque}</p>
            </li>
            <li>
              <p className="text-sm text-slate-600">Modèle</p>
              <p className="font-bold text-lg">{product.modele}</p>
            </li>
            <li>
              <p className="text-sm text-slate-600">Boîte</p>
              <p className="font-bold text-lg">{product.boite}</p>
            </li>
            <li>
              <p className="text-sm text-slate-600">Carburant</p>
              <p className="font-bold text-lg">{product.carburant}</p>
            </li>
            <li>
              <p className="text-sm text-slate-600">Kilomètrage</p>
              <p className="font-bold text-lg">{product.kilometrage + ' km'}</p>
            </li>
            {product.annee && product.annee.length > 1 ? (
              <li>
                <p className="text-sm text-slate-600">Année</p>
                <p className="font-bold text-lg">{product.annee}</p>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
