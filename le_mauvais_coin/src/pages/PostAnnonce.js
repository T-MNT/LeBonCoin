import React, { useState } from 'react';
import PostAnnonceBar from '../layout/PostAnnonceBar';
import Input from '../components/Input';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/postAnnonce.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const PostAnnonce = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [annonce, setAnnonce] = useState({
    nom: '',
    prix: 0,
    annee: '',
    etat: '',
    description: '',
    kilometrage: '',
    boite: '',
    carburant: '',
    matiere: '',
    taille: '',
    couleur: '',
    marque: '',
    surface: 0,
    pieces: 0,
    localisation: '',
    materielType: '',
    categorie: 0,
  });

  const annonceSetter = (property, value) => {
    setAnnonce((prevAnnonce) => ({
      ...prevAnnonce,
      [property]: value,
    }));
  };

  const contentDisplayer = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h4 className="font-text text-xl mb-3">
              Commençons par l'essentiel !
            </h4>
            <p className="font-text text-slate-600">
              Quel est le titre de l'annonce ?
            </p>
            <div className="flex items-center mt-2">
              <input
                className="w-[380px] mr-2 border-[1px] border-slate-300 rounded-2xl py-[10px] pl-3 "
                onChange={(e) => annonceSetter('nom', e.target.value)}
              />
              <button
                className="bg-lbcOrange px-6 py-3 rounded-2xl text-white font-text font-bold tracking-wide"
                onClick={() => setStep(step + 1)}
              >
                Continuer
              </button>
            </div>
            <p className="text-xs mt-6 text-slate-500">
              <b>Me renseigner</b> sur les finalités du traitement de mes
              données personnelles, les destinataires, le responsable de
              traitement, les durées de conservation, les coordonnées du DPO et
              mes droits.
            </p>
          </>
        );
      case 1:
        return (
          <>
            <h4 className="font-text text-xl mb-3">
              Commençons par l'essentiel !
            </h4>
            <p className="font-text text-slate-600">
              Quel est le titre de l'annonce ?
            </p>
            <div className="mt-2">
              <input
                className="w-[380px] mr-2 border-[1px] border-slate-300 rounded-2xl py-[10px] pl-3 mb-8"
                onChange={(e) => annonceSetter('nom', e.target.value)}
                value={annonce.nom}
              />
              <select
                className="py-3 border-[1px] border-slate-300 rounded-2xl w-[380px] px-3 mr-12"
                onChange={(e) => {
                  annonceSetter('categorie', e.target.value);
                }}
              >
                <option value={0}>Choisir une catégorie</option>
                <option value={4}>Emploi</option>
                <option value={2}>Véhicules</option>
                <option value={1}>Immobilier</option>
                <option value={3}>Vacances</option>
                <option value={7}>Multimédia</option>
                <option value={6}>Maison</option>
                <option value={5}>Mode</option>
                <option value={8}>Loisirs</option>
                <option value={9}>Matériel professionnel</option>
                <option value={10}>Divers</option>
              </select>
              <button
                className="bg-lbcOrange px-6 py-3 rounded-2xl text-white font-text font-bold tracking-wide"
                onClick={() => setStep(step + 1)}
              >
                Continuer
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h4 className="font-text text-xl mb-3">Dites-nous en plus</h4>
            <label className="block mb-2">Etat</label>
            <select
              className="py-3 border-[1px] border-slate-300 rounded w-[380px] px-3 mr-12 block"
              onChange={(e) => {
                annonceSetter('etat', e.target.value);
              }}
            >
              <option value="Etat neuf">Etat neuf</option>
              <option value="Très bon état">Très bon état</option>
              <option value="Bon état">Bon état</option>
              <option value="Etat satisfaisant">Etat satisfaisant</option>
              <option value="Pour pièces">Pour pièces</option>
            </select>
            <div className="flex justify-between w-full mt-10">
              <button
                className="py-2 px-4 border-[1px] border-[#4183D7] text-[#4183D7] rounded  font-text"
                onClick={() => setStep(step - 1)}
              >
                Retour
              </button>
              <button
                className="py-2 px-4 bg-[#4183D7] rounded text-white font-text"
                onClick={() => setStep(step + 1)}
              >
                Continuer
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h4 className="font-text text-xl mb-3">Décrivez votre bien !</h4>
            <div className="mb-8">
              <label className="block mb-2 font-text">Titre de l'annonce</label>
              <div className="w-fit">
                <input
                  className="w-[380px]  border-[1px] border-slate-300 rounded py-[10px] pl-3 mb-1"
                  onChange={(e) => annonceSetter('nom', e.target.value)}
                  value={annonce.nom}
                />
                <p className="text-sm text-slate-400 text-end mb-2">
                  {annonce.nom.length + ' / 100 caractères'}
                </p>
                <p className="text-sm text-blue-400">
                  Vous n'avez pas besoin de mentionner "Achat" ou "vente" ici
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="font-text">Description de l'annonce</label>
                <p className="text-xs text-slate-400">Champ requis</p>
              </div>
              <textarea
                className="w-full h-[200px] border-[1px] border-slate-300 rounded resize-none mt-2 p-2"
                onChange={(e) => annonceSetter('description', e.target.value)}
              />
              <p className="text-sm text-slate-400 text-end mb-2">
                {annonce.description.length + ' / 4000 caractères'}
              </p>
              <p className="text-xs text-blue-400">
                Nous vous rappelons que la vente de contrefaçons est interdite.
                Nous vous invitons à ajouter tout élément permettant de prouver
                l'authenticité de votre article: numéro de série, facture,
                certificat, inscription de la marque sur l'article, emballage
                etc.
                <br />
                <br />
                Indiquez dans le texte de l'annonce si vous proposez un droit de
                rétractation à l'acheteur. En l'absence de toute mention,
                l'acheteur n'en bénéficiera pas et ne pourra pas demander le
                remboursement ou l'échange du bien ou service proposé
              </p>
            </div>
            <div className="flex justify-between w-full mt-10">
              <button
                className="py-2 px-4 border-[1px] border-[#4183D7] text-[#4183D7] rounded  font-text"
                onClick={() => setStep(step - 1)}
              >
                Retour
              </button>
              <button
                className="py-2 px-4 bg-[#4183D7] rounded text-white font-text"
                onClick={() => setStep(step + 1)}
              >
                Continuer
              </button>
            </div>
          </>
        );
      default:
        break;
    }
  };

  return (
    <div className="bg-[#F4F9FE] h-[100vh]">
      <PostAnnonceBar />
      <div className="w-[55%] mx-auto mt-6">
        <div className="flex">
          <div className="bg-white w-3/4 p-6 rounded">
            {user.email != '' ? (
              contentDisplayer()
            ) : (
              <>
                <h4 className="font-text text-xl mb-3">Bonjour !</h4>
                <p className="font-text text-slate-600 mb-12">
                  Connectez-vous ou créez un compte pour déposer une annonce
                </p>

                <button
                  className="py-2 px-4 bg-[#4183D7] rounded text-white font-text mr-2"
                  onClick={() => navigate('/authentification/login')}
                >
                  Me connecter
                </button>
                <button
                  className="py-2 px-4 border-[1px] border-[#4183D7] rounded text-[#4183D7] font-text"
                  onClick={() => navigate('/authentification/signin')}
                >
                  Créer un compte
                </button>
              </>
            )}
          </div>

          <div className="w-1/4 text-center pt-6 px-10 ">
            <div
              className="relative flex justify-center items-center mb-4"
              id="bulb"
            >
              <FontAwesomeIcon
                icon={faLightbulb}
                size="2xl"
                style={{ color: '#f57c0a' }}
              />
            </div>

            <p className="text-slate-600 text-sm mb-4">
              Votre annonce sera trouvée plus facilement !
            </p>
            <p className="text-slate-600 text-sm">
              Vous aurez 50% de chances en plus d'être contacté si votre annonce
              est dans la bonne catégorie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAnnonce;
