export interface VMData {
    id: number;
    name: string;
    vcpu: string;
    ram: string;
    ssd: string;
    price: number;
    url?: string;
    description: string;
    description_tech: string;
}

export interface VMApiResponse {
    data: VMData[];
}

// Моковые данные
const mockData: VMData[] = [
    {'id': 1, 'name': 'HP C1-M1-D10', 'price': 480, 'description': 'Для выполнения кода сервисов и приложений, размещения интернет-магазинов и развертывания тестовых сред.', 'vcpu': '1 ядро', 'ram': '1 ГБ', 'ssd': '10 ГБ', 'url': '', 'description_tech': 'Компактный виртуальный сервер с 1 ядром vcpu (2.5 ГГц), 1 ГБ DDR4, 10 ГБ ssd, подходит для тестовых сред и небольших приложений.'},
    {'id': 2, 'name': 'HP C2-M4-D80', 'price': 2260, 'description': 'Для выполнения кода сервисов и приложений, размещения интернет-магазинов и развертывания тестовых сред.', 'vcpu': '2 ядра', 'ram': '4 ГБ', 'ssd': '80 ГБ', 'url': '', 'description_tech': 'Сбалансированный сервер с 2 ядрами vcpu (2.5 ГГц), 4 ГБ DDR4, 80 ГБ ssd, отлично подходит для средних приложений и тестов.'},
    {'id': 3, 'name': 'HP C4-M32-D200', 'price': 10245, 'description': 'Для выполнения кода сервисов и приложений, размещения интернет-магазинов и развертывания тестовых сред.', 'vcpu': '4 ядра', 'ram': '32 ГБ', 'ssd': '200 ГБ', 'url': '', 'description_tech': 'Мощный сервер с 4 ядрами vcpu (2.5 ГГц), 32 ГБ DDR4, 200 ГБ ssd, предназначен для крупных приложений и сервисов.'},
    {'id': 4, 'name': 'HP C1-M0.5-D5', 'price': 248, 'description': 'Для хостинга сайтов, запуска стейджинга и мониторинга.', 'vcpu': '1 ядро', 'ram': '0.5 ГБ', 'ssd': '5 ГБ', 'url': '', 'description_tech': 'Экономичный сервер с 1 ядром vcpu (2.5 ГГц), 0.5 ГБ DDR4, 5 ГБ ssd, идеально подходит для небольших сайтов и тестов.'},
    {'id': 5, 'name': 'HP C2-M2-D40', 'price': 738, 'description': 'Для хостинга сайтов, запуска стейджинга и мониторинга.', 'vcpu': '2 ядра', 'ram': '2 ГБ', 'ssd': '40 ГБ', 'url': '', 'description_tech': 'Универсальный сервер с 2 ядрами vcpu (2.5 ГГц), 2 ГБ DDR4, 40 ГБ ssd, подходит для веб-приложений и хостинга сайтов.'},
    {'id': 6, 'name': 'HP C4-M8-D80', 'price': 2439, 'description': 'Для хостинга сайтов, запуска стейджинга и мониторинга.', 'vcpu': '4 ядра', 'ram': '8 ГБ', 'ssd': '80 ГБ', 'url': '', 'description_tech': 'Надежный сервер с 4 ядрами vcpu (2.5 ГГц), 8 ГБ DDR4, 80 ГБ ssd, подходит для многозадачных приложений и веб-проектов.'},
    {'id': 7, 'name': 'HP C8-M32-D256', 'price': 18901, 'description': 'Для 3D-моделирования, рендеринга, ML и аналитики.', 'vcpu': '8 ядер', 'ram': '32 ГБ', 'ssd': '256 ГБ', 'url': '', 'description_tech': 'Высокопроизводительный сервер с 8 ядрами vcpu (2.5 ГГц), 32 ГБ DDR4, 256 ГБ ssd, подходит для задач требующих больших вычислительных ресурсов.'},
    {'id': 8, 'name': 'HP C12-M64-D512', 'price': 28317, 'description': 'Для 3D-моделирования, рендеринга, ML и аналитики.', 'vcpu': '12 ядер', 'ram': '64 ГБ', 'ssd': '512 ГБ', 'url': '', 'description_tech': 'Мощнейший сервер с 12 ядрами vcpu (2.5 ГГц), 64 ГБ DDR4, 512 ГБ ssd, идеально подходит для рендеринга и вычислительных задач.'},
    {'id': 9, 'name': 'HP C32-M180-D1024', 'price': 89315, 'description': 'Для 3D-моделирования, рендеринга, ML и аналитики.', 'vcpu': '32 ядра', 'ram': '180 ГБ', 'ssd': '1024 ГБ', 'url': '', 'description_tech': 'Флагманский сервер с 32 ядрами vcpu (2.5 ГГц), 180 ГБ DDR4, 1024 ГБ ssd, подходит для масштабных вычислительных и аналитических задач.'},
];

export const fetchVMListFromApi = async (maxPrice: number): Promise<VMData[]> => {
    try {
        const response = await fetch(`/api/vmachines/?vmachine_price=${maxPrice}`);
        if (!response.ok) {
            throw new Error('Сетевая ошибка');
        }
        const data = await response.json();
        if (Array.isArray(data.vmachines)) {
            return data.vmachines; 
        } else {
            throw new Error('Некорректный формат данных');
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return mockData; 
    }
};

export const fetchVMByIdFromApi = async (id: number): Promise<VMData | undefined> => {
    try {
        const response = await fetch(`/api/vmachines/${id}/`); 
        if (!response.ok) {
            throw new Error('Сетевая ошибка');
        }
        const data: VMData = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return mockData.find(vm => vm.id === id); 
    }
};


export const fetchVMList = async (): Promise<VMData[]> => new Promise(resolve => setTimeout(() => resolve(mockData), 500));

export const fetchVMById = async (id: number): Promise<VMData | undefined> => new Promise(resolve => setTimeout(() => resolve(mockData.find(vm => vm.id === id)), 500));
