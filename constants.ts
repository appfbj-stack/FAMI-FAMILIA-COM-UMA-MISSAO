
import { Department, Church } from './types';

export const CHURCHES = [
    "OBPC Cajuru",
    "OBPC Nikey",
    "OBPC Sede",
    "OBPC Manchester",
    "OBPC Mineirão",
    "OBPC Cidade Jardim",
    "OBPC Laranjeira",
    "OBPC Itavuvu",
    "OBPC Salto de Pirapora",
    "OBPC Brigadeiro Tobias",
    "OBPC Ipiranga",
    "OBPC Novo Mundo",
    "OBPC Bela Vista",
];

export const CHURCH_DETAILS: Church[] = [
    {
        id: 'cajuru',
        name: 'OBPC Cajuru',
        address: 'Rua do Cajuru, 123 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchcajuru/800/400',
        description: 'Uma igreja família, acolhedora e apaixonada por missões no coração do Cajuru.',
        gallery: ['https://picsum.photos/seed/cajuru1/400/300', 'https://picsum.photos/seed/cajuru2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. João Silva',
            wifeName: 'Pra. Maria Silva',
            children: ['Pedro', 'Ana', 'Lucas'],
            photoUrl: 'https://picsum.photos/seed/familiaCajuru/300/300',
            biography: 'Servindo ao Senhor há 20 anos, a família Silva tem um chamado específico para restauração de lares no bairro do Cajuru.'
        },
        leadership: [
            { role: 'Líderes de Jovens', names: 'Felipe & Carla', photoUrl: 'https://picsum.photos/seed/lider1cajuru/200/200' },
            { role: 'Líderes de Missões', names: 'Roberto & Sandra', photoUrl: 'https://picsum.photos/seed/lider2cajuru/200/200' },
            { role: 'Diáconos', names: 'Antônio & Beatriz', photoUrl: 'https://picsum.photos/seed/lider3cajuru/200/200' }
        ]
    },
    {
        id: 'nikey',
        name: 'OBPC Nikey',
        address: 'Av. Nikey, 456 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchnikey/800/400',
        description: 'Levando a palavra de Deus e transformando vidas na região do Nikey.',
        gallery: ['https://picsum.photos/seed/nikey1/400/300', 'https://picsum.photos/seed/nikey2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Marcos Oliveira',
            wifeName: 'Pra. Patricia Oliveira',
            children: ['Davi'],
            photoUrl: 'https://picsum.photos/seed/familiaNikey/300/300',
            biography: 'Apaixonados pelo ensino da palavra e discipulado.'
        },
        leadership: [
             { role: 'Casais', names: 'Eduardo & Mônica', photoUrl: 'https://picsum.photos/seed/lider1nikey/200/200' },
             { role: 'Infantil', names: 'Tia Sueli & Tio Jorge', photoUrl: 'https://picsum.photos/seed/lider2nikey/200/200' }
        ]
    },
    {
        id: 'sede',
        name: 'OBPC Sede',
        address: 'Rua Central, 1000 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchsede/800/400',
        description: 'Sede Regional Sorocaba. Um lugar de adoração, ensino e comunhão para toda a família.',
        gallery: ['https://picsum.photos/seed/sede1/400/300', 'https://picsum.photos/seed/sede2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Luiz Carlos Santos',
            wifeName: 'Pra. Esposa Santos',
            children: ['Filho 1', 'Filho 2'],
            photoUrl: 'https://picsum.photos/seed/luizcarlos/300/300',
            biography: 'Presidente da Regional, liderando com visão e amor.'
        },
        leadership: [
            { role: 'Secretaria', names: 'Ir. Ana & Esposo', photoUrl: 'https://picsum.photos/seed/lidersede1/200/200' },
            { role: 'Tesouraria', names: 'Pb. Carlos & Esposa', photoUrl: 'https://picsum.photos/seed/lidersede2/200/200' },
            { role: 'Zeladoria', names: 'Casal Responsável', photoUrl: 'https://picsum.photos/seed/lidersede3/200/200' }
        ]
    },
    {
        id: 'manchester',
        name: 'OBPC Manchester',
        address: 'Rua Manchester, 789 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchmanchester/800/400',
        description: 'Pregando o evangelho genuíno e servindo à comunidade do Pq. Manchester.',
        gallery: ['https://picsum.photos/seed/manchester1/400/300', 'https://picsum.photos/seed/manchester2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Ricardo',
            wifeName: 'Pra. Fernada',
            children: ['Gabriel', 'Julia'],
            photoUrl: 'https://picsum.photos/seed/familiamanchester/300/300'
        },
        leadership: [
            { role: 'Líderes', names: 'Paulo & Ester', photoUrl: 'https://picsum.photos/seed/lidermanchester/200/200' }
        ]
    },
    {
        id: 'mineirao',
        name: 'OBPC Mineirão',
        address: 'Rua do Mineirão, 321 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchmineirao/800/400',
        description: 'Uma igreja viva, atuante e comprometida com o Reino de Deus.',
        gallery: ['https://picsum.photos/seed/mineirao1/400/300', 'https://picsum.photos/seed/mineirao2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Antônio',
            wifeName: 'Pra. Cláudia',
            children: [],
            photoUrl: 'https://picsum.photos/seed/familiamineirao/300/300'
        },
        leadership: []
    },
    {
        id: 'cidade-jardim',
        name: 'OBPC Cidade Jardim',
        address: 'Rua das Flores, 55 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchcj/800/400',
        description: 'Comunhão, adoração e serviço. Venha fazer parte desta família.',
        gallery: ['https://picsum.photos/seed/cj1/400/300', 'https://picsum.photos/seed/cj2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. José',
            wifeName: 'Pra. Maria',
            children: ['Lucas'],
            photoUrl: 'https://picsum.photos/seed/familiacj/300/300'
        },
        leadership: []
    },
    {
        id: 'laranjeira',
        name: 'OBPC Laranjeira',
        address: 'Rua Laranjeiras, 88 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchlaranjeira/800/400',
        description: 'Anunciando as boas novas de salvação na Vila Laranjeira.',
        gallery: ['https://picsum.photos/seed/laranjeira1/400/300', 'https://picsum.photos/seed/laranjeira2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Fernando',
            wifeName: 'Pra. Aline',
            children: ['Sarah', 'Rebeca'],
            photoUrl: 'https://picsum.photos/seed/familialaranjeira/300/300'
        },
        leadership: []
    },
    {
        id: 'itavuvu',
        name: 'OBPC Itavuvu',
        address: 'Av. Itavuvu, 2000 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchitavuvu/800/400',
        description: 'Uma porta aberta para o céu na Zona Norte de Sorocaba.',
        gallery: ['https://picsum.photos/seed/itavuvu1/400/300', 'https://picsum.photos/seed/itavuvu2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Carlos',
            wifeName: 'Pra. Diana',
            children: ['Pedro'],
            photoUrl: 'https://picsum.photos/seed/familiaitavuvu/300/300'
        },
        leadership: []
    },
    {
        id: 'salto-de-pirapora',
        name: 'OBPC Salto de Pirapora',
        address: 'Centro - Salto de Pirapora/SP',
        coverUrl: 'https://picsum.photos/seed/churchsalto/800/400',
        description: 'Expandindo o Reino de Deus na cidade de Salto de Pirapora.',
        gallery: ['https://picsum.photos/seed/salto1/400/300', 'https://picsum.photos/seed/salto2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Eduardo',
            wifeName: 'Pra. Vânia',
            children: ['Matheus', 'Tiago'],
            photoUrl: 'https://picsum.photos/seed/familiasalto/300/300'
        },
        leadership: []
    },
    {
        id: 'brigadeiro-tobias',
        name: 'OBPC Brigadeiro Tobias',
        address: 'Rua Brigadeiro, 99 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchbrigadeiro/800/400',
        description: 'Luz e sal da terra na região de Brigadeiro Tobias.',
        gallery: ['https://picsum.photos/seed/brigadeiro1/400/300', 'https://picsum.photos/seed/brigadeiro2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Gilberto',
            wifeName: 'Pra. Sonia',
            children: [],
            photoUrl: 'https://picsum.photos/seed/familiabrigadeiro/300/300'
        },
        leadership: []
    },
    {
        id: 'ipiranga',
        name: 'OBPC Ipiranga',
        address: 'Rua Ipiranga, 44 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchipiranga/800/400',
        description: 'Uma comunidade de fé, esperança e amor.',
        gallery: ['https://picsum.photos/seed/ipiranga1/400/300', 'https://picsum.photos/seed/ipiranga2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Marcelo',
            wifeName: 'Pra. Renata',
            children: ['Isabela'],
            photoUrl: 'https://picsum.photos/seed/familiaipiranga/300/300'
        },
        leadership: []
    },
    {
        id: 'novo-mundo',
        name: 'OBPC Novo Mundo',
        address: 'Rua do Novo Mundo, 77 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchnm/800/400',
        description: 'Transformando o mundo ao nosso redor através do poder de Deus.',
        gallery: ['https://picsum.photos/seed/nm1/400/300', 'https://picsum.photos/seed/nm2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Roberto',
            wifeName: 'Pra. Lúcia',
            children: [],
            photoUrl: 'https://picsum.photos/seed/familianm/300/300'
        },
        leadership: []
    },
    {
        id: 'bela-vista',
        name: 'OBPC Bela Vista',
        address: 'Rua Bela Vista, 101 - Sorocaba/SP',
        coverUrl: 'https://picsum.photos/seed/churchbv/800/400',
        description: 'Um lugar de novos começos e restauração familiar.',
        gallery: ['https://picsum.photos/seed/bv1/400/300', 'https://picsum.photos/seed/bv2/400/300'],
        pastoralFamily: {
            pastorName: 'Pr. Daniel',
            wifeName: 'Pra. Camila',
            children: ['Samuel', 'Ester'],
            photoUrl: 'https://picsum.photos/seed/familiabv/300/300'
        },
        leadership: []
    },
];

export const DEPARTMENTS: Department[] = [
    {
        id: 'presidencia',
        acronym: 'PRESIDÊNCIA',
        name: 'Presidência Regional Sorocaba',
        description: 'Direção geral e cobertura espiritual de todas as igrejas da região.',
        bannerUrl: 'https://picsum.photos/seed/presidencia/800/400',
        team: [
            { 
                name: 'Pr. Luiz Carlos & Pra. Pastora', 
                role: 'Presidentes Regionais', 
                photoUrl: 'https://picsum.photos/seed/luizcarlos/200/200',
                familyBiography: 'Casado, pai e avô dedicado. Pastor Luiz Carlos Santos preside a Regional Sorocaba com visão missionária e amor pelas almas, dedicando sua vida e de sua família ao crescimento do Reino de Deus.'
            },
            {
                name: 'Pr. 1º Vice & Esposa',
                role: '1º Vice-Presidente',
                photoUrl: 'https://picsum.photos/seed/vice1/200/200',
                familyBiography: 'Auxiliando a presidência na condução dos trabalhos regionais com dedicação e excelência.'
            },
            {
                name: 'Pr. 2º Vice & Esposa',
                role: '2º Vice-Presidente',
                photoUrl: 'https://picsum.photos/seed/vice2/200/200',
                familyBiography: 'Suporte ministerial e administrativo à diretoria regional.'
            }
        ],
        works: 'Supervisão pastoral, alinhamento ministerial, representação institucional e cuidado dos pastores locais.',
        eventPhotos: [
            'https://picsum.photos/seed/presidencia1/400/300',
            'https://picsum.photos/seed/presidencia2/400/300'
        ],
        color: 'from-blue-800 to-indigo-900'
    },
    {
        id: 'fami',
        acronym: 'MINISTÉRIO FAMI',
        name: 'Coordenação Geral FAMI - Família com uma Missão',
        description: 'Integração de departamentos e fomento da visão missionária.',
        bannerUrl: 'https://picsum.photos/seed/fami/800/400',
        team: [
            { 
                name: 'Pr. Fernando Borges', 
                role: 'Coordenador - Ministério FAMI', 
                photoUrl: 'https://picsum.photos/seed/fernandoborges/200/200',
                familyBiography: 'Líder dinâmico, Pr. Fernando coordena as atividades do Ministério FAMI, promovendo a união entre os departamentos. Sua família está sempre envolvida na obra.'
            },
            {
                name: 'Vice-Coordenador',
                role: 'Vice-Coordenador',
                photoUrl: 'https://picsum.photos/seed/famivice/200/200',
                familyBiography: 'Auxiliando na coordenação geral e planejamento estratégico do ministério.'
            },
            {
                name: 'Secretário(a)',
                role: 'Secretaria',
                photoUrl: 'https://picsum.photos/seed/famisecretary/200/200',
                familyBiography: 'Responsável pela organização administrativa, atas e agendas do ministério.'
            },
            {
                name: 'Tesoureiro(a)',
                role: 'Tesouraria',
                photoUrl: 'https://picsum.photos/seed/famitreasurer/200/200',
                familyBiography: 'Gestão financeira, controle de ofertas e investimentos nos projetos do departamento.'
            },
            {
                name: 'Líder de Mídia',
                role: 'Comunicação e Mídia',
                photoUrl: 'https://picsum.photos/seed/famimedia/200/200',
                familyBiography: 'Responsável pela divulgação, redes sociais e cobertura dos eventos da FAMI.'
            }
        ],
        works: 'Organização de grandes cruzadas evangelísticas, suporte aos líderes de departamentos e eventos de integração regional.',
        eventPhotos: [
            'https://picsum.photos/seed/fami1/400/300',
            'https://picsum.photos/seed/fami2/400/300',
            'https://picsum.photos/seed/fami3/400/300'
        ],
        color: 'from-indigo-600 to-blue-600'
    },
    {
        id: 'jubrac',
        acronym: 'MINISTÉRIO JUBRAC',
        name: 'Juventude Unida O Brasil Para Cristo',
        description: 'Movimento de jovens apaixonados por Cristo e pela obra missionária.',
        bannerUrl: 'https://picsum.photos/seed/jubrac/800/400',
        team: [
            { 
                name: 'Pb. Eder', 
                role: 'Coordenador Regional', 
                photoUrl: 'https://picsum.photos/seed/eder/200/200',
                familyBiography: 'Líder entusiasta da juventude, Pb. Eder e sua família dedicam-se a inspirar a nova geração a buscar a santidade e o serviço cristão.'
            },
            { name: 'Vice-Líder', role: 'Vice-Coordenador', photoUrl: 'https://picsum.photos/seed/jovem2/200/200' },
            { name: 'Sec. de Eventos', role: 'Eventos', photoUrl: 'https://picsum.photos/seed/jovem3/200/200' },
            { name: 'Líder de Mídia', role: 'Comunicação', photoUrl: 'https://picsum.photos/seed/jovem4/200/200' }
        ],
        works: 'Acampamentos anuais, vigílias de adoração, projetos de evangelismo urbano (FAMI nas Ruas) e discipulado de novos jovens.',
        eventPhotos: [
            'https://picsum.photos/seed/jubrac1/400/300',
            'https://picsum.photos/seed/jubrac2/400/300',
            'https://picsum.photos/seed/jubrac3/400/300'
        ],
        color: 'from-orange-500 to-red-500'
    },
    {
        id: 'ufebrac',
        acronym: 'MINISTÉRIO UFEBRAC',
        name: 'União Feminina O Brasil Para Cristo',
        description: 'Mulheres de oração, ação e serviço no Reino de Deus.',
        bannerUrl: 'https://picsum.photos/seed/ufebrac/800/400',
        team: [
            { 
                name: 'Pra. Marineide', 
                role: 'Coordenadora Regional', 
                photoUrl: 'https://picsum.photos/seed/marineide/200/200',
                familyBiography: 'Mulher de oração e fibra, Pra. Marineide lidera a UFEBRAC com amor maternal. Sua família é um exemplo de serviço e dedicação à obra de Deus.'
            },
            { name: 'Vice-Diretora', role: 'Vice-Diretora', photoUrl: 'https://picsum.photos/seed/mulher2/200/200' },
            { name: 'Secretária', role: 'Secretaria', photoUrl: 'https://picsum.photos/seed/mulher3/200/200' },
            { name: 'Líder de Ação Social', role: 'Social', photoUrl: 'https://picsum.photos/seed/mulher4/200/200' }
        ],
        works: 'Congressos de mulheres, chás de comunhão, visitas a lares, campanhas de oração e assistência social a famílias carentes.',
        eventPhotos: [
            'https://picsum.photos/seed/ufebrac1/400/300',
            'https://picsum.photos/seed/ufebrac2/400/300',
            'https://picsum.photos/seed/ufebrac3/400/300'
        ],
        color: 'from-pink-500 to-rose-500'
    },
    {
        id: 'umasbrac',
        acronym: 'MINISTÉRIO UMASBRAC',
        name: 'União Masculina O Brasil Para Cristo',
        description: 'Homens de honra, sacerdotes do lar e trabalhadores do Reino.',
        bannerUrl: 'https://picsum.photos/seed/umasbrac/800/400',
        team: [
            { 
                name: 'Pb. Leandro', 
                role: 'Coordenador Regional', 
                photoUrl: 'https://picsum.photos/seed/leandro/200/200',
                familyBiography: 'Comprometido com o fortalecimento dos homens da igreja, Pb. Leandro e sua casa servem ao Senhor, promovendo a comunhão e o sacerdócio no lar.'
            },
            { name: 'Vice-Diretor', role: 'Vice-Diretora', photoUrl: 'https://picsum.photos/seed/homem2/200/200' },
            { name: '1º Secretário', role: 'Secretaria', photoUrl: 'https://picsum.photos/seed/homem3/200/200' },
            { name: 'Tesoureiro', role: 'Finanças', photoUrl: 'https://picsum.photos/seed/homem4/200/200' }
        ],
        works: 'Cafés de pastores e líderes, mutirões de reforma nas igrejas, encontros de fortalecimento familiar e evangelismo pessoal.',
        eventPhotos: [
            'https://picsum.photos/seed/umasbrac1/400/300',
            'https://picsum.photos/seed/umasbrac2/400/300',
            'https://picsum.photos/seed/umasbrac3/400/300'
        ],
        color: 'from-blue-700 to-slate-800'
    },
    {
        id: 'minibrac',
        acronym: 'MINISTÉRIO MINIBRAC',
        name: 'Ministério Infantil O Brasil Para Cristo',
        description: 'Ensinando a criança no caminho em que deve andar.',
        bannerUrl: 'https://picsum.photos/seed/minibrac/800/400',
        team: [
            { name: 'Tia Coordenadora', role: 'Diretora Regional', photoUrl: 'https://picsum.photos/seed/infantil1/200/200' },
            { name: 'Tia Vice', role: 'Vice-Diretora', photoUrl: 'https://picsum.photos/seed/infantil2/200/200' },
            { name: 'Equipe de Apoio', role: 'Pedagogia', photoUrl: 'https://picsum.photos/seed/infantil3/200/200' },
            { name: 'Tio da Música', role: 'Louvor Kids', photoUrl: 'https://picsum.photos/seed/infantil4/200/200' }
        ],
        works: 'Escola Bíblica de Férias (EBF), cultos infantis regionais, treinamento para professores de escola dominical e evangelismo infantil.',
        eventPhotos: [
            'https://picsum.photos/seed/minibrac1/400/300',
            'https://picsum.photos/seed/minibrac2/400/300',
            'https://picsum.photos/seed/minibrac3/400/300'
        ],
        color: 'from-yellow-400 to-orange-400'
    }
];
