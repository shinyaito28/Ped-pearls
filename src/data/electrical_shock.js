// Source: Pediatric Anesthesia Pearls 2021, Electrical Counter Shock panel (image IMG_0063).

export const electricalShockProtocols = [
    {
        id: 'defib',
        title: 'Biphasic Defibrillation',
        description: 'Pulseless VT / VF',
        first: 2,   // J/kg
        next: 4,    // J/kg
        formulaText: 'First shock 2 J/kg, then escalate to 4 J/kg (and beyond).',
        max: 200    // adult cap as J reference
    },
    {
        id: 'cardioversion',
        title: 'Synchronized Cardioversion',
        description: 'SVT / unstable VT with a pulse',
        first: 0.5,
        next: 1,
        formulaText: 'Start at 0.5 J/kg; if ineffective escalate to 1 J/kg.',
        max: 100
    }
];
