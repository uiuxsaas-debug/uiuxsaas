// ═══════════════════════════════════════════════════════════════════════════════
// UI ENGINE - Universal Industry-Expert UI Generation
// ═══════════════════════════════════════════════════════════════════════════════

export interface IntentResult {
    screenType: string;
    domain: string;
    userGoal: string;
    tone: string;
    suggestedSections: string[];
    context: {
        businessModel: string;
        primaryEntities: string[];
        keyActions: string[];
        dataPatterns: {
            pricing: string;
            ratings: boolean;
            locations: boolean;
            scheduling: boolean;
        };
    };
}

export interface StructureResult {
    layout: string;
    sections: any[];
    hasBottomNav: boolean;
    hasBottomCTA: boolean;
}

export interface DataResult {
    screenTitle: string;
    screenSubtitle?: string;
    sections: any[];
}

export interface ValidationResult {
    isValid: boolean;
    errors: any[];
    sanitizedData: DataResult;
}

// // INDUSTRY KNOWLEDGE BASE - SIMPLIFIED FOR NOW
const INDUSTRY_KNOWLEDGE_BASE: Record<string, any> = {
    'car rental': {
        competitors: ['Enterprise', 'Hertz', 'Avis', 'Budget'],
        vehicle_examples: ['Toyota Camry', 'Honda Civic', 'Ford Explorer', 'BMW 3 Series'],
        pricing_examples: ['$45/day', '$89/week', '$299/month'],
        features: ['GPS Navigation', 'Insurance Coverage', 'Unlimited Miles'],
        terminology: ['Book', 'Reserve', 'Daily Rate', 'Pickup Location']
    },
    'food delivery': {
        competitors: ['Uber Eats', 'DoorDash', 'Grubhub'],
        restaurant_examples: ['Pizza Palace', 'Burger King', 'Sushi Express'],
        pricing_examples: ['$2.99 delivery', '$1.49 service fee', 'Free delivery over $20'],
        features: ['Real-time tracking', 'Driver ratings', 'Contactless delivery'],
        terminology: ['Place Order', 'Track Delivery', 'ETA', 'Minimum order']
    }
};

// UNIVERSAL INTENT ANALYSIS
export async function analyzeIntent(userInput: string): Promise<IntentResult> {
    const UNIVERSAL_INTENT_PROMPT = `
You are an INDUSTRY-LEVEL Intent Parser for ANY type of mobile application.
Your expertise is in understanding complex business domains and extracting precise, actionable intent.

CRITICAL BUSINESS UNDERSTANDING:
- Car rental is a "service business" with inventory management, booking systems, and revenue per day/time
- Food delivery is a "marketplace" connecting restaurants with customers, featuring menu systems and delivery logistics
- Dating apps are "social platforms" with profile systems, matching algorithms, and premium features
- Fitness apps are "content platforms" with workout libraries, progress tracking, and community features

SCREEN TYPES (choose one):
- hero_landing: Welcome/hook screens with emotional headlines and call-to-action
- dashboard: Main app with key metrics, status overview, and quick access actions
- auth: Login/signup screens with social integration and recovery options
- settings: Profile management, preferences, and app configuration
- listing_grid: Browse/search interface with filters, sorting, and item cards
- detail_view: Comprehensive item details with rich media, specifications, and conversion elements
- booking_form: Multi-step reservation/purchase flow with form validation and payment integration
- quiz_persona: User onboarding with selection interfaces and personalization options
- processing: Loading/progress screens with realistic progress indicators and status updates

UNIVERSAL CONTEXT EXTRACTION:
Analyze the user's request deeply and extract:

1. DOMAIN: The main business category with industry-specific understanding
   Examples:
   - "car rental" → automotive services, fleet management, booking systems
   - "food delivery" → restaurant ecosystem, delivery logistics, order management
   - "dating app" → social networking, profile systems, matchmaking algorithms
   - "hotel booking" → hospitality management, room inventory, reservation systems

2. BUSINESS MODEL: Monetization strategy with industry nuance
   - "service": Rental/booking-based revenue, inventory utilization, service fees
   - "product": Direct sales, e-commerce platforms, marketplace facilitation
   - "social": Premium subscriptions, advertising revenue, data monetization
   - "content": Subscription access, course sales, premium content, freemium models
   - "marketplace": Commission-based revenue, platform fees, service provider coordination

3. INDUSTRY ENTITIES: The core business objects with specific attributes
   - Car Rental: ["vehicles", "fleet", "bookings", "rates", "availability", "locations"]
   - Food Delivery: ["restaurants", "menus", "drivers", "orders", "delivery_zones"]
   - Dating: ["profiles", "matches", "conversations", "preferences", "subscriptions"]
   - Hotels: ["rooms", "properties", "amenities", "bookings", "rates"]

4. COMPLEX ACTIONS: User behaviors with industry-specific flows
   - Car Rental: ["search_vehicles", "check_availability", "select_pickup_location", "complete_booking", "manage_reservation"]
   - Food Delivery: ["browse_restaurants", "customize_order", "track_delivery", "rate_service"]
   - Dating: ["create_profile", "set_preferences", "browse_matches", "send_message", "upgrade_premium"]

5. INDUSTRY PATTERNS: Domain-specific data requirements
   - Car Rental:
     * pricing: "per_day", "per_weekend", "per_month", "insurance_required", "mileage_limits"
     * ratings: true (vehicle ratings, service reviews)
     * locations: true (pickup/dropoff points)
     * scheduling: true (availability calendars, time slots)
     * insurance: true (coverage options, damage waiver)

   - Food Delivery:
     * pricing: "per_item", "delivery_fee", "service_fee", "minimum_order"
     * ratings: true (restaurant ratings, driver reviews)
     * locations: true (delivery zones, restaurant locations)
     * scheduling: true (delivery times, preparation time)

   - Dating:
     * pricing: "subscription", "premium_features", "in_app_purchases"
     * ratings: false (user compatibility scores)
     * locations: false (geographical preferences)
     * scheduling: false (matching algorithms)

   - Hotels:
     * pricing: "per_night", "per_week", "seasonal_pricing", "cancellation_policy"
     * ratings: true (property ratings, guest reviews)
     * locations: true (property locations, nearby amenities)
     * scheduling: true (availability calendars, check-in/check-out times)
     * amenities: true (pool, wifi, parking, breakfast)

CRITICAL THINKING INSTRUCTIONS:
- Think like a product manager with deep domain expertise
- Extract the underlying business model, not just surface keywords
- Consider real-world constraints and industry standards
- Identify competitive advantages and unique value propositions
- Account for user journey friction points and optimization opportunities

ANALYZE this input and return comprehensive JSON:
{
  "screenType": "optimal screen type for this use case",
  "domain": "precise industry domain classification",
  "userGoal": "clear user objective with business context",
  "tone": "professional|playful|minimal|bold",
  "suggestedSections": ["array of strategically relevant section types"],
  "context": {
    "businessModel": "industry-specific business classification",
    "primaryEntities": ["industry-relevant entity categories"],
    "keyActions": ["industry-specific user behaviors"],
    "competitiveAdvantages": ["array of potential differentiators"],
    "targetAudience": "identified user demographics and psychographics",
    "dataPatterns": {
      "pricing": "industry-appropriate pricing model",
      "ratings": true|false,
      "locations": true|false,
      "scheduling": true|false,
      "insurance": true|false,
      "delivery": true|false,
      "cancellation": true|false
    },
    "industryStandards": ["compliance requirements", "safety standards", "quality metrics"]
  }
}

Return ONLY valid JSON. No markdown.
    `;

    const { geminiModel } = await import("@/config/gemini");

    const result = await geminiModel.generateContent({
        contents: [
            {
                role: "user",
                parts: [{ text: UNIVERSAL_INTENT_PROMPT + "\n\n" + userInput }]
            }
        ],
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.3,
        },
    });

    const parsed = JSON.parse(result.response.text());

    return {
        screenType: parsed.screenType,
        domain: parsed.domain,
        userGoal: parsed.userGoal,
        tone: parsed.tone,
        suggestedSections: parsed.suggestedSections,
        context: parsed.context
    };
}

// STRUCTURE GENERATION
export function generateStructure(intent: IntentResult): StructureResult {
    const { screenType, domain, context } = intent;

    // Universal structure generation based on domain and screen type
    const structureRules = {
        'listing_grid': {
            sections: [
                { type: 'header', required: true, order: 1 },
                { type: 'search_filters', required: true, order: 2 },
                { type: 'listing_grid', required: true, order: 3, constraints: { minItems: 3, maxItems: 8 } },
                { type: 'bottom_nav', required: true, order: 4 }
            ],
            hasBottomNav: true,
            hasBottomCTA: false
        },
        'detail_view': {
            sections: [
                { type: 'header', required: false, order: 1 },
                { type: 'detail_view', required: true, order: 2 },
                { type: 'rating_review', required: context.dataPatterns.ratings, order: 3, constraints: { minItems: 3, maxItems: 6 } },
                { type: 'price_display', required: true, order: 4 },
                { type: 'booking_form', required: true, order: 5 }
            ],
            hasBottomNav: false,
            hasBottomCTA: true
        },
        'dashboard': {
            sections: [
                { type: 'header', required: true, order: 1 },
                { type: 'stats_grid', required: true, order: 2, constraints: { minItems: 2, maxItems: 4 } },
                { type: 'card_list', required: true, order: 3, constraints: { minItems: 2, maxItems: 4 } },
                { type: 'bottom_nav', required: true, order: 4 }
            ],
            hasBottomNav: true,
            hasBottomCTA: false
        }
    };

    const rule = structureRules[screenType as keyof typeof structureRules] || structureRules.dashboard;

    return {
        layout: 'dashboard',
        sections: rule.sections,
        hasBottomNav: rule.hasBottomNav,
        hasBottomCTA: rule.hasBottomCTA
    };
}

// DATA GENERATION WITH INDUSTRY KNOWLEDGE
export async function generateData(intent: IntentResult, structure: StructureResult, userInput: string): Promise<DataResult> {
    const { geminiModel } = await import("@/config/gemini");

    const buildDataPrompt = (intent: IntentResult, structure: StructureResult, userInput: string): string => {
        const sectionsNeeded = structure.sections
            .map(s => `- ${s.type}: ${s.constraints.minItems ? `min ${s.constraints.minItems} items` : 'content required'}`)
            .join('\n');

        const industryKnowledge = INDUSTRY_KNOWLEDGE_BASE[intent.domain as keyof typeof INDUSTRY_KNOWLEDGE_BASE];

        return `
You are an INDUSTRY-LEVEL Content Generator with deep domain expertise.
Generate REALISTIC, AUTHENTIC content that would pass professional review in the ${intent.domain} industry.

USER REQUEST: ${userInput}
SCREEN TYPE: ${intent.screenType}
USER GOAL: ${intent.userGoal}

DOMAIN EXPERTISE ANALYSIS:
- Domain: ${intent.domain} (${industryKnowledge ? 'Industry Knowledge Available' : 'General Knowledge'})
- Business Model: ${intent.context.businessModel}
- Primary Entities: ${intent.context.primaryEntities.join(', ')}
- Key Actions: ${intent.context.keyActions.join(', ')}
- Industry Standards: ${industryKnowledge?.industry_standards?.join(', ') || 'Standard compliance'}

${industryKnowledge ? `
INDUSTRY KNOWLEDGE BASED ON ${intent.domain.toUpperCase()}:
Competitors: ${industryKnowledge.competitors.join(', ')}
Market Positioning: ${industryKnowledge.market_positioning}
Pricing Strategies: ${industryKnowledge.pricing_strategies.join(', ')}

REALISTIC ${intent.domain.toUpperCase()} DATA PATTERNS:
${intent.domain === 'car rental' ? `
Vehicle Classes: ${Object.keys(industryKnowledge.vehicle_classes).join(', ')}
Pricing Examples: Economy $35/day, Compact $45/day, SUV $85/day
Features: ${industryKnowledge.features.slice(0, 3).join(', ')}
Terminology: ${industryKnowledge.terminology.rental.slice(0, 3).join(', ')}
` : intent.domain === 'food delivery' ? `
Restaurant Categories: ${Object.keys(industryKnowledge.restaurant_categories).join(', ')}
Pricing Examples: Delivery Fee $1.99, Service Fee $1.49, Minimum Order $8
Features: ${industryKnowledge.features.slice(0, 3).join(', ')}
Terminology: ${industryKnowledge.terminology.order.slice(0, 3).join(', ')}
` : 'Using general industry patterns'}
` : 'Using general knowledge patterns'}

SECTIONS TO FILL:
${sectionsNeeded}

🚨 CRITICAL QUALITY STANDARDS:
1. NO PLACEHOLDERS: Absolutely no "Lorem ipsum", "Item 1", "Test", "Example"
2. INDUSTRY ACCURACY: All content must be factually plausible for ${intent.domain} industry
3. REALISTIC PRICING: Use actual market rates, not arbitrary numbers
4. AUTHENTIC TERMINOLOGY: Use industry-standard vocabulary and phrasing
5. PROFESSIONAL TONE: Maintain credible, business-appropriate communication
6. COMPETITIVE INTELLIGENCE: Include features that differentiate from market leaders

${industryKnowledge ? `INDUSTRY-SPECIFIC EXAMPLES FOR ${intent.domain.toUpperCase()}:
${intent.domain === 'car rental' ? `
- Vehicles: Toyota Camry ($45/day), Honda CR-V ($42/day), BMW 3 Series ($95/day)
- Features: Unlimited Miles, Free Cancellation, GPS Navigation, Insurance Coverage
- Actions: Book Now, Reserve Vehicle, Check Availability, Select Pickup Location
- Pricing: Daily rates $35-150, Weekly packages available, Insurance extra $15-35/day
` : intent.domain === 'food delivery' ? `
- Restaurants: Pizza Palace (Italian, 4.8★), Burger King (Fast Food, 4.5★), Sushi Express (Japanese, 4.7★)
- Features: Real-time tracking, 25-35 min delivery, Contactless payment
- Actions: Place Order, Track Delivery, Rate Service, Customize Order
- Pricing: Delivery $0.99-$3.99, Service fee $0.99-$2.99, Minimum order $5-15
` : 'Using general industry examples'}` : 'Using general examples'}

OUTPUT JSON:
{
  "screenTitle": "${getIndustrySpecificTitle(intent.domain, intent.screenType)}",
  "screenSubtitle": "${getIndustrySpecificSubtitle(intent.domain, intent.context)}",
  "sections": [
    ${generateIndustrySpecificSections(intent, structure)}
  ]
}

Return ONLY valid JSON.
        `;
    };

    const prompt = buildDataPrompt(intent, structure, userInput);

    const result = await geminiModel.generateContent({
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }]
            }
        ],
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
        },
    });

    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    return {
        screenTitle: parsed.screenTitle || 'Welcome',
        screenSubtitle: parsed.screenSubtitle,
        sections: parsed.sections || []
    };
}

// VALIDATION LAYER
export function validateData(data: DataResult, structure: StructureResult): ValidationResult {
    const errors = [];

    // 1. Validate screen title
    if (!data.screenTitle || isPlaceholder(data.screenTitle)) {
        errors.push({ section: 'root', field: 'screenTitle', message: 'Screen title missing or placeholder', severity: 'error' });
    }

    // 2. Validate each section
    for (const sectionDef of structure.sections) {
        const sectionData = data.sections.find(s => s.sectionType === sectionDef.type);

        if (sectionDef.required && !sectionData) {
            errors.push({ section: sectionDef.type, field: 'section', message: `Required section "${sectionDef.type}" missing`, severity: 'error' });
            continue;
        }
        if (!sectionData) continue;

        // Check minimum items
        if (sectionDef.constraints.minItems && (!sectionData.items || sectionData.items.length < sectionDef.constraints.minItems)) {
            errors.push({ section: sectionDef.type, field: 'items', message: `Need ${sectionDef.constraints.minItems} items, got ${sectionData.items?.length || 0}`, severity: 'error' });
        }

        // Check for placeholders
        for (const item of sectionData.items || []) {
            if (isPlaceholder(item.title)) {
                errors.push({ section: sectionDef.type, field: `item.title`, message: `Placeholder: "${item.title}"`, severity: 'warning' });
            }
        }
    }

    const hasErrors = errors.some(e => e.severity === 'error');
    return { isValid: !hasErrors, errors, sanitizedData: data };
}

function isPlaceholder(text: string): boolean {
    if (!text) return false;
    const placeholderPatterns = [
        /lorem ipsum/i, /sample text/i, /placeholder/i, /^item\s*\d+$/i,
        /^user\s*name$/i, /^xx+$/i, /^test\s*\d*$/i, /^example/i,
    ];
    return placeholderPatterns.some(pattern => pattern.test(text.trim()));
}

// INDUSTRY-SPECIFIC HELPERS
function getIndustrySpecificTitle(domain: string, screenType: string): string {
    const titles: Record<string, Record<string, string>> = {
        'car rental': {
            dashboard: 'Professional Car Rental Dashboard',
            listing_grid: 'Browse Available Vehicles',
            detail_view: 'Vehicle Details & Booking',
            booking_form: 'Complete Your Reservation'
        },
        'food delivery': {
            dashboard: 'Food Delivery Dashboard',
            listing_grid: 'Browse Restaurants',
            detail_view: 'Restaurant Details & Menu',
            booking_form: 'Complete Your Order'
        },
        'dating app': {
            dashboard: 'Discover New Connections',
            listing_grid: 'Browse Profiles',
            detail_view: 'Profile Details',
            booking_form: 'Start Your Journey'
        },
        'hotel booking': {
            dashboard: 'Hotel Booking Dashboard',
            listing_grid: 'Browse Properties',
            detail_view: 'Property Details & Amenities',
            booking_form: 'Complete Your Reservation'
        },
        'job search': {
            dashboard: 'Career Opportunities Dashboard',
            listing_grid: 'Browse Job Openings',
            detail_view: 'Position Details & Company Info',
            booking_form: 'Apply for Position'
        }
    };

    const domainTitles = titles[domain];
    if (domainTitles && domainTitles[screenType]) {
        return domainTitles[screenType];
    }

    return `${domain} ${screenType}`;
}

function getIndustrySpecificSubtitle(domain: string, context?: any): string {
    const subtitles: Record<string, string> = {
        'car rental': 'Professional vehicle rental with competitive rates and flexible booking options',
        'food delivery': 'Order from top restaurants with real-time tracking and delivery',
        'dating app': 'Connect with like-minded people through intelligent matching algorithms',
        'hotel booking': 'Book your perfect stay with competitive rates and premium amenities',
        'job search': 'Find your dream job with AI-powered matching and career insights'
    };

    return subtitles[domain] || `Professional ${domain} platform with industry-leading features`;
}

function generateIndustrySpecificSections(intent: IntentResult, structure: StructureResult): string {
    const industry = INDUSTRY_KNOWLEDGE_BASE[intent.domain as keyof typeof INDUSTRY_KNOWLEDGE_BASE];

    return structure.sections.map(section => {
        const sectionConfig = getSectionConfig(intent.domain, section.type);
        return `
    {
      "sectionType": "${section.type}",
      "heading": "${sectionConfig.heading}",
      "items": ${JSON.stringify(sectionConfig.items)}
    }`;
    }).join(',\n');
}

function getSectionConfig(domain: string, sectionType: string): any {
    const configs: Record<string, Record<string, any>> = {
        'car rental': {
            listing_grid: {
                heading: 'Available Vehicles',
                items: [
                    { id: '1', title: 'Toyota Camry', subtitle: 'Automatic • 2023 • 15K miles', value: '$45/day', icon: 'lucide:car', badge: 'Popular' },
                    { id: '2', title: 'Honda CR-V', subtitle: 'Automatic • 2022 • 12K miles', value: '$42/day', icon: 'lucide:car' },
                    { id: '3', title: 'Ford Explorer', subtitle: '4WD • 2023 • 8K miles', value: '$65/day', icon: 'lucide:car' },
                    { id: '4', title: 'BMW 3 Series', subtitle: 'Luxury • 2023 • 5K miles', value: '$95/day', icon: 'lucide:car', badge: 'Premium' }
                ]
            },
            booking_form: {
                heading: 'Complete Your Reservation',
                items: [
                    { id: '1', title: 'Pickup Location', subtitle: 'Choose your preferred pickup location', icon: 'lucide:map-pin' },
                    { id: '2', title: 'Rental Period', subtitle: 'Select your rental duration', icon: 'lucide:calendar' },
                    { id: '3', title: 'Insurance Options', subtitle: 'Protect yourself with coverage', icon: 'lucide:shield' }
                ]
            }
        },
        'food delivery': {
            listing_grid: {
                heading: 'Popular Restaurants',
                items: [
                    { id: '1', title: 'Pizza Palace', subtitle: 'Italian • 4.8★ • 25-35 min', value: 'Free delivery', icon: '🍕', badge: 'Top Rated' },
                    { id: '2', title: 'Burger King', subtitle: 'Fast Food • 4.5★ • 15-25 min', value: '$2.99 delivery', icon: '🍔' },
                    { id: '3', title: 'Sushi Express', subtitle: 'Japanese • 4.7★ • 30-40 min', value: '$3.99 delivery', icon: '🍱' },
                    { id: '4', title: 'Taco Bell', subtitle: 'Mexican • 4.6★ • 20-30 min', value: '$1.99 delivery', icon: '🌮' }
                ]
            }
        }
    };

    const domainConfig = configs[domain];
    if (domainConfig && domainConfig[sectionType]) {
        return domainConfig[sectionType];
    }

    return { heading: `Available ${sectionType}`, items: [] };
}

// MAIN PIPELINE EXECUTOR
export async function generateUI(input: any): Promise<any> {
    try {
        // 1. Intent Analysis
        const intent = await analyzeIntent(input.userInput || input);

        // 2. Structure Generation
        const structure = generateStructure(intent);

        // 3. Data Generation
        const data = await generateData(intent, structure, input.userInput || input);

        // 4. Validation
        const validation = validateData(data, structure);

        return {
            success: validation.isValid,
            intent,
            structure,
            data: validation.sanitizedData,
            validation,
            debug: {
                intent,
                structure,
                data,
                validation
            }
        };
    } catch (error) {
        console.error('UI Generation Pipeline Error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            debug: { error }
        };
    }
}