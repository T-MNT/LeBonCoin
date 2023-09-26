<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/getUserByMail/{mail}', name: 'getUserByMail')]
    public function getUserByMail(EntityManagerInterface $em , string $mail): Response
    {
        $user = $em ->getRepository(User::class)->findBy(['email'=> $mail] );
        return $this->json($user);
    }
}
