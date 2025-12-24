/**
 * Adventure Data Configuration
 * ============================
 * Edit this file to customize your adventure!
 */

const ADVENTURE_DATA = {
    title: "What Drink Are You?",
    
    // Define the value categories that will be tracked
    // Each category is a spectrum centered at 0
    // Negative values = left trait, Positive values = right trait
    // Range: -10 to +10
    valueCategories: [
        { id: 'style', labelLeft: 'Planner', labelRight: 'Spontaneous', minValue: -10, maxValue: 10 },
        { id: 'risk', labelLeft: 'Safety', labelRight: 'Growth', minValue: -10, maxValue: 10 },
        { id: 'valueFocus', labelLeft: 'Tangible', labelRight: 'Experience', minValue: -10, maxValue: 10 },
        { id: 'integration', labelLeft: 'Separate', labelRight: 'Shared', minValue: -10, maxValue: 10 }
    ],
    
    // Define all scenes/screens in your adventure
    scenes: {
        start: {
            id: 'start',
            image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80',
            text: 'Your group chat is buzzing! 🎉 Your friends want to plan an adventure together. Everyone\'s throwing out ideas. How do you jump in?',
            choices: [
                {
                    text: 'I\'ve already researched some options — let me share a spreadsheet',
                    values: { style: -3, risk: -1, valueFocus: 0, integration: 0 },
                    nextScene: 'pick_destination'
                },
                {
                    text: 'Let\'s just pick something and GO! We can figure it out on the way',
                    values: { style: +3, risk: +2, valueFocus: +1, integration: 0 },
                    nextScene: 'pick_destination'
                },
                {
                    text: 'I\'ll go along with whatever the group decides — I\'m just happy to hang',
                    values: { style: 0, risk: -2, valueFocus: 0, integration: 0 },
                    nextScene: 'pick_destination'
                },
                {
                    text: 'Actually, I was thinking of doing my own thing this weekend...',
                    values: { style: +1, risk: +1, valueFocus: 0, integration: 0 },
                    nextScene: 'convinced'
                }
            ]
        },
        
        convinced: {
            id: 'convinced',
            image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
            text: 'Your friends weren\'t having it. After a barrage of texts, memes, and one very persuasive voice note, you\'ve been convinced to join. How are you feeling about it?',
            choices: [
                {
                    text: 'Fine, fine... I\'m in. But I\'m not planning anything!',
                    values: { style: +1, risk: 0, valueFocus: 0, integration: 0 },
                    nextScene: 'pick_destination'
                },
                {
                    text: 'Okay okay, you got me. Let\'s make this fun!',
                    values: { style: +1, risk: +1, valueFocus: +1, integration: 0 },
                    nextScene: 'pick_destination'
                }
            ]
        },
        
        pick_destination: {
            id: 'pick_destination',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
            text: 'Time to pick a destination! Everyone\'s throwing out ideas with very different price tags. What catches your eye?',
            choices: [
                {
                    text: '🥂 Champagne Springs — bougie shopping and sparkling vibes!',
                    values: { style: -1, risk: +1, valueFocus: -3, integration: 0 },
                    nextScene: 'book_tickets'
                },
                {
                    text: '🧊 Frozen Daiquiri Bay — penguin watching in the polar ice!',
                    values: { style: -2, risk: +3, valueFocus: +2, integration: 0 },
                    nextScene: 'book_tickets'
                },
                {
                    text: '🥤 Soda Pop Park — local thrills, easy on the wallet!',
                    values: { style: +2, risk: -2, valueFocus: +1, integration: 0 },
                    nextScene: 'book_tickets'
                },
                {
                    text: '🍵 Matcha Mountain — nature trails and chill vibes',
                    values: { style: 0, risk: 0, valueFocus: +1, integration: 0 },
                    nextScene: 'book_tickets'
                }
            ]
        },
        
        book_tickets: {
            id: 'book_tickets',
            image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
            text: 'Destination locked in! ✈️ Now someone needs to book the tickets. How do you handle it?',
            choices: [
                {
                    text: 'I\'ll book for everyone — easier if one person handles it',
                    values: { style: -2, risk: +1, valueFocus: 0, integration: +3 },
                    nextScene: 'friend_needs_help'
                },
                {
                    text: 'Everyone book your own — I don\'t want to chase people for money',
                    values: { style: +1, risk: -1, valueFocus: 0, integration: -3 },
                    nextScene: 'margarita_surprise'
                },
                {
                    text: 'Let\'s use a group booking app — split it fairly from the start',
                    values: { style: -2, risk: -1, valueFocus: 0, integration: +2 },
                    nextScene: 'friend_needs_help'
                },
                {
                    text: 'Someone else can handle it — I\'ll just Venmo when it\'s done',
                    values: { style: +2, risk: 0, valueFocus: 0, integration: +1 },
                    nextScene: 'margarita_surprise'
                }
            ]
        },
        
        friend_needs_help: {
            id: 'friend_needs_help',
            image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80',
            text: 'Uh oh. 🧋 Your friend Boba just texted you privately: "Hey... so my car broke down last week and the repair wiped me out. Any chance you could spot me half the trip cost? I\'ll pay you back eventually, I promise!" What do you do?',
            choices: [
                {
                    text: 'Of course! Don\'t even worry about paying me back — friends help friends',
                    values: { style: +1, risk: +3, valueFocus: 0, integration: +3 },
                    nextScene: 'boba_thanks'
                },
                {
                    text: 'Sure, but let\'s set up a payment plan so we\'re both clear on expectations',
                    values: { style: -3, risk: -1, valueFocus: 0, integration: +2 },
                    nextScene: 'boba_thanks'
                },
                {
                    text: 'That\'s tough... maybe we can find a cheaper activity so everyone can still come?',
                    values: { style: -1, risk: -2, valueFocus: 0, integration: 0 },
                    nextScene: 'boba_thanks'
                },
                {
                    text: 'Hmm I can\'t swing it solo — but have you asked the others? Maybe we can all chip in a little',
                    values: { style: 0, risk: -1, valueFocus: 0, integration: +2 },
                    nextScene: 'boba_thanks'
                }
            ]
        },
        
        boba_thanks: {
            id: 'boba_thanks',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
            text: '🧋 Boba sends you a voice note: "You\'re literally the best. I don\'t know what I\'d do without you. I\'m gonna pay you back, I swear — maybe I\'ll bring you boba every day for a month or something!" How do you feel?',
            choices: [
                {
                    text: 'Honestly, this is what friends are for. No stress!',
                    values: { style: +1, risk: +1, valueFocus: +1, integration: 0 },
                    nextScene: 'margarita_surprise'
                },
                {
                    text: 'I appreciate that! A payment plan would make me feel better though',
                    values: { style: -2, risk: -1, valueFocus: 0, integration: +1 },
                    nextScene: 'margarita_surprise'
                },
                {
                    text: 'Daily boba? Say less, we have a deal 🧋',
                    values: { style: +2, risk: 0, valueFocus: -1, integration: 0 },
                    nextScene: 'margarita_surprise'
                },
                {
                    text: 'Just... don\'t make it weird, okay? We\'re good.',
                    values: { style: 0, risk: -1, valueFocus: 0, integration: 0 },
                    nextScene: 'margarita_surprise'
                }
            ]
        },
        
        margarita_surprise: {
            id: 'margarita_surprise',
            image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
            text: '✨ On the day of the trip, Margarita grabs the wheel and takes a "quick detour." Before anyone can protest, you drive through a shimmering portal and arrive at... THE INFINITE BREW DIMENSION — a mystical realm where every drink that ever existed (and some that shouldn\'t) flows from enchanted fountains. What catches your eye?',
            choices: [
                {
                    text: '🌌 Sip from the Fountain of Forgotten Flavors — taste drinks from parallel timelines',
                    values: { style: +2, risk: +3, valueFocus: +3, integration: 0 },
                    nextScene: 'lottery_ticket'
                },
                {
                    text: '🔮 Buy an Everlasting Goblet — it refills with your perfect drink forever',
                    values: { style: -1, risk: +1, valueFocus: -3, integration: 0 },
                    nextScene: 'lottery_ticket'
                },
                {
                    text: '👀 Just... observe from a safe distance. This place is unregulated!',
                    values: { style: -2, risk: -3, valueFocus: 0, integration: 0 },
                    nextScene: 'lottery_ticket'
                },
                {
                    text: '🎁 Get matching Dimension Bottles for the whole crew — memories AND souvenirs!',
                    values: { style: 0, risk: +1, valueFocus: -2, integration: 0 },
                    nextScene: 'lottery_ticket'
                }
            ]
        },
        
        lottery_ticket: {
            id: 'lottery_ticket',
            image: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800&q=80',
            text: '🎟️ While wandering the glowing streets of the Brew Dimension, you spot something shimmering on the ground. No way... it\'s a winning lottery ticket for 5,000 Brew Bucks! That\'s real interdimensional currency. What do you do?',
            choices: [
                {
                    text: '🎉 Treat everyone in the group — drinks are on me tonight!',
                    values: { style: +2, risk: +2, valueFocus: +2, integration: +3 },
                    nextScene: 'bill_split'
                },
                {
                    text: '💳 Pay off my portion of the trip — finally guilt-free!',
                    values: { style: -1, risk: -1, valueFocus: 0, integration: 0 },
                    nextScene: 'bill_split'
                },
                {
                    text: '📈 Invest it in the Brew Dimension stock market — compound interest, baby',
                    values: { style: -2, risk: +3, valueFocus: -2, integration: -2 },
                    nextScene: 'bill_split'
                },
                {
                    text: '🤫 Pocket it quietly — future me will thank me',
                    values: { style: +1, risk: -2, valueFocus: -1, integration: -3 },
                    nextScene: 'bill_split'
                }
            ]
        },
        
        bill_split: {
            id: 'bill_split',
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
            text: '🧾 Time for dinner! Everyone gathers at the Cosmic Cantina for a fancy feast. The Nebula Nachos and Stardust Sliders were amazing... but then the check arrives. Aperol Spritz 🍊 ordered the Grand Aurora Tasting Flight AND the Diamond Dust Dessert Platter. Their tab is 3x everyone else\'s. How do you handle it?',
            choices: [
                {
                    text: '➗ Split it evenly — it\'s just easier, let\'s not make it weird',
                    values: { style: +2, risk: 0, valueFocus: 0, integration: +2 },
                    nextScene: 'hotel_upgrade'
                },
                {
                    text: '🧮 Everyone pays for what they ordered — that\'s only fair',
                    values: { style: -2, risk: -1, valueFocus: 0, integration: -3 },
                    nextScene: 'hotel_upgrade'
                },
                {
                    text: '🎰 I\'ll cover the whole thing with my lottery winnings — big winner energy!',
                    values: { style: +3, risk: +2, valueFocus: +1, integration: +3 },
                    nextScene: 'hotel_upgrade'
                },
                {
                    text: '💬 Quietly mention to Aperol Spritz 🍊 that maybe they should chip in a bit more...',
                    values: { style: -1, risk: -2, valueFocus: 0, integration: 0 },
                    nextScene: 'hotel_upgrade'
                }
            ]
        },
        
        hotel_upgrade: {
            id: 'hotel_upgrade',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            text: '🏨 Back at the Nebula Inn, the front desk waves you over. "Good news! We have an upgrade available for your room — stunning views of the Aurora Fountains! Just 50 Brew Bucks. OR you can have this limited edition Brew Dimension snow globe instead, no charge." What do you pick?',
            choices: [
                {
                    text: '🏔️ Upgrade the room! Those views are once in a lifetime',
                    values: { style: +1, risk: +1, valueFocus: +3, integration: 0 },
                    nextScene: 'sleep_soundly'
                },
                {
                    text: '🔮 Give me that snow globe — I want something to remember this by',
                    values: { style: 0, risk: -1, valueFocus: -3, integration: 0 },
                    nextScene: 'sleep_soundly'
                },
                {
                    text: '💰 Neither — I\'ll keep my Brew Bucks, thanks',
                    values: { style: -1, risk: -2, valueFocus: 0, integration: 0 },
                    nextScene: 'sleep_soundly'
                },
                {
                    text: '👯 Can we upgrade the WHOLE group\'s rooms? I\'ll cover it!',
                    values: { style: +2, risk: +2, valueFocus: +2, integration: +3 },
                    nextScene: 'sleep_soundly'
                }
            ]
        },
        
        sleep_soundly: {
            id: 'sleep_soundly',
            image: 'https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?w=800&q=80',
            text: '😴 You sink into the impossibly soft Nebula Inn bed. The sheets smell like lavender and stardust. Outside your window, the Aurora Fountains shimmer softly. It\'s been quite an adventure... You drift off thinking about...',
            choices: [
                {
                    text: '💭 All the memories we made together',
                    values: { style: 0, risk: 0, valueFocus: +1, integration: +1 },
                    nextScene: { random: [{ scene: 'breakfast_date', chance: 0.5 }, { scene: 'last_morning', chance: 0.5 }] }
                },
                {
                    text: '💭 Whether I stayed on budget this trip',
                    values: { style: -1, risk: -1, valueFocus: 0, integration: 0 },
                    nextScene: { random: [{ scene: 'breakfast_date', chance: 0.5 }, { scene: 'last_morning', chance: 0.5 }] }
                },
                {
                    text: '💭 When we can come back here again',
                    values: { style: +1, risk: +1, valueFocus: +1, integration: 0 },
                    nextScene: { random: [{ scene: 'breakfast_date', chance: 0.5 }, { scene: 'last_morning', chance: 0.5 }] }
                },
                {
                    text: '💭 Nothing — you\'re asleep in 3 seconds flat',
                    values: { style: +1, risk: 0, valueFocus: 0, integration: 0 },
                    nextScene: { random: [{ scene: 'breakfast_date', chance: 0.5 }, { scene: 'last_morning', chance: 0.5 }] }
                }
            ]
        },
        
        breakfast_date: {
            id: 'breakfast_date',
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
            text: '🚪 *knock knock* Just as you\'re drifting off, there\'s a soft tap at your door. You stumble over and open it to find Cappuccino ☕ standing there in the dim hallway, looking nervous, fidgeting with their sleeve. "Hey... sorry, I hope I didn\'t wake you... I just— I\'ve been wanting to ask you something all trip and I couldn\'t sleep." They take a breath. "Would you maybe want to grab breakfast with me tomorrow? Just the two of us? There\'s this place that makes Stardust Pancakes and I thought..." They trail off, cheeks flushing.',
            choices: [
                {
                    text: '💕 I\'d love that! I was hoping you\'d ask, honestly...',
                    values: { style: +2, risk: +2, valueFocus: +2, integration: +2 },
                    nextScene: 'date_scene'
                },
                {
                    text: '😊 That sounds really nice! Let\'s do it — what time?',
                    values: { style: +1, risk: +1, valueFocus: +1, integration: +1 },
                    nextScene: 'date_scene'
                },
                {
                    text: '🤔 Oh! Um... can I think about it? I\'ll text you in the morning?',
                    values: { style: -1, risk: -1, valueFocus: 0, integration: 0 },
                    nextScene: 'morning_decision'
                },
                {
                    text: '😅 That\'s sweet, but I don\'t think I feel the same way...',
                    values: { style: 0, risk: -2, valueFocus: 0, integration: +1 },
                    nextScene: 'last_morning'
                }
            ]
        },
        
        morning_decision: {
            id: 'morning_decision',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
            text: '☀️ You wake up to golden light streaming through the window. Last night\'s conversation with Cappuccino ☕ plays in your mind. Your phone buzzes — it\'s a text from them: "No pressure at all! But if you\'re up for it, I\'ll be at the Stardust Pancake place at 8am. Would love to see you there 💫" You check the time. It\'s 7:45am.',
            choices: [
                {
                    text: '💕 You know what? Yes. Let\'s do this.',
                    values: { style: 0, risk: 0, valueFocus: 0, integration: 0 },
                    nextScene: 'date_scene'
                },
                {
                    text: '📱 Text back: "Sorry, I don\'t think I\'ll be able to make it..."',
                    values: { style: 0, risk: 0, valueFocus: 0, integration: 0 },
                    nextScene: 'last_morning'
                }
            ]
        },
        
        date_scene: {
            id: 'date_scene',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            text: '🥞✨ The Stardust Pancakes are even better than you imagined — fluffy clouds of sweetness that literally sparkle. But honestly, you barely notice the food. You and Cappuccino ☕ end up talking for hours about everything — their dreams of opening a tiny café back home, how they almost didn\'t come on this trip, their weird fear of butterflies. You realize you\'ve known them this whole time but never really *known* them. Time flies. Your phone buzzes — it\'s Margarita 🍹: "Portal opens in 45 min! Where are you??" The waiter slides over the bill. What do you do?',
            choices: [
                {
                    text: '💕 I\'ve got this — it\'s the least I can do for such an amazing morning',
                    values: { style: +1, risk: +1, valueFocus: +2, integration: +2 },
                    nextScene: 'gas_money'
                },
                {
                    text: '🤝 Let\'s split it! This was a proper date, we should go halves',
                    values: { style: 0, risk: 0, valueFocus: 0, integration: +1 },
                    nextScene: 'gas_money'
                },
                {
                    text: '😶 Stay quiet... I mean, they did invite me, so technically...',
                    values: { style: +1, risk: -1, valueFocus: -1, integration: -3 },
                    nextScene: 'gas_money'
                },
                {
                    text: '🧮 Let me calculate exactly what I ordered...',
                    values: { style: -2, risk: -1, valueFocus: -1, integration: -5 },
                    nextScene: 'gas_money'
                }
            ]
        },
        
        last_morning: {
            id: 'last_morning',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
            text: '☀️ It\'s your last morning in the Brew Dimension! Golden light streams through the window. The portal home opens in a few hours. What do you do with your final moments here?',
            choices: [
                {
                    text: '🌅 Watch the sunrise from the Aurora Fountains — soak it all in',
                    values: { style: +1, risk: 0, valueFocus: +3, integration: 0 },
                    nextScene: 'gas_money'
                },
                {
                    text: '🛍️ Hit the local markets — last chance for souvenirs!',
                    values: { style: 0, risk: 0, valueFocus: -3, integration: 0 },
                    nextScene: 'gas_money'
                },
                {
                    text: '🧖 Sneak off for a solo spa treatment — I deserve this',
                    values: { style: +1, risk: 0, valueFocus: +1, integration: -3 },
                    nextScene: 'gas_money'
                },
                {
                    text: '📸 Rally the crew for one last group adventure before we go!',
                    values: { style: +1, risk: +1, valueFocus: +2, integration: +2 },
                    nextScene: 'gas_money'
                }
            ]
        },
        
        gas_money: {
            id: 'gas_money',
            image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
            text: '🚗 You\'re finally home! What a trip. As everyone grabs their bags, Boba 🧋 speaks up: "Hey, should we all chip in for Margarita\'s gas? They drove the whole way through that interdimensional portal..." How do you respond?',
            choices: [
                {
                    text: '💸 Absolutely — I\'ll Venmo them right now',
                    values: { style: 0, risk: 0, valueFocus: 0, integration: +3 },
                    nextScene: 'ending'
                },
                {
                    text: '🧮 Yeah, let\'s calculate the exact split per person',
                    values: { style: -2, risk: -1, valueFocus: 0, integration: +2 },
                    nextScene: 'ending'
                },
                {
                    text: '🤷 I figured that was just part of them driving? I didn\'t budget for this...',
                    values: { style: 0, risk: -1, valueFocus: 0, integration: -2 },
                    nextScene: 'ending'
                },
                {
                    text: '🎉 I\'ll cover the whole thing — Margarita made this trip happen!',
                    values: { style: +2, risk: +1, valueFocus: 0, integration: +3 },
                    nextScene: 'ending'
                }
            ]
        },
        
        ending: {
            id: 'ending',
            isEnding: true
        }
    },
    
    // ==========================================
    // DRINK RESULTS - MBTI Style (16 types)
    // ==========================================
    // 4 binary traits = 16 combinations
    // style: -10=Planner, +10=Spontaneous
    // risk: -10=Safety, +10=Growth
    // valueFocus: -10=Tangible, +10=Experience
    // integration: -10=Separate, +10=Shared
    
    results: [
        // === PLANNER + SAFETY ===
        {
            id: 'coldbrew',
            title: 'Cold Brew Coffee ☕',
            description: 'Wakes at 5:47am because sleeping in is for people without goals. Has a spreadsheet tracking spreadsheets. Found $20 on the sidewalk once — deposited it, categorized it as "windfall income," adjusted Q3 projections. Still wearing the same hoodie from 2018 because replacing it wasn\'t in the budget. Will die alone but financially prepared for it.',
            image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
            targets: { style: -10, risk: -10, valueFocus: -10, integration: -10 },
            compatibility: {
                drinks: ['smoothie', 'matcha', 'vietnamese'],
                description: 'Early risers who respect the sanctity of routine. Smoothie appreciates the meal prep discipline, Matcha latte understands the quiet morning ritual, Vietnamese iced coffee shares the intense focus. They communicate via shared Google Calendars and never show up late.'
            }
        },
        {
            id: 'smoothie',
            title: 'Smoothie 🥤',
            description: 'Has unironically said "let\'s run the numbers" at brunch. Created a Costco membership ROI analysis and sent it to the group chat — nobody asked. Tax refund hits? Already in 47 labeled envelopes before the direct deposit clears. Hosts meal prep Sundays and WON\'T stop talking about cost-per-serving. Made a Google Form for their own birthday party.',
            image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80',
            targets: { style: -10, risk: -10, valueFocus: -10, integration: +10 },
            compatibility: {
                drinks: ['coldbrew', 'chai', 'boba'],
                description: 'The practical planners who actually follow through. Cold brew coffee provides the structure, Chai latte brings the warmth to spreadsheet sessions, Boba tea adds strategic fun. They split Costco memberships and genuinely enjoy optimizing group purchases together.'
            }
        },
        {
            id: 'matcha',
            title: 'Matcha Latte 🍵',
            description: 'Has been to the same Airbnb 4 years in a row because "the energy is right." Grandma\'s birthday money? Already mentally spent on a silent meditation retreat. Alone. Obviously. Has achieved enlightenment through automated bill payments. Journals at 6:30am SHARP — if you text before 9am you\'re blocked spiritually.',
            image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=80',
            targets: { style: -10, risk: -10, valueFocus: +10, integration: -10 },
            compatibility: {
                drinks: ['coldbrew', 'chai', 'kombucha'],
                description: 'The intentional introverts who value depth over breadth. Cold brew coffee respects the boundaries, Chai latte offers cozy one-on-one hangs, Kombucha gets the solo journey thing. They text rarely but meaningfully, usually about book recommendations.'
            }
        },
        {
            id: 'chai',
            title: 'Chai Latte 🫖',
            description: 'Made a 47-slide presentation for a weekend trip nobody agreed to yet. Work bonus? Immediately throws a dinner party with assigned seating and a Spotify playlist organized by "vibe arc." WILL Venmo request you for the wine but the note says "love you 💕" so you can\'t be mad. Has hosted a "casual game night" that required an RSVP form.',
            image: 'https://images.unsplash.com/photo-1578899952107-9c390f1af1c7?w=800&q=80',
            targets: { style: -10, risk: -10, valueFocus: +10, integration: +10 },
            compatibility: {
                drinks: ['smoothie', 'matcha', 'boba'],
                description: 'The warm organizers who make everyone feel included. Smoothie helps with the logistics, Matcha latte brings the depth, Boba tea adds the adventure. They\'re the glue of friend groups, planning everything from game nights to group vacations.'
            }
        },
        
        // === PLANNER + GROWTH ===
        {
            id: 'vietnamese',
            title: 'Vietnamese Iced Coffee 🇻🇳',
            description: 'Set 14 price alerts for one flight. Booked at 2:47am when it dropped $23. Cashback rewards? Hoarded for 9 months to fund some certification nobody understands. Eats lunch alone on purpose, reading industry reports for fun. Has described small talk as "an inefficient use of cognitive resources." Terrifying but probably a millionaire by 40.',
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
            targets: { style: -10, risk: +10, valueFocus: -10, integration: -10 },
            compatibility: {
                drinks: ['coldbrew', 'kombucha', 'oldfashioned'],
                description: 'The intense solo operators who don\'t need external validation. Cold brew coffee matches the discipline, Kombucha shares the research obsession, Old Fashioned respects the quiet confidence. They rarely hang out but deeply respect each other\'s grind.'
            }
        },
        {
            id: 'thaitea',
            title: 'Thai Iced Tea 🧡',
            description: 'Booked the group trip 11 months ago. Has backup hotels. Fronted the Airbnb and the receipt has COLORS. Grandma\'s inheritance? Taking the whole crew to Thailand but everyone WILL see the daily budget breakdown. Sent 47 messages about flight times, apologized for "being extra," then sent 12 more. Unhinged but beloved.',
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80',
            targets: { style: -10, risk: +10, valueFocus: -10, integration: +10 },
            compatibility: {
                drinks: ['smoothie', 'chai', 'moscowmule'],
                description: 'The sweet organizers who make group adventures actually happen. Smoothie handles the budget spreadsheet, Chai latte adds the themed playlists, Moscow Mule brings the spontaneous energy. They\'re the reason friend groups actually take that trip instead of just talking about it.'
            }
        },
        {
            id: 'kombucha',
            title: 'Kombucha 🫧',
            description: 'Has a "sabbatical fund" for a job they haven\'t quit yet. Currently researching a fermented wellness retreat in Iceland. Alone. Because "true growth happens in solitude" — their words, not mine. Read 73 articles about cold plunges, hasn\'t done one yet, will absolutely talk about it for 45 minutes.',
            image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=800&q=80',
            targets: { style: -10, risk: +10, valueFocus: +10, integration: -10 },
            compatibility: {
                drinks: ['matcha', 'vietnamese', 'espressomartini'],
                description: 'The experimental loners who thrive on the unconventional path. Matcha latte provides peaceful understanding, Vietnamese iced coffee shares the intensity, Espresso Martini matches the chaos but different flavors. They exchange niche articles at 2am and never judge.'
            }
        },
        {
            id: 'boba',
            title: 'Boba Tea 🧋',
            description: 'Has 47 restaurant recommendations but will interrogate you about "the vibe you\'re going for" first. Random $12 Venmo refund? Already texting the group about that new night market. Has loyalty apps for places that closed 2 years ago. Thursday nights are "sacred" and also suspiciously optimized for happy hour pricing. Fun AND economical. Annoying AND correct.',
            image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&q=80',
            targets: { style: -10, risk: +10, valueFocus: +10, integration: +10 },
            compatibility: {
                drinks: ['smoothie', 'chai', 'margarita'],
                description: 'The social optimizers who turn everything into an experience. Smoothie helps track the rewards points, Chai latte plans the perfect hangout spot, Margarita brings the spontaneous energy. They have a rotating schedule of new places and everyone\'s invited.'
            }
        },
        
        // === SPONTANEOUS + SAFETY ===
        {
            id: 'cappuccino',
            title: 'Cappuccino ☕',
            description: 'Booked a flight once because "the price felt right" — has no memory of researching it. Found $3 in quarters, treated it like a spiritual sign to get coffee. Spent 6 months "thinking about" an espresso machine, bought it at 11pm on a Tuesday. Reads headlines at cafes alone, absorbs nothing, vibes immaculately. Chaotic but stable.',
            image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80',
            targets: { style: +10, risk: -10, valueFocus: -10, integration: -10 },
            compatibility: {
                drinks: ['sparklinglemonade', 'hotchocolate', 'aperolspritz'],
                description: 'The comfortable spontaneous types who don\'t overthink it. Sparkling lemonade matches the easy-going energy, Hot chocolate shares the solo contentment, Aperol Spritz adds light social fun. They meet up without planning and it somehow always works out.'
            }
        },
        {
            id: 'sparklinglemonade',
            title: 'Sparkling Lemonade 🍋',
            description: 'Says "let\'s just go!" but also knows exactly where the ATM is. Will front brunch, but their phone is READY for that Venmo request. Uncle left them money? Paid off everyone\'s small debts, put the rest in a high-yield savings account, told nobody. Spontaneous within guardrails. Adventurous but has definitely checked their bank balance first.',
            image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=800&q=80',
            targets: { style: +10, risk: -10, valueFocus: -10, integration: +10 },
            compatibility: {
                drinks: ['cappuccino', 'chai', 'aperolspritz'],
                description: 'The reliable fun-bringers who keep it light and inclusive. Cappuccino provides the chill energy, Chai latte adds just enough structure, Aperol Spritz matches the breezy vibe. They\'re the friends who suggest last-minute beach trips and everyone says yes.'
            }
        },
        {
            id: 'hotchocolate',
            title: 'Hot Chocolate 🍫',
            description: 'Disappears for 3 days, comes back with "the best hole-in-the-wall spot." Where? Won\'t say. Work bonus hits? Already on a flight somewhere warm. Told nobody. No itinerary. Phone on airplane mode "for the vibes." Returns refreshed with stories they\'ll never share because posting is for people who need validation.',
            image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800&q=80',
            targets: { style: +10, risk: -10, valueFocus: +10, integration: -10 },
            compatibility: {
                drinks: ['cappuccino', 'matcha', 'aperolspritz'],
                description: 'The cozy solo adventurers who recharge alone. Cappuccino gets the spontaneous solitude, Matcha latte respects the introspection, Aperol Spritz occasionally pulls them out for low-key hangs. They text "just got back from a random weekend trip" with zero photos and nobody\'s surprised.'
            }
        },
        {
            id: 'aperolspritz',
            title: 'Aperol Spritz 🍊',
            description: 'Shows up to dinner having "totally forgotten" plans were made. Happy to split whatever — genuinely doesn\'t care. Birthday money? Threw a rooftop hangout with string lights that just "appeared." No idea where they came from. Has European vacation energy on a Trader Joe\'s budget. Makes you feel chill just by existing.',
            image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800&q=80',
            targets: { style: +10, risk: -10, valueFocus: +10, integration: +10 },
            compatibility: {
                drinks: ['sparklinglemonade', 'hotchocolate', 'margarita'],
                description: 'The effortless socializers who make everything feel easy. Sparkling lemonade shares the practical fun approach, Hot chocolate provides occasional quiet depth, Margarita amps up the energy when needed. They\'re the friends who somehow know everyone at the party.'
            }
        },
        
        // === SPONTANEOUS + GROWTH ===
        {
            id: 'oldfashioned',
            title: 'Old Fashioned 🥃',
            description: 'Booked a solo trip on a Tuesday. At work. During a meeting. Just... left. Picks up the check without asking, never mentions it, gets slightly offended if you try to Venmo. Found an old savings bond? Disappeared for 3 weeks. Where? Unclear. Stories? Maybe, if you earn them. Photos? Absolutely not.',
            image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
            targets: { style: +10, risk: +10, valueFocus: -10, integration: -10 },
            compatibility: {
                drinks: ['vietnamese', 'espressomartini', 'moscowmule'],
                description: 'The bold decision-makers who move in silence. Vietnamese iced coffee respects the focus, Espresso Martini matches the intensity, Moscow Mule occasionally joins for calculated chaos. They don\'t text much but when they meet up it\'s always memorable.'
            }
        },
        {
            id: 'moscowmule',
            title: 'Moscow Mule 🫚',
            description: 'Suggested that "risky" restaurant. Fronted the reservation. It was incredible OR food poisoning — either way, memorable. Tax refund? Bought 6 plane tickets before asking if anyone was free. "We\'ll figure it out" — somehow, they always do. Makes "let\'s just book it" sound reasonable. Dangerous but right more often than not.',
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
            targets: { style: +10, risk: +10, valueFocus: -10, integration: +10 },
            compatibility: {
                drinks: ['thaitea', 'oldfashioned', 'margarita'],
                description: 'The balanced risk-takers who bring the crew along. Thai iced tea handles the planning, Old Fashioned adds the quiet confidence, Margarita matches the adventure energy. They\'re the ones suggesting "let\'s just book it" and then actually making it happen.'
            }
        },
        {
            id: 'espressomartini',
            title: 'Espresso Martini 🍸',
            description: 'Booked a flight at 11pm. Left at 6am. Told nobody. Credit card points hit? Immediately converted to the most unhinged solo adventure possible. Skydiving in Nepal? Already packed, already boarding. Phone\'s been on airplane mode for 3 days. Probably fine. Definitely alive. Will resurface with a tattoo and no explanation.',
            image: 'https://images.unsplash.com/photo-1545438102-799c3991ffb2?w=800&q=80',
            targets: { style: +10, risk: +10, valueFocus: +10, integration: -10 },
            compatibility: {
                drinks: ['kombucha', 'oldfashioned', 'margarita'],
                description: 'The unhinged solo operators who thrive on chaos. Kombucha shares the experimental mindset, Old Fashioned respects the conviction, Margarita occasionally pulls them into group shenanigans. They make decisions nobody else would and somehow it works out.'
            }
        },
        {
            id: 'margarita',
            title: 'Margarita 🍹',
            description: 'Showed up with no plan, bought a round, suggested karaoke — it\'s Tuesday. Fronted a vacation rental for 12 people without checking their bank account. Bonus check? Already spent on an impromptu beach weekend. Somehow broke even. Nobody knows how. Turns random Tuesdays into stories you\'ll tell for 10 years. Financially questionable. Spiritually essential.',
            image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80',
            targets: { style: +10, risk: +10, valueFocus: +10, integration: +10 },
            compatibility: {
                drinks: ['boba', 'aperolspritz', 'moscowmule'],
                description: 'The social maximizers who turn everything into a party. Boba tea brings the strategic optimization, Aperol Spritz adds the effortless vibe, Moscow Mule matches the adventure energy. They\'re the reason the group chat has 847 unread messages and everyone\'s okay with it.'
            }
        }
    ]
};

