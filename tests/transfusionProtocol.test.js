import { describe, it, expect } from 'vitest';
import {
    txaDose, txaIndication, bloodPrimePlan, postCpbProductsHighRisk, buildTransfusionPlan
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

describe('Transfusion — TXA indication (procedure × attending practice)', () => {
    it('routine attending → TXA always indicated', () => {
        const r = txaIndication({ procedureId: 'other', txaPractice: 'routine', weight: 20 });
        expect(r.indicated).toBe(true);
        expect(r.dose.dose).toBe(400);
    });
    it('selective attending + high-risk procedure → TXA indicated', () => {
        const r = txaIndication({ procedureId: 'norwood', txaPractice: 'selective', weight: 3.2 });
        expect(r.indicated).toBe(true);
        expect(r.dose.dose).toBeCloseTo(64, 1);
    });
    it('selective attending + lower-risk procedure → TXA NOT indicated', () => {
        const r = txaIndication({ procedureId: 'other', txaPractice: 'selective', weight: 20 });
        expect(r.indicated).toBe(false);
        expect(r.dose).toBeNull();
    });
    it('selective attending + arterial switch → TXA indicated', () => {
        const r = txaIndication({ procedureId: 'switch', txaPractice: 'selective', weight: 3.5 });
        expect(r.indicated).toBe(true);
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
        const plan = buildTransfusionPlan({ weight: 3.2, procedureId: 'norwood', txaPractice: 'routine' });
        expect(plan.procedure.highRisk).toBe(true);
        expect(plan.products).not.toBeNull();
    });
    it('Other procedure → no high-risk product plan', () => {
        const plan = buildTransfusionPlan({ weight: 20, procedureId: 'other', txaPractice: 'routine' });
        expect(plan.procedure.highRisk).toBe(false);
        expect(plan.products).toBeNull();
    });
    it('Routine TXA practice → TXA indicated even for lower-risk', () => {
        const plan = buildTransfusionPlan({ weight: 20, procedureId: 'other', txaPractice: 'routine' });
        expect(plan.txa.indicated).toBe(true);
    });
    it('Selective TXA practice + lower-risk → TXA NOT indicated', () => {
        const plan = buildTransfusionPlan({ weight: 20, procedureId: 'other', txaPractice: 'selective' });
        expect(plan.txa.indicated).toBe(false);
    });
});
