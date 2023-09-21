<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    #[Route('/get/product/by/category/{categorie}', name: 'get_product_by_category')]
    public function getProductByCategory(ProductRepository $productRepo , int $categorie ): Response
    {
        $productsByCategory = $productRepo->findBy(['categorie' => $categorie]);

        return $this->json($productsByCategory);
    }
}
