import React, { useEffect, useState } from 'react';
import PostAnnonceBar from '../layout/PostAnnonceBar';
import routes from '../variables/Vroutes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/postAnnonce.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCameraRetro,
  faLightbulb,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const PostAnnonce = () => {
  const user = useSelector((state) => state.user);
  const userAccount = useSelector((state) => state.userAccount);
  const navigate = useNavigate();

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();

  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [annonce, setAnnonce] = useState({
    nom: null,
    prix: null,
    annee: null,
    etat: null,
    description: null,
    kilometrage: null,
    boite: null,
    carburant: null,
    matiere: null,
    taille: null,
    couleur: null,
    marque: null,
    surface: null,
    pieces: null,
    localisation: null,
    materielType: null,
    categorie: null,
    modele: null,
    vendeur: null,
    date: null,
    imagesUrl: [],
  });

  useEffect(() => {
    if (photos.length >= 1) {
      for (let i = 0; i < 11; i++) {
        let div = document.getElementById('photo' + (i + 1));
        if (div != null) {
          if (photos[i]) {
            div.innerHTML = `<img class="object-cover h-full w-full rounded" src=${photos[i]} />`;
          } else {
            div.innerHTML = `
          <div class="text-center">
          <FontAwesomeIcon
            icon=${faCameraRetro}
            style={{ color: '#CBD5E1' }}
            size="2xl"
          />
          <p class="block text-slate-400 font-bold mt-2">
            ${'Photo n°' + (i + 1)}
          </p>
        </div>`;
          }
        }
      }
    } else {
      for (let i = 0; i < 11; i++) {
        let div = document.getElementById('photo' + (i + 1));
        if (div != null) {
          div.innerHTML = `
          <div class="text-center">
          <FontAwesomeIcon
            icon=${faCameraRetro}
            style={{ color: '#CBD5E1' }}
            size="2xl"
          />
          <p class="block text-slate-200 font-bold mt-2">
            ${'Photo n°' + (i + 1)}
          </p>
        </div>`;
        }
      }
    }
  }, [photos]);

  let photoDivs = [];

  for (let i = 0; i < 11; i++) {
    photoDivs.push(
      <div
        id={i}
        className="w-[150px] h-[150px] flex items-center justify-center rounded border-[1px] border-dashed border-slate-300 cursor-pointer relative"
      >
        {photos.length > i ? (
          <div class="absolute top-[-10px] right-[-10px] rounded-full h-[20px] w-[20px] border-2 border-slate-400 flex justify-center items-center">
            <FontAwesomeIcon
              icon={faXmark}
              style={{ color: '#878787' }}
              onClick={() => {
                let photosCopy = photos;
                let result = photosCopy.filter(
                  (photo) => photosCopy.indexOf(photo) !== i
                );

                setPhotos(result);
              }}
            />
          </div>
        ) : null}
        <div
          className="h-full w-full flex justify-center items-center"
          id={'photo' + (i + 1)}
        >
          <div className="text-center">
            <FontAwesomeIcon
              icon={faCameraRetro}
              style={{ color: '#CBD5E1' }}
              size="2xl"
            />
            <p className="block text-slate-300 font-bold mt-2">
              {'Photo n°' + (i + 1)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  //////AJOUTE LA DATE DU JOUR ET ID DE L'UTILISATEUR A L'ANNONCE//////
  useEffect(() => {
    if (user.email !== '') {
      annonceSetter('vendeur', '/api/users/' + userAccount.id);
      annonceSetter('date', getCurrentDate());
    }
  }, [userAccount]);

  //////RETOURNE LA DATE DU JOUR AU FORMAT DD/MM/YYYY //////
  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (photos.length > 0 && photos.length === annonce.imagesUrl.length) {
      axios.post(routes.BACK + '/products', annonce).then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate('/');
        }
      });
    }
  }, [annonce.imagesUrl]);

  const postAnnonceHandler = async () => {
    let promises = [];
    let urlArray = [];

    for (let i = 0; i < photos.length; i++) {
      let id = uuidv4();
      const storageRef = ref(storage, 'pictures/' + id);

      let promise = axios
        .get(photos[i], { responseType: 'blob' })
        .then((response) => {
          return uploadBytes(storageRef, response.data).then((snapshot) => {
            urlArray.push(snapshot.metadata.fullPath);
          });
        });

      promises.push(promise);
    }

    await Promise.all(promises);
    setAnnonce({ ...annonce, imagesUrl: urlArray });
  };

  //////Convertis les images en blob et les ajoute au state photos//////
  const uploadFilesHandler = async (e) => {
    let newArray = [...photos];
    for (let i = 0; i < e.target.files.length; i++) {
      newArray.push(URL.createObjectURL(e.target.files[i]));
    }
    setPhotos(newArray);
  };

  //////MODIFIE LES PROPRIETES DU STATE ANNONCE//////
  const annonceSetter = (property, value) => {
    setAnnonce((prevAnnonce) => ({
      ...prevAnnonce,
      [property]: value,
    }));
  };

  const category1 = [
    '/api/categories/7',
    '/api/categories/5',
    '/api/categories/9',
    '/api/categories/10',
  ];

  const categoryDisplayer = () => {
    switch (annonce.categorie) {
      case '/api/categories/1':
        return 'Immobilier';
      case '/api/categories/2':
        return 'Véhicules';
      case '/api/categories/3':
        return 'Vacances';
      case '/api/categories/4':
        return 'Emploi';
      case '/api/categories/5':
        return 'Mode';
      case '/api/categories/6':
        return 'Maison';
      case '/api/categories/7':
        return 'Multimédia';
      case '/api/categories/8':
        return 'Loisirs';
      case '/api/categories/9':
        return 'Matériel professionnel';
      case '/api/categories/10':
        return 'Autres';

      default:
        break;
    }
  };

  //////FONCTION QUI GENERE LES INPUTS POUR CHAQUE ETAPE ET CHAQUE CATEGORIE DE PRODUIT//////
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
              <p className="font-text text-slate-600 mb-2">Catégorie</p>
              <select
                className="py-3 border-[1px] border-slate-300 rounded-2xl w-[380px] px-3 mr-12"
                onChange={(e) => {
                  annonceSetter(
                    'categorie',
                    '/api/categories/' + e.target.value
                  );
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
            {category1.includes(annonce.categorie) ? (
              <div className="mb-6">
                <label className="block mb-2">Etat</label>
                <select
                  className="py-3 border-[1px] border-slate-300 rounded w-[380px] px-3 mr-12 block"
                  onChange={(e) => {
                    annonceSetter('etat', e.target.value);
                  }}
                >
                  <option>Choisir un état</option>
                  <option value="Neuf">Neuf</option>
                  <option value="Très bon état">Très bon état</option>
                  <option value="Bon état">Bon état</option>
                  <option value="Etat satisfaisant">Etat satisfaisant</option>
                  <option value="Pour pièces">Pour pièces</option>
                </select>
              </div>
            ) : null}
            {/* IMMOBILIER */}
            {annonce.categorie === '/api/categories/1' ? (
              <div>
                <div className="mb-6">
                  <label className="block mb-2">Type de bien</label>
                  <select
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    onChange={(e) => {
                      annonceSetter('materielType', e.target.value);
                    }}
                  >
                    <option>Choisir un type de bien</option>
                    <option value="Maison">Maison</option>
                    <option value="Appartement">Appartemment</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Localisation</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.localisation}
                    onChange={(e) => {
                      annonceSetter('localisation', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">
                    Année de construction (facultatif)
                  </label>
                  <input
                    type="number"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3 [&::-webkit-inner-spin-button]:appearance-none"
                    value={annonce.annee}
                    onChange={(e) => {
                      annonceSetter('annee', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Surface en m²</label>
                  <input
                    type="number"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3 [&::-webkit-inner-spin-button]:appearance-none"
                    value={annonce.surface}
                    onChange={(e) => {
                      annonceSetter('surface', Number(e.target.value));
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Nombre de pièces</label>
                  <input
                    type="number"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3 [&::-webkit-inner-spin-button]:appearance-none"
                    value={annonce.pieces}
                    onChange={(e) => {
                      annonceSetter('pieces', Number(e.target.value));
                    }}
                  ></input>
                </div>
              </div>
            ) : null}
            {/* VEHICULES */}
            {annonce.categorie === '/api/categories/2' ? (
              <div>
                <div className="mb-6">
                  <label className="block mb-2">Marque</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.marque}
                    onChange={(e) => {
                      annonceSetter('marque', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Modèle</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.modele}
                    onChange={(e) => {
                      annonceSetter('modele', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Année</label>
                  <input
                    type="number"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3 [&::-webkit-inner-spin-button]:appearance-none"
                    value={annonce.annee}
                    onChange={(e) => {
                      annonceSetter('annee', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Kilomètrage</label>
                  <input
                    type="number"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3 [&::-webkit-inner-spin-button]:appearance-none"
                    value={annonce.kilometrage}
                    onChange={(e) => {
                      annonceSetter('kilometrage', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Carburant</label>
                  <select
                    className="py-3 border-[1px] border-slate-300 rounded w-[380px] px-3 mr-12 block"
                    onChange={(e) => {
                      annonceSetter('carburant', e.target.value);
                    }}
                  >
                    <option>Choisir un carburant</option>
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Electrique">Electrique</option>
                    <option value="Ethanol">Ethanol</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Boîte de vitesse</label>
                  <select
                    className="py-3 border-[1px] border-slate-300 rounded w-[380px] px-3 mr-12 block"
                    onChange={(e) => {
                      annonceSetter('boite', e.target.value);
                    }}
                  >
                    <option>Choisir un type de boîte</option>
                    <option value="Manuelle">Manuelle</option>
                    <option value="Automatique">Automatique</option>
                  </select>
                </div>
              </div>
            ) : null}
            {/* MODE */}
            {annonce.categorie === '/api/categories/5' ? (
              <div>
                <div className="mb-6">
                  <label className="block mb-2">Marque</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.marque}
                    onChange={(e) => {
                      annonceSetter('marque', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Matière</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.matiere}
                    onChange={(e) => {
                      annonceSetter('matiere', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Taille</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3 [&::-webkit-inner-spin-button]:appearance-none"
                    value={annonce.taille}
                    onChange={(e) => {
                      annonceSetter('taille', e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            ) : null}
            {/* MULTIMEDIA */}
            {annonce.categorie === '/api/categories/7' ? (
              <div>
                <div className="mb-6">
                  <label className="block mb-2">Type de produit</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.materielType}
                    onChange={(e) => {
                      annonceSetter('materielType', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Marque</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.marque}
                    onChange={(e) => {
                      annonceSetter('marque', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Modèle</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.matiere}
                    onChange={(e) => {
                      annonceSetter('modele', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Année (facultatif)</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3 [&::-webkit-inner-spin-button]:appearance-none"
                    value={annonce.taille}
                    onChange={(e) => {
                      annonceSetter('annee', e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            ) : null}
            {/* MATERIEL PROFESSIONNEL */}
            {annonce.categorie === '/api/categories/9' ? (
              <div>
                <div className="mb-6">
                  <label className="block mb-2">Type de produit</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.materielType}
                    onChange={(e) => {
                      annonceSetter('materielType', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Marque</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.marque}
                    onChange={(e) => {
                      annonceSetter('marque', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Modèle (facultatif)</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3"
                    value={annonce.matiere}
                    onChange={(e) => {
                      annonceSetter('matiere', e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="block mb-2">Année (facultatif)</label>
                  <input
                    type="text"
                    className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3 [&::-webkit-inner-spin-button]:appearance-none"
                    value={annonce.taille}
                    onChange={(e) => {
                      annonceSetter('taille', e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            ) : null}
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
                value={annonce.description}
              />
              <p className="text-sm text-slate-400 text-end mb-2">
                {annonce.description && annonce.description.length
                  ? +annonce.description.length + ' / 4000 caractères'
                  : null}
              </p>
              <p className="text-xs text-blue-400 mb-6">
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
              <div className="mb-6">
                <label className="block mb-2">Prix</label>
                <input
                  type="number"
                  className="w-[380px] mr-2 border-[1px] border-slate-300 rounded py-[10px] pl-3 [&::-webkit-inner-spin-button]:appearance-none"
                  value={annonce.prix}
                  onChange={(e) => {
                    annonceSetter('prix', Number(e.target.value));
                  }}
                ></input>
              </div>
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
      case 4:
        return (
          <>
            <div className="w-full bg-[#FFF0E8] py-6 px-4 rounded">
              <p className="font-text ">
                3 photos c'est bien... 10 photos c'est mieux ! <br />
                Surtout quand c'est gratuit.
              </p>
              <p className="text-sm">
                Profitez-en pour prendre votre bien en photo sous toutes les
                coutures !
              </p>
            </div>
            <p className="my-6">
              Faites glisser vos photos pour changer leur ordre
            </p>
            <div className="grid grid-cols-4 w-[90%] gap-4">
              <label className="w-[150px] h-[150px] flex items-center justify-center rounded border-[1px] border-orange-500 cursor-pointer">
                <div className="text-center">
                  <FontAwesomeIcon
                    icon={faCameraRetro}
                    style={{ color: '#fe6f14' }}
                    size="2xl"
                  />
                  <p className="block text-sm text-orange-500 font-bold mt-2">
                    Ajouter des photos
                  </p>
                </div>

                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  multiple
                  className="hidden"
                  onChange={(e) => uploadFilesHandler(e)}
                />
              </label>
              {photoDivs}
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
      case 5:
        return (
          <>
            <h4 className="font-text text-xl mb-3">Résumé de votre annonce</h4>
            <div className="mb-8">
              <h5 className="font-text text-slate-600">Titre</h5>
              <p>{annonce.nom}</p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 mb-6">
              <div>
                <h5 className="font-text text-slate-600">Catégorie</h5>
                <p>{categoryDisplayer()}</p>
              </div>
              {/* IMMOBILIER */}
              {annonce.categorie === '/api/categories/1' ? (
                <>
                  <div>
                    <h5 className="font-text text-slate-600">Type de bien</h5>
                    <p>{annonce.materielType}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Localisation</h5>
                    <p>{annonce.localisation}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Surface</h5>
                    <p>{annonce.surface + ' m²'}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">
                      Nombre de pièces
                    </h5>
                    <p>{annonce.pieces}</p>
                  </div>
                </>
              ) : null}
              {/* VEHICULES */}
              {annonce.categorie === '/api/categories/2' ? (
                <>
                  <div>
                    <h5 className="font-text text-slate-600">Marque</h5>
                    <p>{annonce.marque}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Modèle</h5>
                    <p>{annonce.modele}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Année</h5>
                    <p>{annonce.annee}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Kilométrage</h5>
                    <p>{annonce.kilometrage}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Carburant</h5>
                    <p>{annonce.carburant}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">
                      Boîte de vitesse
                    </h5>
                    <p>{annonce.boite}</p>
                  </div>
                </>
              ) : null}
              {/* MODE */}
              {annonce.categorie === '/api/categories/5' ? (
                <>
                  <div>
                    <h5 className="font-text text-slate-600">Marque</h5>
                    <p>{annonce.marque}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Matière</h5>
                    <p>{annonce.matiere}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Taille</h5>
                    <p>{annonce.taille}</p>
                  </div>
                </>
              ) : null}
              {/* MULTIMEDIA */}
              {annonce.categorie === '/api/categories/7' ? (
                <>
                  <div>
                    <h5 className="font-text text-slate-600">
                      Type de produit
                    </h5>
                    <p>{annonce.materielType}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Marque</h5>
                    <p>{annonce.marque}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Modèle</h5>
                    <p>{annonce.modele}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Etat</h5>
                    <p>{annonce.etat}</p>
                  </div>
                </>
              ) : null}
              {/* MATERIEL PROFESSIONNEL */}
              {annonce.categorie === '/api/categories/9' ? (
                <>
                  <div>
                    <h5 className="font-text text-slate-600">
                      Type de matériel
                    </h5>
                    <p>{annonce.materielType}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Marque</h5>
                    <p>{annonce.marque}</p>
                  </div>
                  <div>
                    <h5 className="font-text text-slate-600">Etat</h5>
                    <p>{annonce.etat}</p>
                  </div>
                </>
              ) : null}
            </div>

            <div className="my-8">
              <h5 className="font-text text-lg text-slate-800 mb-4">Photos</h5>

              <div className="w-[90%] grid grid-cols-4 gap-y-[15px]">
                {photos.map((photo, index) => (
                  <div className="w-[150px] h-[150px] flex items-center justify-center shadow-2xl rounded border-[1px]  border-slate-300 cursor-pointer relative">
                    <div
                      className="h-full w-full flex justify-center items-center"
                      id={'photo' + (index + 1)}
                    >
                      <img
                        class="object-cover h-full w-full rounded"
                        src={photo}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h5 className="font-text text-slate-600">Description</h5>
            <p>{annonce.description}</p>
            <div className="mt-8">
              <h5 className="font-text text-xl text-slate-600">Prix</h5>
              <p className="font-bold font-text text-xl mt-2">
                {annonce.prix + ' €'}
              </p>
            </div>
            <div className="flex justify-between w-full mt-8">
              <button
                className="py-2 px-4 border-[1px] border-[#4183D7] text-[#4183D7] rounded  font-text"
                onClick={() => setStep(step - 1)}
              >
                Retour
              </button>
              <button
                className="py-2 px-4 bg-[#4183D7] rounded text-white font-text"
                onClick={() => postAnnonceHandler()}
              >
                Poster mon annonce
              </button>
            </div>
          </>
        );
      default:
        break;
    }
  };

  return (
    <div className="bg-[#F4F9FE] min-h-[100vh] pb-12">
      <PostAnnonceBar />
      <div className="w-[55%] mx-auto mt-6">
        <div className="flex">
          <div className="bg-white w-3/4 p-6 rounded">
            {user.email !== '' ? (
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
