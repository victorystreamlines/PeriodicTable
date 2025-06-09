/**
 * Enhanced Dynamic Translation System for Periodic Table App
 * Using Google Translate API with fallback to MyMemory API
 * Supports English ↔ Arabic with RTL/LTR handling
 * Optimized for performance and reliability
 */

class DynamicTranslator {
    constructor() {
        // Primary API - Google Translate (via public endpoint)
        this.primaryAPI = 'https://translate.googleapis.com/translate_a/single';
        // Fallback API - MyMemory (free)
        this.fallbackAPI = 'https://api.mymemory.translated.net/get';
        
        this.currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
        this.translationCache = JSON.parse(localStorage.getItem('translationCache') || '{}');
        this.isTranslating = false;
        
        // Pre-defined translations for common UI elements (for speed)
        this.quickTranslations = {
            'en': {
                'Periodic Table': 'الجدول الدوري',
                'Element': 'العنصر',
                'Elements': 'العناصر',
                'Symbol': 'الرمز',
                'Name': 'الاسم',
                'Atomic Number': 'العدد الذري',
                'Atomic Mass': 'الكتلة الذرية',
                'Quiz': 'اختبار',
                'Score': 'النتيجة',
                'Home': 'الرئيسية',
                'Back': 'رجوع',
                'Next': 'التالي',
                'Show Answers': 'إظهار الإجابات',
                'Hide Answers': 'إخفاء الإجابات',
                'Reset': 'إعادة تعيين',
                'Close': 'إغلاق',
                'Start': 'بدء',
                'Begin': 'ابدأ',
                'Advanced': 'متقدم',
                'Basic': 'أساسي',
                'Properties': 'الخصائص',
                'Classification': 'التصنيف',
                'Discovery': 'الاكتشاف',
                'Applications': 'التطبيقات',
                'Safety': 'الأمان',
                'Health': 'الصحة',
                'Temperature': 'درجة الحرارة',
                'Pressure': 'الضغط',
                'Density': 'الكثافة',
                'Melting Point': 'نقطة الانصهار',
                'Boiling Point': 'نقطة الغليان',
                'Electron Configuration': 'التركيب الإلكتروني',
                'Ionization Energy': 'طاقة التأين',
                'Year': 'السنة',
                'Discoverer': 'المكتشف',
                'Crystal Structure': 'البنية البلورية',
                'Conductivity': 'التوصيل',
                'Alkali Metals': 'الفلزات القلوية',
                'Alkaline Earth Metals': 'فلزات الأرض القلوية',
                'Transition Metals': 'العناصر الانتقالية',
                'Post-transition Metals': 'فلزات ما بعد الانتقالية',
                'Metalloids': 'أشباه الفلزات',
                'Nonmetals': 'اللافلزات',
                'Halogens': 'الهالوجينات',
                'Noble Gases': 'الغازات النبيلة',
                'Lanthanides': 'اللانثانيدات',
                'Actinides': 'الأكتينيدات'
            }
        };
        
        this.init();
    }

    init() {
        this.createLanguageToggle();
        this.setupEventListeners();
        
        // Apply saved language preference on page load
        if (this.currentLanguage === 'ar') {
            setTimeout(() => this.translateToArabic(), 300);
        }
    }

    createLanguageToggle() {
        // Remove existing toggle if any
        const existingToggle = document.getElementById('language-toggle-container');
        if (existingToggle) {
            existingToggle.remove();
        }

        // Create language toggle button
        const toggleContainer = document.createElement('div');
        toggleContainer.id = 'language-toggle-container';
        toggleContainer.innerHTML = `
            <div class="language-toggle">
                <button id="language-toggle-btn" class="language-btn" title="Switch Language">
                    <span class="language-text">${this.currentLanguage === 'en' ? 'العربية' : 'English'}</span>
                    <span class="language-icon">${this.currentLanguage === 'en' ? '🌐' : '🔄'}</span>
                </button>
                <div id="translation-loader" class="translation-loader" style="display: none;">
                    <div class="loader-spinner"></div>
                    <span>Translating...</span>
                </div>
            </div>
        `;

        // Add CSS styles
        this.addToggleStyles();

        // Insert toggle button at the top of the page
        document.body.insertBefore(toggleContainer, document.body.firstChild);
    }

    addToggleStyles() {
        // Remove existing styles
        const existingStyles = document.getElementById('translator-styles');
        if (existingStyles) {
            existingStyles.remove();
        }

        const styles = document.createElement('style');
        styles.id = 'translator-styles';
        styles.textContent = `
            #language-toggle-container {
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 10000;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .language-toggle {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .language-btn {
                background: linear-gradient(135deg, #667eea, #764ba2);
                border: none;
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
                min-width: 120px;
                justify-content: center;
            }

            .language-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
            }

            .language-btn:active {
                transform: translateY(0);
            }

            .language-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }

            .language-icon {
                font-size: 16px;
            }

            .translation-loader {
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid #667eea;
                border-radius: 20px;
                padding: 10px 15px;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                font-size: 12px;
                color: #667eea;
                font-weight: bold;
            }

            .loader-spinner {
                width: 16px;
                height: 16px;
                border: 2px solid #f3f3f3;
                border-top: 2px solid #667eea;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* RTL Support */
            body[dir="rtl"] {
                direction: rtl;
                text-align: right;
            }

            body[dir="rtl"] #language-toggle-container {
                left: auto;
                right: 20px;
            }

            body[dir="rtl"] .language-btn {
                flex-direction: row-reverse;
            }

            /* Responsive design */
            @media (max-width: 768px) {
                #language-toggle-container {
                    top: 10px;
                    left: 10px;
                }

                body[dir="rtl"] #language-toggle-container {
                    left: auto;
                    right: 10px;
                }

                .language-btn {
                    padding: 10px 16px;
                    font-size: 12px;
                    min-width: 100px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#language-toggle-btn')) {
                this.toggleLanguage();
            }
        });
    }

    async toggleLanguage() {
        if (this.isTranslating) return;

        if (this.currentLanguage === 'en') {
            await this.translateToArabic();
        } else {
            this.translateToEnglish();
        }
    }

    async translateToArabic() {
        this.isTranslating = true;
        this.showLoader(true);

        try {
            console.log('بدء الترجمة إلى العربية...');
            
            // Get all text elements that should be translated
            const elementsToTranslate = this.getTranslatableElements();
            console.log(`وجدت ${elementsToTranslate.length} عنصر للترجمة`);

            // Process translations
            await this.processTranslations(elementsToTranslate);

            // Update language state
            this.currentLanguage = 'ar';
            document.documentElement.setAttribute('dir', 'rtl');
            document.body.setAttribute('dir', 'rtl');
            
            // Update toggle button
            this.updateToggleButton();
            
            // Save preference
            localStorage.setItem('preferredLanguage', 'ar');

            console.log('تمت الترجمة بنجاح!');

        } catch (error) {
            console.error('خطأ في الترجمة:', error);
            this.showError('Translation failed. Please check your internet connection.');
        } finally {
            this.isTranslating = false;
            this.showLoader(false);
        }
    }

    async processTranslations(elements) {
        const translations = new Map();
        
        // First, collect unique texts
        const uniqueTexts = new Set();
        
        elements.forEach(element => {
            const text = this.getCleanText(element);
            if (text && text.length > 0) {
                uniqueTexts.add(text);
            }
        });

        console.log(`معالجة ${uniqueTexts.size} نص فريد`);

        // Process translations for unique texts
        for (const text of uniqueTexts) {
            const translation = await this.getTranslation(text);
            if (translation) {
                translations.set(text, translation);
                // Small delay to prevent overwhelming the API
                await this.delay(100);
            }
        }

        // Apply translations to elements
        elements.forEach(element => {
            const originalText = this.getCleanText(element);
            const translation = translations.get(originalText);
            
            if (translation && translation !== originalText) {
                this.setElementText(element, translation);
            }
        });

        // Save translations to cache
        translations.forEach((translation, original) => {
            this.translationCache[original] = translation;
        });
        
        localStorage.setItem('translationCache', JSON.stringify(this.translationCache));
    }

    async getTranslation(text) {
        // Check cache first
        if (this.translationCache[text]) {
            return this.translationCache[text];
        }

        // Check quick translations
        if (this.quickTranslations.en[text]) {
            return this.quickTranslations.en[text];
        }

        // Try Google Translate API first
        try {
            const googleTranslation = await this.translateWithGoogle(text);
            if (googleTranslation) {
                return googleTranslation;
            }
        } catch (error) {
            console.log('Google Translate failed, trying fallback API...');
        }

        // Fallback to MyMemory API
        try {
            const fallbackTranslation = await this.translateWithMyMemory(text);
            if (fallbackTranslation) {
                return fallbackTranslation;
            }
        } catch (error) {
            console.log('Fallback API also failed for:', text);
        }

        return null;
    }

    async translateWithGoogle(text) {
        const url = `${this.primaryAPI}?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Google API error');
            
            const data = await response.json();
            
            if (data && data[0] && data[0][0] && data[0][0][0]) {
                return data[0][0][0];
            }
        } catch (error) {
            console.log('Google Translate error:', error);
            throw error;
        }
        
        return null;
    }

    async translateWithMyMemory(text) {
        const url = `${this.fallbackAPI}?q=${encodeURIComponent(text)}&langpair=en|ar`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('MyMemory API error');
            
            const data = await response.json();
            
            if (data && data.responseData && data.responseData.translatedText) {
                return data.responseData.translatedText;
            }
        } catch (error) {
            console.log('MyMemory API error:', error);
            throw error;
        }
        
        return null;
    }

    translateToEnglish() {
        // Reload page to restore original English content
        this.currentLanguage = 'en';
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.setAttribute('dir', 'ltr');
        localStorage.setItem('preferredLanguage', 'en');
        
        // Clear any visual indicators
        this.showLoader(false);
        
        location.reload();
    }

    getTranslatableElements() {
        const selectors = [
            'h1:not(.no-translate)',
            'h2:not(.no-translate)', 
            'h3:not(.no-translate)',
            'h4:not(.no-translate)',
            'h5:not(.no-translate)',
            'h6:not(.no-translate)',
            'p:not(.no-translate)',
            'span:not(.no-translate)',
            'div.feature-title',
            'div.feature-text',
            'div.quiz-title',
            'div.quiz-description',
            'li:not(.no-translate)',
            'td:not(.no-translate)',
            'th:not(.no-translate)',
            'label:not(.no-translate)',
            'button:not(.no-translate)',
            'a:not(.no-translate)',
            '.legend-item span',
            '.navbar-text',
            '.lead',
            '.display-4',
            '.hero-title',
            '.hero-subtitle'
        ];

        const elements = [];
        
        selectors.forEach(selector => {
            try {
                document.querySelectorAll(selector).forEach(element => {
                    if (this.shouldTranslateElement(element)) {
                        elements.push(element);
                    }
                });
            } catch (e) {
                console.log('Error with selector:', selector, e);
            }
        });

        return elements;
    }

    shouldTranslateElement(element) {
        // Skip if element is part of excluded containers
        if (element.closest('#language-toggle-container') ||
            element.closest('.auth-container') ||
            element.closest('script') ||
            element.closest('style') ||
            element.closest('code') ||
            element.closest('pre')) {
            return false;
        }

        // Skip if element has no-translate attributes
        if (element.hasAttribute('data-no-translate') ||
            element.classList.contains('no-translate')) {
            return false;
        }

        // Skip if element contains only numbers, symbols, or is empty
        const text = this.getCleanText(element);
        if (!text || 
            text.length < 2 ||
            /^[\d\s\.\,\-\+\(\)%°]+$/.test(text) ||
            /^[A-Z][a-z]?[\d\s]*$/.test(text.trim()) ||
            /^[H₂O|CO₂|NaCl|CaCO₃]/.test(text)) {
            return false;
        }

        return true;
    }

    getCleanText(element) {
        // Get text content, excluding nested elements that shouldn't be translated
        let text = '';
        
        // If element has only text nodes
        if (element.children.length === 0) {
            text = element.textContent.trim();
        } else {
            // Get direct text content only
            for (let node of element.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    text += node.textContent;
                }
            }
            text = text.trim();
        }
        
        return text;
    }

    setElementText(element, newText) {
        if (element.children.length === 0) {
            // Element contains only text
            element.textContent = newText;
        } else {
            // Replace only text nodes
            for (let node of element.childNodes) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    node.textContent = newText;
                    break;
                }
            }
        }
    }

    updateToggleButton() {
        const btn = document.getElementById('language-toggle-btn');
        if (!btn) return;
        
        const textSpan = btn.querySelector('.language-text');
        const iconSpan = btn.querySelector('.language-icon');

        if (this.currentLanguage === 'en') {
            textSpan.textContent = 'العربية';
            iconSpan.textContent = '🌐';
            btn.title = 'Switch to Arabic';
        } else {
            textSpan.textContent = 'English';
            iconSpan.textContent = '🔄';
            btn.title = 'Switch to English';
        }
    }

    showLoader(show) {
        const loader = document.getElementById('translation-loader');
        const btn = document.getElementById('language-toggle-btn');
        
        if (loader && btn) {
            if (show) {
                loader.style.display = 'flex';
                btn.disabled = true;
            } else {
                loader.style.display = 'none';
                btn.disabled = false;
            }
        }
    }

    showError(message) {
        // Create a temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: #f8d7da;
            color: #721c24;
            padding: 15px 25px;
            border-radius: 8px;
            border: 1px solid #f5c6cb;
            z-index: 10001;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        setTimeout(() => {
            if (document.body.contains(errorDiv)) {
                document.body.removeChild(errorDiv);
            }
        }, 4000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the translator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if not already initialized
    if (!window.dynamicTranslator) {
        console.log('تهيئة نظام الترجمة...');
        window.dynamicTranslator = new DynamicTranslator();
    }
});

// Export for manual initialization if needed
window.DynamicTranslator = DynamicTranslator; 