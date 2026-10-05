// Adult reference prototype, pending clinical-owner acceptance.
// Single-shot conventional infiltration/minor nerve block only; not a pediatric table.
const society = { title: 'IPSIS LAST protocols (2026), Table 1', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13276539/' };
const review = { title: 'Local anesthetic systemic toxicity: current perspectives (2018), Table 1', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6087022/' };
const label = (title, url) => ({ title, url });

export const adultLocalAnestheticReferences = {
    Bupivacaine: {
        plain: { mgPerKg: 2.5, absoluteMg: 175 }, epi: { mgPerKg: 3, absoluteMg: 225 },
        sources: [society, label('US label, §2.2 adult infiltration table', 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=bb44c7e1-d911-4788-908f-09b7b271969b')],
        basisEn: '2.5 mg/kg plain is a selected value within the IPSIS range, not a universal label rate. 175/225 mg caps: adult infiltration label.',
        basisJa: 'エピなし2.5 mg/kgはIPSISの範囲から選んだ値で、添付文書共通の係数ではありません。175/225 mgは成人浸潤麻酔の添付文書上限。'
    },
    Lidocaine: {
        plain: { mgPerKg: 4.5, absoluteMg: 300 }, epi: { mgPerKg: 7, absoluteMg: 500 },
        sources: [label('US label, §2.6 maximum dosage: normal healthy adults', 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7f202319-effa-4dd8-b871-e720b75f4a83&version=7')],
        basisEn: '4.5/7 mg/kg and 300/500 mg: normal healthy adult label. Epinephrine is not appropriate at every site.',
        basisJa: '4.5/7 mg/kg、300/500 mgは健常成人の添付文書値。エピ使用の適否は投与部位で異なります。'
    },
    Ropivacaine: {
        plain: { mgPerKg: 3, absoluteMg: 200 }, epi: { mgPerKg: 3, absoluteMg: 200 },
        sources: [society, label('US label, §2 adult infiltration/minor-block table; §12.2', 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3763b7b6-da49-4658-b93d-28f5da24d09e')],
        basisEn: '3 mg/kg: IPSIS plain reference; 200 mg: infiltration/minor-block label cap. No epinephrine uplift: label reports no reduction of systemic absorption.',
        basisJa: '3 mg/kgはIPSISのエピなし参考値、200 mgは浸潤・小神経ブロックの添付文書上限。添付文書に全身吸収抑制がないため、エピで上限を増やしません。'
    },
    Chloroprocaine: {
        plain: { mgPerKg: 11, absoluteMg: 800 }, epi: { mgPerKg: 14, absoluteMg: 1000 },
        sources: [label('US label, adult maximum single dose (epinephrine 1:200,000)', 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4305ab6b-6038-9daa-e063-6294a90a018e')],
        basisEn: '11/14 mg/kg and 800/1,000 mg: adult label; epinephrine 1:200,000. The pediatric paragraph is separate.',
        basisJa: '11/14 mg/kg、800/1,000 mgは成人の添付文書値。エピ1:200,000。小児の記載は別条件です。'
    },
    Levobupivacaine: {
        plain: { mgPerKg: 2, absoluteMg: 150 }, epi: { mgPerKg: 2, absoluteMg: 150 },
        sources: [review, label('UK SmPC, §4.2 adult single dose/local infiltration', 'https://www.medicines.org.uk/emc/product/101731/smpc')],
        basisEn: '2 mg/kg: 2018 literature plain reference; 150 mg: UK SmPC single-dose cap. No epinephrine uplift selected; the SmPC does not establish one.',
        basisJa: '2 mg/kgは2018年文献のエピなし参考値、150 mgは英国SmPCの単回上限。SmPCに増量基準がないためエピで上限を増やしません。'
    }
};
