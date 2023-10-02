import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import axios from 'axios';
import routes from '../variables/Vroutes';

const ProductPage = (props) => {
  const [product, setProduct] = useState({});
  const id = useParams().id;

  useEffect(() => {
    axios.get(routes.BACK + '/products/' + id).then((res) => {
      setProduct(res.data);
    });
  }, []);

  const overviewDisplayer = () => {
    switch (product.categorie) {
      case '/api/categories/1':
        return (
          <ul className="flex list-disc list-inside my-6 text-slate-700 ">
            <li className="mr-4">{product.localisation}</li>
            <li className="mr-4">{product.surface + ' m²'}</li>
            <li className="mr-4">{product.pieces + ' pièces'}</li>
          </ul>
        );
      case '/api/categories/2':
        return (
          <ul className="flex list-disc list-inside my-6 text-slate-700 ">
            <li className="mr-4">{product.annee}</li>
            <li className="mr-4">{product.kilometrage + ' km'}</li>
            <li className="mr-4">{'Boîte ' + product.boite.toLowerCase()}</li>
          </ul>
        );
      case '/api/categories/5':
        return (
          <ul className="flex list-disc list-inside my-6 text-slate-700 ">
            <li className="mr-4">{product.marque}</li>
            <li className="mr-4">{'Taille ' + product.taille}</li>
            <li className="mr-4">{product.etat}</li>
          </ul>
        );
      case '/api/categories/7':
        return (
          <ul className="flex list-disc list-inside my-6 text-slate-700 ">
            <li className="mr-4">{product.marque}</li>
            <li className="mr-4">{product.modele}</li>
            <li className="mr-4">{product.etat}</li>
          </ul>
        );

      default:
        break;
    }
  };

  const favHandler = () => {
    if (props.favoris) {
      let favoris = props.favoris;

      if (favoris.includes(product.id)) {
        let newFavs = favoris.filter((item) => item !== product.id);
        window.localStorage.setItem('LBC_FAVS', JSON.stringify(newFavs));
        props.setFavoris(newFavs);
      } else {
        favoris.push(product.id);
        window.localStorage.setItem('LBC_FAVS', JSON.stringify(favoris));
        props.setFavoris(favoris);
      }
    } else {
      window.localStorage.setItem('LBC_FAVS', JSON.stringify([product.id]));
      props.setFavoris([product.id]);
    }
  };

  const caracteristicsDisplayer = () => {
    switch (product.categorie) {
      case '/api/categories/1':
        return (
          <div className="pb-10">
            <h5 className="font-bold text-xl mb-6">Critères</h5>
            <ul className="grid grid-cols-2 gap-y-6">
              <li>
                <p className="text-sm text-slate-600">Localisation</p>
                <p className="font-bold text-lg">{product.localisation}</p>
              </li>
              <li>
                <p className="text-sm text-slate-600">Type de bien</p>
                <p className="font-bold text-lg">{product.materielType}</p>
              </li>
              <li>
                <p className="text-sm text-slate-600">Pièces</p>
                <p className="font-bold text-lg">{product.pieces}</p>
              </li>
              <li>
                <p className="text-sm text-slate-600">Surface</p>
                <p className="font-bold text-lg">{product.surface + ' m²'}</p>
              </li>
              {product.annee && product.annee.length > 1 ? (
                <li>
                  <p className="text-sm text-slate-600">Année</p>
                  <p className="font-bold text-lg">{product.annee}</p>
                </li>
              ) : null}
            </ul>
          </div>
        );
      case '/api/categories/2':
        return (
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
                <p className="font-bold text-lg">
                  {product.kilometrage + ' km'}
                </p>
              </li>
              {product.annee && product.annee.length > 1 ? (
                <li>
                  <p className="text-sm text-slate-600">Année</p>
                  <p className="font-bold text-lg">{product.annee}</p>
                </li>
              ) : null}
            </ul>
          </div>
        );
      case '/api/categories/5':
        return (
          <div className="pb-10">
            <h5 className="font-bold text-xl mb-6">Critères</h5>
            <ul className="grid grid-cols-2 gap-y-6">
              <li>
                <p className="text-sm text-slate-600">Taille</p>
                <p className="font-bold text-lg">{product.taille}</p>
              </li>
              <li>
                <p className="text-sm text-slate-600">Marque</p>
                <p className="font-bold text-lg">{product.marque}</p>
              </li>
              <li>
                <p className="text-sm text-slate-600">Matière</p>
                <p className="font-bold text-lg">{product.matiere}</p>
              </li>
              <li>
                <p className="text-sm text-slate-600">Etat</p>
                <p className="font-bold text-lg">{product.etat}</p>
              </li>
            </ul>
          </div>
        );
      case '/api/categories/7':
        return (
          <div className="pb-10">
            <h5 className="font-bold text-xl mb-6">Critères</h5>
            <ul className="grid grid-cols-2 gap-y-6">
              <li>
                <p className="text-sm text-slate-600">Modèle</p>
                <p className="font-bold text-lg">{product.modele}</p>
              </li>
              <li>
                <p className="text-sm text-slate-600">Marque</p>
                <p className="font-bold text-lg">{product.marque}</p>
              </li>
              <li>
                <p className="text-sm text-slate-600">Etat</p>
                <p className="font-bold text-lg">{product.etat}</p>
              </li>
              {product.annee && product.annee.length > 1 ? (
                <li>
                  <p className="text-sm text-slate-600">Année</p>
                  <p className="font-bold text-lg">{product.annee}</p>
                </li>
              ) : null}
            </ul>
          </div>
        );

      default:
        break;
    }
  };
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
                {product.vendeur && product.vendeur.prenom
                  ? product.vendeur.prenom
                  : null}
              </h4>
            </div>
            <div className="h-[1px] w-full bg-slate-300 mb-8" />
            <button className="block w-[320px] text-white font-text font-bold tracking-wide bg-blue-900 rounded-xl py-2 ">
              Envoyer un message
            </button>
            <button className="block w-[320px] text-blue-900 font-text font-bold tracking-wide border-[1px] border-blue-900 rounded-xl py-2 my-3">
              Voir le numéro
            </button>
            <button
              className="block w-[320px] text-white font-text font-bold tracking-wide bg-[#ED5B13] border-blue-900 rounded-xl py-2"
              onClick={() => favHandler()}
            >
              {props.favoris && props.favoris.includes(product.id)
                ? 'Supprimer des favoris'
                : 'Ajouter aux favoris'}
            </button>
          </div>
        </div>
        <div>
          <h5 className="text-2xl font-bold ">{product.nom}</h5>
          {overviewDisplayer()}
          <p className="text-xl my-4">{product.prix + ' €'}</p>
          <p className="text-slate-600 text-sm mb-10">25/09/23 à 12:12</p>
          <div className="h-[1px] w-[700px] bg-slate-300 mb-8" />
        </div>
        {caracteristicsDisplayer()}
        {product.categorie === '/api/categories/9' ? null : (
          <div className="h-[1px] w-[700px] bg-slate-300" />
        )}
        <h5 className="font-bold text-xl my-6">Description</h5>
        <p className="mt-6 pb-12 w-2/3">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
