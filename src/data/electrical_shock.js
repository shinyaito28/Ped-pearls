// Source: Pediatric Anesthesia Pearls 2021, Electrical Counter Shock panel (image IMG_0063).

export const electricalShockProtocols = [
    {
        id: 'defib',
        title: 'Biphasic Defibrillation',
        titleJa: '二相性除細動',
        description: 'Pulseless VT / VF',
        descriptionJa: '無脈性 VT / VF',
        first: 2,   // J/kg
        next: 4,    // J/kg
        formulaText: 'First shock 2 J/kg, then escalate to 4 J/kg (and beyond).',
        formulaTextJa: '初回ショック 2 J/kg、その後 4 J/kg(以上)へ漸増。',
        max: 200    // adult cap as J reference
    },
    {
        id: 'cardioversion',
        title: 'Synchronized Cardioversion',
        titleJa: '同期式カルディオバージョン',
        description: 'SVT / unstable VT with a pulse',
        descriptionJa: '脈ありの SVT / 不安定 VT',
        first: 0.5,
        next: 1,
        formulaText: 'Start at 0.5 J/kg; if ineffective escalate to 1 J/kg.',
        formulaTextJa: '0.5 J/kg で開始;無効なら 1 J/kg へ漸増。',
        max: 100
    }
];
