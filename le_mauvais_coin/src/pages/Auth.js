import { faArrowLeft, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import routes from '../variables/Vroutes';
import { setUserSlice } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { setUserAccount } from '../redux/slices/userAccountSlice';

const Auth = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [signInStep, setSignInStep] = useState(0);
  const [user, setUser] = useState({
    email: '',
    nom: '',
    prenom: '',
    password: '',
    roles: [],
    telephone: '',
  });

  const dispatch = useDispatch();
  const param = useParams().param;

  useEffect(() => {
    if (param && param === 'signin') {
      setLogin(false);
    }
  }, []);

  const userSetter = (property, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [property]: value,
    }));
  };

  const loginHandler = () => {
    axios
      .post(routes.BACK + '/login', {
        username: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          dispatch(setUserSlice(jwtDecode(res.data.token)));
          window.localStorage.setItem(
            'leboncoin login token : ',
            res.data.token
          );
          axios
            .get('https://127.0.0.1:8000/getUserByMail/' + user.email)
            .then((res) => {
              dispatch(setUserAccount(res.data[0]));
              navigate('/');
            });
        }
      });
  };

  const authBoxDisplayer = () => {
    if (login) {
      return (
        <div className="shadow-2xl w-fit py-8 px-10 rounded-2xl ">
          <p className="mb-8 leading-8 font-text ">
            <b className="mb-8 leading-8 font-text text-center font-bold text-2xl  ">
              Bonjour !
            </b>
            <br />
            {login
              ? 'Connectez-vous pour découvrir toutes nos fonctionnalités.'
              : 'Inscrivez-vous pour découvrir toutes nos fonctionnalités.'}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
          >
            <div className="mb-6">
              <label className="block mb-2">E-mail</label>
              <input
                type="text"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('email', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2">Mot de passe</label>
              <input
                type="password"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('password', e.target.value)}
              />
            </div>

            <p className=" text-xs text-slate-400 cursor-pointer">
              <u>Mot de passe oublié ?</u>
            </p>
            <input
              type="submit"
              value="Se connecter  →"
              className="bg-[#ED5B13] py-2 text-white tracking-wide font-bold rounded-full w-full my-6 cursor-pointer"
            />
          </form>
          <p className="text-center text-slate-700">
            Envie de nous rejoindre ?{' '}
            <b>
              <u
                className="cursor-pointer"
                onClick={() => {
                  setLogin(false);
                  navigate('/authentification/signin');
                }}
              >
                Créer un compte
              </u>
            </b>
          </p>
        </div>
      );
    }
    if (!login && signInStep === 0) {
      return (
        <div className="shadow-2xl w-fit py-8 px-10 rounded-2xl min-w-[480px] ">
          <p className="mb-8 leading-8 font-text text-center font-bold text-2xl  ">
            Commençons par un e-mail
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSignInStep(signInStep + 1);
            }}
          >
            <div className="mb-6">
              <label className="block mb-2">E-mail</label>
              <input
                type="text"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('email', e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Suivant"
              className="bg-[#ED5B13] py-2 text-white tracking-wide font-bold rounded-full w-full my-6 cursor-pointer"
            />
          </form>
          <p className="text-center text-slate-700">
            Vous avez déjà un compte ?{' '}
            <b>
              <u
                className="cursor-pointer"
                onClick={() => {
                  setLogin(true);
                  navigate('/authentification/login');
                }}
              >
                Se connecter
              </u>
            </b>
          </p>
        </div>
      );
    }
    if (!login && signInStep === 1) {
      return (
        <div className="shadow-2xl w-fit py-8 px-10 rounded-2xl min-w-[480px] ">
          <p className="mb-8 leading-8 font-text text-center font-bold text-2xl  ">
            Continuons avec un mot de passe
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSignInStep(signInStep + 1);
            }}
          >
            <div className="mb-6">
              <label className="block mb-2">Mot de passe</label>
              <input
                type="password"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('password', e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Confirmez votre mot de passe</label>
              <input
                type="password"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
              />
            </div>

            <input
              type="submit"
              value="Suivant"
              className="bg-[#ED5B13] py-2 text-white tracking-wide font-bold rounded-full w-full my-6 cursor-pointer"
            />
          </form>
          <p className="text-center text-slate-700">
            Vous avez déjà un compte ?{' '}
            <b>
              <u
                className="cursor-pointer"
                onClick={() => {
                  setLogin(true);
                  navigate('/authentification/login');
                }}
              >
                Se connecter
              </u>
            </b>
          </p>
        </div>
      );
    }
    if (!login && signInStep === 2) {
      return (
        <div className="shadow-2xl w-fit py-8 px-10 rounded-2xl min-w-[480px] ">
          <p className="mb-8 leading-8 font-text text-center font-bold text-2xl  ">
            Terminons avec quelques informations sur vous
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSignInStep(signInStep + 1);
            }}
          >
            <div className="mb-6">
              <label className="block mb-2">Nom (optionnel)</label>
              <input
                type="text"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('nom', e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Prenom</label>
              <input
                type="text"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('prenom', e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">
                Numéro de téléphone (optionnel)
              </label>
              <input
                type="text"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('telephone', e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Departement</label>
              <select
                className="py-3 border-[1px] border-slate-300 rounded-2xl w-full px-3"
                onChange={(e) => userSetter('departement', e.target.value)}
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

            <input
              type="submit"
              value="Suivant"
              className="bg-[#ED5B13] py-2 text-white tracking-wide font-bold rounded-full w-full my-6 cursor-pointer"
            />
          </form>
          <p className="text-center text-slate-700">
            Vous avez déjà un compte ?{' '}
            <b>
              <u
                className="cursor-pointer"
                onClick={() => {
                  setLogin(true);
                  navigate('/authentification/login');
                }}
              >
                Se connecter
              </u>
            </b>
          </p>
        </div>
      );
    }
    if (!login && signInStep === 3) {
      return (
        <div className="shadow-2xl w-fit py-4 px-10 rounded-2xl min-w-[480px] ">
          <p className="mb-6 leading-8 font-text text-center font-bold text-2xl  ">
            Résumé de votre profil
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios.post(routes.BACK + '/users', user).then((res) => {
                if (res.status === 200 || res.status === 201) {
                  setSignInStep(signInStep + 1);
                }
              });
              setSignInStep(signInStep + 1);
            }}
          >
            <div className="mb-6">
              <label className="block mb-2">E-mail</label>
              <input
                type="text"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('mail', e.target.value)}
                placeholder={user.email}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Mot de passe</label>
              <input
                type="text"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('password', e.target.value)}
                placeholder={user.password}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Nom</label>
              <input
                type="text"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('name', e.target.value)}
                placeholder={user.nom}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Prenom</label>
              <input
                type="text"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('name', e.target.value)}
                placeholder={user.prenom}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Téléphone</label>
              <input
                type="text"
                className="border-[1px] border-slate-300 rounded-2xl w-full py-[10px] pl-3"
                onChange={(e) => userSetter('telephone', e.target.value)}
                placeholder={user.telephone}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2">Departement</label>
              <select
                className="py-3 border-[1px] border-slate-300 rounded-2xl w-full px-3"
                onChange={(e) => userSetter('departement', e.target.value)}
              >
                <option value="Region">{user.departement}</option>
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

            <input
              type="submit"
              value="Créer mon compte"
              className="bg-[#ED5B13] py-2 text-white tracking-wide font-bold rounded-full w-full my-6 cursor-pointer"
            />
          </form>
        </div>
      );
    }
    if (!login && signInStep === 4) {
      setTimeout(() => {
        navigate('/');
      }, 4000);
      return (
        <div className="shadow-2xl w-fit py-8 px-10 rounded-2xl min-w-[480px] ">
          <p className="mb-8 leading-8 font-text text-center font-bold text-2xl  ">
            Votre compte a été crée. Retour à la page d'accueil ...
          </p>

          <button className="bg-[#ED5B13] py-2 text-white tracking-wide font-bold rounded-full w-full my-6 cursor-pointer">
            Retourner à l'accueil
          </button>
        </div>
      );
    }
  };

  return (
    <div className="font-text text-slate-700">
      <div className="relative w-full justify-center py-2 shadow-xl flex items-center">
        <h3 className="text-[28px]  text-lbcOrange  font-round cursor-pointer pr-4 mr-4 border-r-[1px] border-lbcOrange ">
          Leboncoin
        </h3>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faShieldHalved}
            style={{ color: '#FE6E15' }}
            size="xl"
          />
          <p className="text-lr text-lbcOrange font-bold cursor-pointer ml-2">
            {login ? 'Connexion' : 'Inscription'}
          </p>
        </div>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="2xl"
          style={{ color: '#FE6E15' }}
          className="absolute left-[50px] cursor-pointer "
          onClick={() => navigate('/')}
        />
      </div>
      <div className="flex justify-center pt-16 ">{authBoxDisplayer()}</div>
    </div>
  );
};

export default Auth;
