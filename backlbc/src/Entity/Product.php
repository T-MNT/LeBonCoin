<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['product']])]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('product')]
    private ?int $id = null;


    #[ORM\Column(length: 255)]
    #[Groups('product')]
    private ?string $nom = null;

    #[ORM\Column]
    #[Groups('product')]
    private ?int $prix = null;

    #[ORM\Column(length: 4, nullable: true)]
    #[Groups('product')]
    private ?string $annee = null;

    #[ORM\Column(length: 48, nullable: true)]
    #[Groups('product')]
    private ?string $etat = null;

    #[ORM\Column(length: 1200)]
    #[Groups('product')]
    private ?string $description = null;

    #[ORM\Column(length: 12, nullable: true)]
    #[Groups('product')]
    private ?string $kilometrage = null;

    #[ORM\Column(length: 48, nullable: true)]
    #[Groups('product')]
    private ?string $boite = null;

    #[ORM\Column(length: 48, nullable: true)]
    #[Groups('product')]
    private ?string $carburant = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('product')]
    private ?Category $categorie = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('product')]
    private ?string $matiere = null;

    #[ORM\Column(length: 24, nullable: true)]
    #[Groups('product')]
    private ?string $taille = null;

    #[ORM\Column(length: 48, nullable: true)]
    #[Groups('product')]
    private ?string $couleur = null;

    #[ORM\Column(length: 48, nullable: true)]
    #[Groups('product')]
    private ?string $marque = null;

    #[ORM\Column(nullable: true)]
    #[Groups('product')]
    private ?int $surface = null;

    #[ORM\Column(nullable: true)]
    #[Groups('product')]
    private ?int $pieces = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('product')]
    private ?string $localisation = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('product')]
    private ?string $materielType = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('product')]
    private ?string $modele = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('product')]
    private ?User $vendeur = null;

    #[ORM\Column(length: 10)]
    private ?string $date = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrix(): ?int
    {
        return $this->prix;
    }

    public function setPrix(int $prix): static
    {
        $this->prix = $prix;

        return $this;
    }

    public function getAnnee(): ?string
    {
        return $this->annee;
    }

    public function setAnnee(?string $annee): static
    {
        $this->annee = $annee;

        return $this;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(?string $etat): static
    {
        $this->etat = $etat;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getKilometrage(): ?string
    {
        return $this->kilometrage;
    }

    public function setKilometrage(?string $kilometrage): static
    {
        $this->kilometrage = $kilometrage;

        return $this;
    }

    public function getBoite(): ?string
    {
        return $this->boite;
    }

    public function setBoite(?string $boite): static
    {
        $this->boite = $boite;

        return $this;
    }

    public function getCarburant(): ?string
    {
        return $this->carburant;
    }

    public function setCarburant(?string $carburant): static
    {
        $this->carburant = $carburant;

        return $this;
    }

    public function getCategorie(): ?Category
    {
        return $this->categorie;
    }

    public function setCategorie(?Category $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getMatiere(): ?string
    {
        return $this->matiere;
    }

    public function setMatiere(?string $matiere): static
    {
        $this->matiere = $matiere;

        return $this;
    }

    public function getTaille(): ?string
    {
        return $this->taille;
    }

    public function setTaille(?string $taille): static
    {
        $this->taille = $taille;

        return $this;
    }

    public function getCouleur(): ?string
    {
        return $this->couleur;
    }

    public function setCouleur(?string $couleur): static
    {
        $this->couleur = $couleur;

        return $this;
    }

    public function getMarque(): ?string
    {
        return $this->marque;
    }

    public function setMarque(?string $marque): static
    {
        $this->marque = $marque;

        return $this;
    }

    public function getSurface(): ?int
    {
        return $this->surface;
    }

    public function setSurface(?int $surface): static
    {
        $this->surface = $surface;

        return $this;
    }

    public function getPieces(): ?int
    {
        return $this->pieces;
    }

    public function setPieces(?int $pieces): static
    {
        $this->pieces = $pieces;

        return $this;
    }

    public function getLocalisation(): ?string
    {
        return $this->localisation;
    }

    public function setLocalisation(?string $localisation): static
    {
        $this->localisation = $localisation;

        return $this;
    }

    public function getMaterielType(): ?string
    {
        return $this->materielType;
    }

    public function setMaterielType(?string $materielType): static
    {
        $this->materielType = $materielType;

        return $this;
    }

    public function getModele(): ?string
    {
        return $this->modele;
    }

    public function setModele(?string $modele): static
    {
        $this->modele = $modele;

        return $this;
    }

    public function getVendeur(): ?User
    {
        return $this->vendeur;
    }

    public function setVendeur(?User $vendeur): static
    {
        $this->vendeur = $vendeur;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(string $date): static
    {
        $this->date = $date;

        return $this;
    }
}
