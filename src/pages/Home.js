import React from 'react';
import Navbar from '../layout/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="w-[55%] mx-auto text-center pt-4">
        <h3 className="text-2xl">
          Des millions de petites annonces et autant d’occasions de se faire
          plaisir
        </h3>
        <div className="h-[80px] my-8 rounded-3xl w-full bg-red-700"></div>
        <h4 className="text-left text-xl mb-4">Top catégories</h4>
        <ul className="flex overflow-x-auto">
          <li className="h-[120px] w-[190px] bg-slate-800 mr-10 rounded"></li>
          <li className="h-[120px] w-[190px] bg-slate-800 mr-10 rounded"></li>
          <li className="h-[120px] w-[190px] bg-slate-800 mr-10 rounded"></li>
          <li className="h-[120px] w-[190px] bg-slate-800 mr-10 rounded"></li>
          <li className="h-[120px] w-[190px] bg-slate-800 mr-10 rounded"></li>
        </ul>
        <p className="text-xs mt-16">
          Avec leboncoin, trouvez la bonne affaire sur le site référent de
          petites annonces de particulier à particulier et de professionnels.
          Avec des millions de petites annonces, trouvez la bonne occasion dans
          nos catégories voiture, immobilier, emploi, location de vacances,
          vêtements, meubles, bricolage, téléphonie, jeux vidéo, etc… Déposez
          une annonce gratuite en toute simplicité pour vendre, rechercher,
          donner vos biens de seconde main ou promouvoir vos services. Pour cet
          été, découvrez nos idées de destination avec notre guide de vacances
          en France. Achetez en toute sécurité avec notre système de paiement en
          ligne et de livraison pour les annonces éligibles.
        </p>
      </div>
    </div>
  );
};

export default Home;
