/**
 * js/core/SystemState.js
 * ЦЕНТРАЛЬНЕ ЯДРО ДАНИХ (State Manager)
 * Керує станом 1000+ функцій системи.
 */

export const SystemState = {
    // 1. Конфігурація Користувача
    user: {
        id: "USR-2026-X",
        name: "Mykyta Melnichenko",
        accessLevel: "Developer",
        settings: { theme: 'dark', units: 'metric' }
    },

    // 2. Параметри Конструкції (Навіс)
    canopy: {
        dimensions: {
            width: 5.0,
            length: 5.0,
            heightFront: 2.5,
            heightBack: 2.0,
            angle: 5.71 // розраховано автоматично
        },
        materials: {
            pillar: "50x50x2.5",
            beam: "80x40x3.0",
            truss: "60x40x2.0",
            roofType: "Profnastil PS-20",
            roofColor: "#2d3436"
        },
        physics: {
            snowLoad: 180, // кг/м2
            windLoad: 45,  // кг/м2
            safetyFactor: 1.5
        }
    },

    // 3. Фінансовий модуль
    finance: {
        currency: "UAH",
        baseMargin: 0.25,
        estimatedTotal: 0,
        items: []
    },

    // 4. Стан UI
    ui: {
        currentRoute: 'editor',
        isSidebarOpen: true,
        activeModals: [],
        notifications: []
    },

    /**
     * Функція оновлення стану з логуванням (Action Pattern)
     */
    update(path, value) {
        const keys = path.split('.');
        let current = this;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        const oldValue = current[keys[keys.length - 1]];
        current[keys[keys.length - 1]] = value;
        
        // Виклик системної події перерахунку
        document.dispatchEvent(new CustomEvent('stateChanged', { 
            detail: { path, oldValue, newValue: value } 
        }));
        
        console.log(`[SYSTEM STATE] Updated ${path} to:`, value);
    },

    /**
     * Отримання розрахункових даних
     */
    getCalculatedWeight() {
        // Тут буде логіка з файлу Calculator.js
        return (this.canopy.dimensions.width * this.canopy.dimensions.length) * 15.5; 
    }
};

// Авто-ініціалізація розрахунків при завантаженні
window.SystemState = SystemState;
