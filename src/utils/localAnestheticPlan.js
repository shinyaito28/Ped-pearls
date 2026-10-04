// Unit conversion only. No protocol selection, clinical limits or mixed-drug allowance.
export const localAnestheticNames = ['Lidocaine', 'Bupivacaine', 'Ropivacaine', 'Chloroprocaine'];
export const planRoutes = ['peripheral', 'wound', 'caudal', 'epidural', 'spinal', 'intravenous'];

export const positiveNumber = value => {
    if (typeof value !== 'string' && typeof value !== 'number') return null;
    if (typeof value === 'string' && !value.trim()) return null;
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : null;
};

export const calculateLocalAnestheticPlan = (plan, weight) => {
    const kg = positiveNumber(weight);
    const concentration = positiveNumber(plan.concentration);
    const volume = positiveNumber(plan.volume);
    if (!kg || !concentration || !volume || !localAnestheticNames.includes(plan.drug)
        || !planRoutes.includes(plan.route) || !['single', 'continuous'].includes(plan.mode)
        || !['percent', 'mgPerMl'].includes(plan.concentrationUnit)) return null;
    const mgPerMl = plan.concentrationUnit === 'percent' ? concentration * 10 : concentration;
    const percent = mgPerMl / 10;
    const mg = volume * mgPerMl;
    const mgPerKg = mg / kg;
    if (![mgPerMl, percent, mg, mgPerKg].every(n => Number.isFinite(n) && n > 0)) return null;
    return { mgPerMl, percent, mg, mgPerKg };
};

export const totalLocalAnestheticPlans = plans => {
    const groups = new Map();
    for (const plan of plans) {
        const mg = positiveNumber(plan.mg);
        if (!mg || !localAnestheticNames.includes(plan.drug) || !planRoutes.includes(plan.route)
            || !['single', 'continuous'].includes(plan.mode)) continue;
        const key = `${plan.drug}:${plan.route}:${plan.mode}`;
        const group = groups.get(key) || { drug: plan.drug, route: plan.route, routes: [], mode: plan.mode, mg: 0 };
        if (!group.routes.includes(plan.route)) group.routes.push(plan.route);
        group.mg += mg;
        groups.set(key, group);
    }
    return [...groups.values()].map(group => ({ ...group, mg: Number.isFinite(group.mg) ? group.mg : null }));
};
