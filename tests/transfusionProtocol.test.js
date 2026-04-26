import { describe, it, expect } from 'vitest';
import {
    txaDose, bloodPrimePlan, postCpbProductsHighRisk, buildTransfusionPlan
} from '../src/data/transfusion_protocol';

describe('Transfusion — TXA dose', () => {
    it('20 mg/kg up to 1 g', () => {
        expect(txaDose(10).dose).toBe(200);
        expect(txaDose(10).capped).toBe(false);
        expect(txaDose(60).dose).toBe(1000);
        expect(txaDose(60).capped).toBe(true);
    });
    it('returns 0 with no weight', () => {
        expect(txaDose(0).dose).toBe(0);
    });
    it('lists three timing windows', () => {
        expect(txaDose(5).timing.length).toBe(3);
    });
});

describe('Transfusion — blood prime <3 kg', () => {
    it('eligible for 2.5 kg', () => {
        const p = bloodPrimePlan(2.5);
        expect(p.eligible).toBe(true);
        expect(p.primeFFPmL).toBe(50);
        expect(p.warmingFFPmL).toBe(50);
    });
    it('NOT eligible at 3 kg or more', () => {
        expect(bloodPrimePlan(3).eligible).toBe(false);
        expect(bloodPrimePlan(5).eligible).toBe(false);
    });
});

describe('Transfusion — post-CPB high-risk products', () => {
    it('3.2 kg neonate Norwood', () => {
        const p = postCpbProductsHighRisk(3.2);
        expect(p.platelets.mLLow).toBeCloseTo(64, 1);
        expect(p.platelets.mLHigh).toBeCloseTo(128, 1);
        expect(p.cryo.mLLow).toBeCloseTo(32, 1);
        expect(p.ffp.mLLow).toBeCloseTo(16, 1);
        expect(p.rescueAfterRound2.totalMcg).toBeCloseTo(288, 1);
    });
    it('lists rescue factor VII', () => {
        const p = postCpbProductsHighRisk(5);
        expect(p.rescueAfterRound2.product).toMatch(/factor VII/);
        expect(p.rescueAfterRound2.perKgMcg).toBe(90);
    });
});

describe('Transfusion — buildTransfusionPlan classification', () => {
    it('Norwood is high-risk → produces post-CPB product plan', () => {
        const plan = buildTransfusionPlan({ weight: 3.2, caseTypeId: 'norwood' });
        expect(plan.caseType.highRisk).toBe(true);
        expect(plan.products).not.toBeNull();
    });
    it('Other case → no high-risk products', () => {
        const plan = buildTransfusionPlan({ weight: 20, caseTypeId: 'other' });
        expect(plan.caseType.highRisk).toBe(false);
        expect(plan.products).toBeNull();
    });
    it('TXA always provided regardless of case type', () => {
        const plan = buildTransfusionPlan({ weight: 20, caseTypeId: 'other' });
        expect(plan.txa.dose).toBe(400);
    });
});
