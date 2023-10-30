import React, { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';

const Search = () => {
  const type = useParams();
  const [departement, setDepartement] = useState();
  const [livraison, setLivraison] = useState(false);
  const [price, setPrice] = useState({ minimum: 0, maximum: 0 });
  const [priceSet, setPriceSet] = useState(false);
  const [productList, setProductList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [categorie, setCategorie] = useState(0);
  const storage = getStorage();
  const navigate = useNavigate();
  const urlCategory = useParams().item;

  useEffect(() => {
    if (categorie === 0) {
      switch (urlCategory) {
        case 'immobilier':
          setCategorie(1);
          break;
        case 'vehicules':
          setCategorie(2);
          break;
        case 'vacances':
          setCategorie(3);
          break;
        case 'emploi':
          setCategorie(4);
          break;
        case 'mode':
          setCategorie(5);
          break;
        case 'maison':
          setCategorie(6);
          break;
        case 'multimedia':
          setCategorie(7);
          break;
        case 'loisirs':
          setCategorie(8);
          break;
        case 'materiel_professionnel':
          setCategorie(9);
          break;
        case 'autres':
          setCategorie(10);
          break;

        default:
          break;
      }
    }

    axios
      .get(`https://127.0.0.1:8000/get/product/by/category/${categorie}`)
      .then((res) => setProductList(res.data));
  }, [categorie]);

  useEffect(() => {
    if (productList.length > 0) {
      Promise.all(
        productList.map((product) =>
          getDownloadURL(ref(storage, product.imagesUrl[0]))
        )
      ).then((downloadUrls) => setImageList(downloadUrls));
    }
  }, [productList]);

  const fetchImageUrl = async (imageUrl) => {
    const url = await getDownloadURL(ref(storage, imageUrl));
    return url;
  };

  const productsDisplayer = () => {
    switch (categorie) {
      case 1:
        return (
          <ul>
            {productList.map((product, index) => (
              <li
                className="flex w-9/12 mb-4 pb-4 border-b-[1px] border-slate-300 "
                key={index}
                onClick={() => navigate('/product/' + product.id)}
              >
                <div className="h-[200px] w-[320px] rounded bg-slate-700"></div>
                <div className="pl-4 relative w-7/12">
                  <p className="mb-2 text-xl">{product.nom}</p>
                  <span className="flex mb-6">
                    <p className="mr-6">{product.prix}€</p>
                    <p>{product.etat}</p>
                  </span>
                  <div className="flex mb-6">
                    <span className="text-center pr-4">
                      <p className="text-slate-500">Année</p>
                      <p>{product.annee}</p>
                    </span>
                    <span className="text-center  px-4 border-l-[1px] border-slate-300">
                      <p className="text-slate-500">Lieu</p>
                      <p>{product.localisation}</p>
                    </span>
                    <span className="text-center px-4 border-x-[1px] border-slate-300">
                      <p className="text-slate-500">Surface</p>
                      <p>{product.surface} m2</p>
                    </span>
                    <span className="text-center px-4">
                      <p className="text-slate-500">Pièces</p>
                      <p>{product.pieces}</p>
                    </span>
                  </div>
                  <p className="absolute left-4 bottom-0 text-sm text-slate-400">
                    Posté par Jacqueline à Bretignies-Sur-Orge le 15/07/24 à
                    12:24
                  </p>
                </div>
              </li>
            ))}
          </ul>
        );
      case 2:
        return (
          <ul>
            {productList.map((product, index) => (
              <li
                className="flex w-9/12 mb-4 pb-4 border-b-[1px]  border-slate-300 "
                key={index}
                onClick={() => navigate('/product/' + product.id)}
              >
                <img
                  className="max-h-[200px] w-[400px] rounded object-cover cursor-pointer"
                  src={imageList[index]}
                />
                <div className="pl-4 relative w-9/12">
                  <p className="mb-2 text-xl">{product.nom}</p>
                  <span className="flex mb-6">
                    <p className="mr-6">{product.prix}€</p>
                  </span>
                  <div className="flex mb-10">
                    <span className="text-center pr-4">
                      <p className="text-slate-500">Année</p>
                      <p>{product.annee}</p>
                    </span>
                    <span className="text-center  px-4 border-l-[1px] border-slate-300">
                      <p className="text-slate-500">Kilométrage</p>
                      <p>{product.kilometrage} km</p>
                    </span>
                    <span className="text-center  px-4 border-l-[1px] border-slate-300">
                      <p className="text-slate-500">Boîte</p>
                      <p>{product.boite}</p>
                    </span>
                  </div>
                  <p className="absolute w-9/12 left-4 bottom-0 text-sm text-slate-400">
                    Posté par Jacqueline à Bretignies-Sur-Orge le 15/07/24 à
                    12:24
                  </p>
                </div>
              </li>
            ))}
          </ul>
        );
      case 7:
        return (
          <ul>
            {productList.map((product, index) => {
              fetchImageUrl(product.imagesUrl[0]).then((url) => (
                <li
                  className="flex w-9/12 mb-4 pb-4 border-b-[1px] border-slate-300 "
                  key={index}
                  onClick={() => navigate('/product/' + product.id)}
                >
                  <img className="h-[260px] w-[200px] rounded" src={url} />
                  <div className="pl-4 relative w-9/12">
                    <p className="mb-2 text-xl">{product.nom}</p>
                    <span className="flex mb-6">
                      <p className="mr-6">{product.prix}€</p>
                    </span>
                    <div className="flex mb-10">
                      <span className="text-center pr-4">
                        <p className="text-slate-500">Année</p>
                        <p>{product.annee}</p>
                      </span>
                      <span className="text-center  px-4 border-l-[1px] border-slate-300">
                        <p className="text-slate-500">Etat</p>
                        <p>{product.etat}</p>
                      </span>
                    </div>
                    <p className="w-9/12">{product.description}</p>
                    <p className="absolute w-9/12 left-4 bottom-0 text-sm text-slate-400">
                      Posté par Jacqueline à Bretignies-Sur-Orge le 15/07/24 à
                      12:24
                    </p>
                  </div>
                </li>
              ));
            })}
          </ul>
        );
      case 5:
      case 6:
        return (
          <ul className="flex justify-between w-9/12">
            {productList.map((product, index) => (
              <li
                className="relative w-9/12 mb-4 pb-4 border-b-[1px] border-slate-300 "
                key={index}
                onClick={() => navigate('/product/' + product.id)}
              >
                <div className="h-[300px] w-[240px] rounded bg-slate-700 mb-2"></div>
                <div>
                  <p className="mb-2 text-xl">{product.nom}</p>
                  <span className="flex mb-6">
                    <p className="mb-6">{product.prix}€</p>
                  </span>
                  <p className="absolute w-9/12 left-0 bottom-2 text-sm text-slate-400">
                    Jacqueline. Bretignies-Sur-Orge. 15/07/24
                  </p>
                </div>
              </li>
            ))}
          </ul>
        );
      case 9:
        return (
          <ul>
            {productList.map((product, index) => (
              <li
                className="flex w-9/12 mb-4 pb-4 border-b-[1px] border-slate-300 "
                key={index}
                onClick={() => navigate('/product/' + product.id)}
              >
                <div className="h-[200px] w-[320px] rounded bg-slate-700"></div>
                <div className="pl-4 relative w-9/12">
                  <p className="mb-2 text-xl">{product.nom}</p>
                  <span className="flex mb-6">
                    <p className="mr-6">{product.prix}€</p>
                    <p>{product.etat}</p>
                  </span>
                  <div className="flex mb-6">
                    <span className="text-center pr-4">
                      <p className="text-slate-500">Type de matériel</p>
                      <p>{product.materielType}</p>
                    </span>
                  </div>
                  <p className="absolute left-4 bottom-0 text-sm text-slate-400">
                    Posté par Jacqueline à Bretignies-Sur-Orge le 15/07/24 à
                    12:24
                  </p>
                </div>
              </li>
            ))}
          </ul>
        );

      default:
        break;
    }
  };

  return (
    <div>
      <Navbar setCategorie={setCategorie} />
      <div className=" w-[55%] mx-auto pt-8">
        <div className="flex ">
          <div className="border-[1px] mr-6 rounded border-slate-300 w-[32%]">
            <select
              className=" pl-2 w-11/12  outline-none  py-3"
              onChange={(e) => setDepartement(e.target.value)}
            >
              <option value="Region">Choisir une localisation</option>
              <option value="01">Ain - 01</option>
              <option value="02">Aisne - 02</option>
              <option value="03">Allier - 03</option>
              <option value="04">Alpes-de-Haute-Provence - 04</option>
              <option value="05">Hautes-Alpes - 05</option>
              <option value="06">Alpes-Maritimes - 06</option>
              <option value="07">Ardèche - 07</option>
              <option value="08">Ardennes - 08</option>
              <option value="09">Ariège - 09</option>
              <option value="10">Aube - 10</option>
              <option value="11">Aude - 11</option>
              <option value="12">Aveyron - 12</option>
              <option value="13">Bouches-du-Rhône - 13</option>
              <option value="14">Calvados - 14</option>
              <option value="15">Cantal - 15</option>
              <option value="16">Charente - 16</option>
              <option value="17">Charente-Maritime - 17</option>
              <option value="18">Cher - 18</option>
              <option value="19">Corrèze - 19</option>
              <option value="21">Côte-d'Or - 21</option>
              <option value="22">Côtes-d'Armor - 22</option>
              <option value="23">Creuse - 23</option>
              <option value="24">Dordogne - 24</option>
              <option value="25">Doubs - 25</option>
              <option value="26">Drôme - 26</option>
              <option value="27">Eure - 27</option>
              <option value="28">Eure-et-Loir - 28</option>
              <option value="29">Finistère - 29</option>
              <option value="30">Gard - 30</option>
              <option value="31">Haute-Garonne - 31</option>
              <option value="32">Gers - 32</option>
              <option value="33">Gironde - 33</option>
              <option value="34">Hérault - 34</option>
              <option value="35">Ille-et-Vilaine - 35</option>
              <option value="36">Indre - 36</option>
              <option value="37">Indre-et-Loire - 37</option>
              <option value="38">Isère - 38</option>
              <option value="39">Jura - 39</option>
              <option value="40">Landes - 40</option>
              <option value="41">Loir-et-Cher - 41</option>
              <option value="42">Loire - 42</option>
              <option value="43">Haute-Loire - 43</option>
              <option value="44">Loire-Atlantique - 44</option>
              <option value="45">Loiret - 45</option>
              <option value="46">Lot - 46</option>
              <option value="47">Lot-et-Garonne - 47</option>
              <option value="48">Lozère - 48</option>
              <option value="49">Maine-et-Loire - 49</option>
              <option value="50">Manche - 50</option>
              <option value="51">Marne - 51</option>
              <option value="52">Haute-Marne - 52</option>
              <option value="53">Mayenne - 53</option>
              <option value="54">Meurthe-et-Moselle - 54</option>
              <option value="55">Meuse - 55</option>
              <option value="56">Morbihan - 56</option>
              <option value="57">Moselle - 57</option>
              <option value="58">Nièvre - 58</option>
              <option value="59">Nord - 59</option>
              <option value="60">Oise - 60</option>
              <option value="61">Orne - 61</option>
              <option value="62">Pas-de-Calais - 62</option>
              <option value="63">Puy-de-Dôme - 63</option>
              <option value="64">Pyrénées-Atlantiques - 64</option>
              <option value="65">Hautes-Pyrénées - 65</option>
              <option value="66">Pyrénées-Orientales - 66</option>
              <option value="67">Bas-Rhin - 67</option>
              <option value="68">Haut-Rhin - 68</option>
              <option value="69">Rhône - 69</option>
              <option value="70">Haute-Saône - 70</option>
              <option value="71">Saône-et-Loire - 71</option>
              <option value="72">Sarthe - 72</option>
              <option value="73">Savoie - 73</option>
              <option value="74">Haute-Savoie - 74</option>
              <option value="75">Paris - 75</option>
              <option value="76">Seine-Maritime - 76</option>
              <option value="77">Seine-et-Marne - 77</option>
              <option value="78">Yvelines - 78</option>
              <option value="79">Deux-Sèvres - 79</option>
              <option value="80">Somme - 80</option>
              <option value="81">Tarn - 81</option>
              <option value="82">Tarn-et-Garonne - 82</option>
              <option value="83">Var - 83</option>
              <option value="84">Vaucluse - 84</option>
              <option value="85">Vendée - 85</option>
              <option value="86">Vienne - 86</option>
              <option value="87">Haute-Vienne - 87</option>
              <option value="88">Vosges - 88</option>
              <option value="89">Yonne - 89</option>
              <option value="90">Territoire de Belfort - 90</option>
              <option value="91">Essonne - 91</option>
              <option value="92">Hauts-de-Seine - 92</option>
              <option value="93">Seine-Saint-Denis - 93</option>
              <option value="94">Val-de-Marne - 94</option>
              <option value="95">Val-d'Oise - 95</option>
            </select>
          </div>
          <div className="border-[1px] border-slate-300 mr-6 rounded w-[18%]">
            <select
              className=" pl-2 w-11/12  py-3"
              onChange={(e) => setLivraison(e.target.value)}
            >
              <option value={false}>Sans livraison</option>
              <option value={true}>Avec livraison</option>
            </select>
          </div>

          <div className="relative w-[18%]">
            <div
              className="border-[1px] pl-2  border-slate-300 mr-6 rounded  py-3"
              onClick={(e) => setPriceSet(true)}
            >
              {price.minimum === 0 && price.maximum === 0
                ? 'Prix'
                : price.minimum + 'Є' + ' - ' + price.maximum + 'Є'}
            </div>
            {priceSet ? (
              <div className="absolute ">
                <div className="border-[1px]  mr-6  border-slate-300">
                  <input
                    type="text"
                    className=" pl-2  border-slate-300 w-9/12 py-3 outline-none "
                    placeholder="Minimum"
                    onChange={(e) => {
                      setPrice({
                        minimum: e.target.value,
                        maximum: price.maximum,
                      });
                    }}
                  />
                </div>

                <div className="border-[1px]  mr-6  border-slate-300 ">
                  <input
                    type="text"
                    className=" pl-2  border-slate-300 w-9/12 py-3 outline-none "
                    placeholder="Maximum"
                    onChange={(e) => {
                      setPrice({
                        minimum: price.minimum,
                        maximum: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="border-[1px] border-slate-300 rounded w-[18%]">
            <select className=" w-11/12 pl-2   py-3">
              <option value="Region">Table de...</option>
              <option value="Region">Moins de 50 euros</option>
              <option value="Region">Moins de 100 euros</option>
              <option value="Region">Moins de 50 euros</option>
              <option value="Region">Moins de 100 euros</option>
              <option value="Region">Moins de 50 euros</option>
              <option value="Region">Moins de 100 euros</option>
              <option value="Region">Moins de 50 euros</option>
              <option value="Region">Moins de 100 euros</option>
            </select>
          </div>
        </div>
        <h4 className="my-6 text-2xl">
          {(type.item.charAt(0).toUpperCase() + type.item.slice(1)).replace(
            '_',
            ' '
          )}
        </h4>
        <p className="mb-12">
          {productList.length}{' '}
          {productList.length > 1 ? ' annonces' : ' annonce'}{' '}
        </p>
        {productsDisplayer()}
      </div>
    </div>
  );
};

export default Search;
