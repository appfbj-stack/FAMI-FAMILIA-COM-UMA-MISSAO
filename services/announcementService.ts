
import { Announcement, Department, Church } from '../types';
import { CHURCHES, DEPARTMENTS as INITIAL_DEPARTMENTS, CHURCH_DETAILS as INITIAL_CHURCH_DETAILS } from '../constants';

const ANNOUNCEMENTS_KEY = 'obpc_announcements';
const DEPARTMENTS_KEY = 'obpc_departments_v9'; // Updated key to force data refresh
const CHURCHES_KEY = 'obpc_churches';
const ADMIN_TOKEN_KEY = 'obpc_admin_token';
const ADMIN_PASSWORD = 'OBPC.Sorocaba'; // Senha atualizada

export const ADMIN_STATUS_CHANGED = 'OBPC_ADMIN_STATUS_CHANGED';

const getInitialData = (): Announcement[] => [
    {
        id: '1',
        title: 'Festa da Primavera',
        description: 'Venha celebrar conosco a chegada da primavera com muita música, comida e comunhão. Teremos atividades para todas as as idades. Não perca!',
        imageUrl: `https://picsum.photos/seed/spring/800/600`,
        imageAlt: 'Decoração de primavera com flores coloridas e luzes.',
        church: CHURCHES[2], // OBPC Sede
        date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0],
    },
    {
        id: '2',
        title: 'Acampamento de Jovens',
        description: 'Um final de semana inesquecível para nossos jovens, com louvor, palavra e muita diversão. Inscrições abertas na secretaria.',
        imageUrl: `https://picsum.photos/seed/youthcamp/800/600`,
        imageAlt: 'Jovens reunidos em volta de uma fogueira em um acampamento.',
        church: CHURCHES[8], // OBPC Salto de Pirapora
        date: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString().split('T')[0],
    },
    {
        id: '3',
        title: 'Culto de Ação de Graças',
        description: 'Participe do nosso culto especial de Ação de Graças. Traga sua família e vamos juntos agradecer a Deus por todas as bênçãos.',
        imageUrl: `https://picsum.photos/seed/thanksgiving/800/600`,
        imageAlt: 'Símbolos de Ação de Graças, como uma cornucópia cheia de frutas.',
        church: CHURCHES[12], // OBPC Bela Vista
        date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
    }
];

// --- ANNOUNCEMENTS ---

const getAnnouncementsFromStorage = (): Announcement[] => {
    try {
        const data = localStorage.getItem(ANNOUNCEMENTS_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            const initialData = getInitialData();
            localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(initialData));
            return initialData;
        }
    } catch (error) {
        console.error("Failed to parse announcements from localStorage", error);
        return getInitialData();
    }
};

const saveAnnouncementsToStorage = (announcements: Announcement[]) => {
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
};

export const getAnnouncements = (): Promise<Announcement[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const announcements = getAnnouncementsFromStorage();
            resolve(announcements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        }, 500);
    });
};

export const addAnnouncement = (announcement: Omit<Announcement, 'id'>): Promise<Announcement> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const announcements = getAnnouncementsFromStorage();
            const newAnnouncement: Announcement = { ...announcement, id: Date.now().toString() };
            const updatedAnnouncements = [newAnnouncement, ...announcements];
            saveAnnouncementsToStorage(updatedAnnouncements);
            resolve(newAnnouncement);
        }, 300);
    });
};

export const updateAnnouncement = (updatedAnnouncement: Announcement): Promise<Announcement> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let announcements = getAnnouncementsFromStorage();
            announcements = announcements.map(ann => ann.id === updatedAnnouncement.id ? updatedAnnouncement : ann);
            saveAnnouncementsToStorage(announcements);
            resolve(updatedAnnouncement);
        }, 300);
    });
};

export const deleteAnnouncement = (id: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let announcements = getAnnouncementsFromStorage();
            announcements = announcements.filter(ann => ann.id !== id);
            saveAnnouncementsToStorage(announcements);
            resolve();
        }, 300);
    });
};

// --- DEPARTMENTS ---

const getDepartmentsFromStorage = (): Department[] => {
    try {
        const data = localStorage.getItem(DEPARTMENTS_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            // Initialize with the data from constants
            localStorage.setItem(DEPARTMENTS_KEY, JSON.stringify(INITIAL_DEPARTMENTS));
            return INITIAL_DEPARTMENTS;
        }
    } catch (error) {
        console.error("Failed to parse departments from localStorage", error);
        return INITIAL_DEPARTMENTS;
    }
};

const saveDepartmentsToStorage = (departments: Department[]) => {
    localStorage.setItem(DEPARTMENTS_KEY, JSON.stringify(departments));
};

export const getDepartments = (): Promise<Department[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const departments = getDepartmentsFromStorage();
            resolve(departments);
        }, 500);
    });
};

export const updateDepartment = (updatedDepartment: Department): Promise<Department> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let departments = getDepartmentsFromStorage();
            departments = departments.map(dept => dept.id === updatedDepartment.id ? updatedDepartment : dept);
            saveDepartmentsToStorage(departments);
            resolve(updatedDepartment);
        }, 300);
    });
};


// --- CHURCHES ---

const getChurchesFromStorage = (): Church[] => {
    try {
        const data = localStorage.getItem(CHURCHES_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            // Initialize with data from constants
            localStorage.setItem(CHURCHES_KEY, JSON.stringify(INITIAL_CHURCH_DETAILS));
            return INITIAL_CHURCH_DETAILS;
        }
    } catch (error) {
        console.error("Failed to parse churches from localStorage", error);
        return INITIAL_CHURCH_DETAILS;
    }
};

const saveChurchesToStorage = (churches: Church[]) => {
    localStorage.setItem(CHURCHES_KEY, JSON.stringify(churches));
};

export const getChurches = (): Promise<Church[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const churches = getChurchesFromStorage();
            resolve(churches);
        }, 300);
    });
};

export const getChurchById = (id: string): Promise<Church | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const churches = getChurchesFromStorage();
            const church = churches.find(c => c.id === id);
            resolve(church);
        }, 300);
    });
};

export const updateChurch = (updatedChurch: Church): Promise<Church> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let churches = getChurchesFromStorage();
            churches = churches.map(c => c.id === updatedChurch.id ? updatedChurch : c);
            saveChurchesToStorage(churches);
            resolve(updatedChurch);
        }, 300);
    });
};


// --- AUTH & UPLOAD ---

export const login = (password: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const cleanPass = password.trim();
            // Aceita a senha definida OU 'admin' para facilitar o acesso
            if (cleanPass === ADMIN_PASSWORD || cleanPass === 'admin') {
                localStorage.setItem(ADMIN_TOKEN_KEY, 'fake-jwt-token');
                window.dispatchEvent(new Event(ADMIN_STATUS_CHANGED));
                resolve(true);
            } else {
                resolve(false);
            }
        }, 500);
    });
};

export const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    window.dispatchEvent(new Event(ADMIN_STATUS_CHANGED));
};

export const uploadBanner = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Converte o arquivo real para Base64 para salvar localmente
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error("Falha ao processar imagem"));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};

export const isAdminLoggedIn = (): boolean => {
    return !!localStorage.getItem(ADMIN_TOKEN_KEY);
};
