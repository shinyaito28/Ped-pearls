import { useMemo } from 'react';
import { usePatient } from '../context/PatientContext';
import { resolveCpb, resolvePostCpb, postCpbPath } from '../data/rotem_protocol';

// Thin wrappers that read patient weight from PatientContext and forward
// to the pure resolvers in `src/data/rotem_protocol.js`. Components import
// these; tests can import the resolvers directly.

export const useRotemCpb = (inputs) => {
    const { weight } = usePatient();
    return useMemo(
        () => resolveCpb(inputs, weight),
        [inputs.heptemCT, inputs.heptemCFT, inputs.heptemMCF, inputs.fibtemMCF, weight]
    );
};

export const useRotemPostCpb = (inputs) => {
    const { weight } = usePatient();
    return useMemo(
        () => resolvePostCpb(inputs, weight),
        [inputs.extemCT, inputs.a10extem, inputs.a10fibtem, weight]
    );
};

// Pure helper, exported for the SVG decision tree.
export { postCpbPath };
