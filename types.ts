
export interface Announcement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  church: string;
  date: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photoUrl: string;
  familyBiography?: string; // Biografia da família e ministério
}

export interface Department {
  id: string;
  acronym: string;
  name: string;
  description: string; // Descrição curta para o card
  bannerUrl: string;
  team: TeamMember[]; // Lista de líderes e equipe com fotos
  works: string; // Trabalhos realizados
  eventPhotos: string[]; // Galeria de fotos
  color: string; // Cor do tema do departamento
}

export interface PastoralFamily {
    pastorName: string;
    wifeName: string;
    children: string[];
    photoUrl: string;
    biography?: string;
}

export interface ChurchLeader {
    role: string; // e.g., "Líder de Jovens", "Diácono Responsável"
    names: string; // e.g., "José & Maria"
    photoUrl: string;
}

export interface Church {
    id: string;
    name: string;
    address: string;
    coverUrl: string;
    description: string; 
    gallery: string[]; 
    socialInstagram?: string;
    socialFacebook?: string;
    mapUrl?: string;
    
    // New Fields
    pastoralFamily: PastoralFamily;
    leadership: ChurchLeader[];
}
