import { HomeworkResponse } from '../types/index';

export class ScienceService {
  private normalizeInput(problem: string): string {
    let normalized = problem.toLowerCase();
    normalized = normalized.replace(/^(what is|explain|tell me about|what are|how does|why do)\s+/i, '');
    return normalized.trim();
  }

  solve(problem: string): HomeworkResponse {
    const normalized = this.normalizeInput(problem);
    let solution = '';
    let explanation = '';

    if (normalized.match(/photosynthesis/i)) {
      solution = 'Photosynthesis';
      explanation = `Photosynthesis is how plants make food!

🌱 Process:
- Plants use SUNLIGHT + WATER + CO₂
- They make GLUCOSE (sugar) + OXYGEN

Formula: 6CO₂ + 6H₂O + sunlight → Glucose + O₂`;
    } else if (normalized.match(/newton|gravity|force/i)) {
      solution = 'Newton\'s Laws';
      explanation = `Newton discovered how force works!

📚 Second Law: F = ma
- F = Force
- m = mass
- a = acceleration

Gravity is what keeps us on Earth!`;
    } else if (normalized.match(/atom|molecule|element/i)) {
      solution = 'Atoms';
      explanation = `Atoms are the smallest parts of matter!

🔬 Structure:
- Nucleus: protons & neutrons
- Electrons: orbit around

Everything is made of atoms!`;
    } else if (normalized.match(/water cycle|evaporation|condensation|precipitation/i)) {
      solution = 'Water Cycle';
      explanation = `💧 How water moves:
1. EVAPORATION: Water becomes steam
2. CONDENSATION: Steam becomes clouds
3. PRECIPITATION: Rain falls
4. COLLECTION: Back to ocean`;
    } else if (normalized.match(/digestion|digestive system/i)) {
      solution = 'Digestive System';
      explanation = `🍎 How we digest food:

1. MOUTH: Chewing & saliva
2. ESOPHAGUS: Tube to stomach
3. STOMACH: Acid breaks down food
4. SMALL INTESTINE: Nutrients absorbed
5. LARGE INTESTINE: Water absorbed
6. WASTE removed

Takes 24-72 hours!`;
    } else if (normalized.match(/respiration|breathing|lungs/i)) {
      solution = 'Respiration';
      explanation = `🫁 How we breathe:

INHALE:
• Breathe in oxygen (O₂)
• Goes to lungs

EXHALE:
• Breathe out carbon dioxide (CO₂)

Your body uses oxygen to make energy!

Cellular respiration: Glucose + O₂ → Energy + CO₂ + H₂O`;
    } else if (normalized.match(/rocks|minerals|igneous|sedimentary|metamorphic/i)) {
      solution = 'Types of Rocks';
      explanation = `🪨 Three main types:

IGNEOUS:
• Formed from cooled lava/magma
• Example: granite, basalt

SEDIMENTARY:
• Layers of sediment pressed together
• Example: sandstone, limestone

METAMORPHIC:
• Changed by heat & pressure
• Example: marble (from limestone)`;
    } else if (normalized.match(/magnetism|magnet/i)) {
      solution = 'Magnetism';
      explanation = `🧲 Magnets attract or repel!

Properties:
• Two poles: North & South
• Opposite poles ATTRACT
• Same poles REPEL
• Create magnetic field

Examples: Compass, refrigerator magnets, Earth's magnetic field`;
    } else if (normalized.match(/earthquake|plate tectonics|continental drift/i)) {
      solution = 'Earthquakes & Plate Tectonics';
      explanation = `🌍 Earth's crust moves!

PLATE TECTONICS:
• Earth's crust has giant plates
• Plates slowly move
• Can collide, separate, or slide past each other

EARTHQUAKES:
• Caused by plates moving suddenly
• Energy released as shaking
• Measured on Richter scale`;
    } else if (normalized.match(/climate change|greenhouse|global warming/i)) {
      solution = 'Climate Change';
      explanation = `🌡️ Earth is getting warmer!

GREENHOUSE EFFECT:
• Sun's heat gets trapped
• Gases like CO₂ trap heat
• Temperature rises

EFFECTS:
• Ice melts
• Sea levels rise
• Weather changes

Solutions: Reduce emissions, plant trees, use renewable energy`;
    } else if (normalized.match(/life cycle|metamorphosis/i)) {
      solution = 'Life Cycle';
      explanation = `🦋 Butterfly cycle:
1. EGG - Small egg
2. LARVA - Caterpillar
3. PUPA - Changes
4. ADULT - Butterfly`;
    } else if (normalized.match(/cell|cells|mitochondria|nucleus/i)) {
      solution = 'Cell Structure';
      explanation = `🔬 Cells are the building blocks of life!

Parts:
• NUCLEUS: Control center (has DNA)
• MITOCHONDRIA: Energy factory
• CELL MEMBRANE: Outer layer
• CYTOPLASM: Jelly-like substance

Plant cells also have: cell wall, chloroplasts`;
    } else if (normalized.match(/dna|genes|genetics|heredity/i)) {
      solution = 'DNA & Genetics';
      explanation = `🧬 DNA holds instructions for life!

Structure: Double helix (twisted ladder)
• Made of 4 bases: A, T, C, G
• Genes are sections of DNA
• Inherited from parents

DNA → Genes → Traits (like eye color)`;
    } else if (normalized.match(/ecosystem|food chain|food web/i)) {
      solution = 'Ecosystem & Food Chain';
      explanation = `🌍 Food Chain shows energy flow:

1. PRODUCERS (plants) - make food
2. PRIMARY CONSUMERS (herbivores) - eat plants
3. SECONDARY CONSUMERS (carnivores) - eat herbivores
4. DECOMPOSERS (bacteria) - break down dead things

Energy flows: Sun → Plants → Animals`;
    } else if (normalized.match(/solar system|planets|sun|moon/i)) {
      solution = 'Solar System';
      explanation = `☀️ Our Solar System:

SUN (star at center)
Planets in order:
1. Mercury (smallest, closest to sun)
2. Venus (hottest)
3. Earth (our home!)
4. Mars (red planet)
5. Jupiter (biggest)
6. Saturn (has rings)
7. Uranus
8. Neptune

Mnemonic: My Very Educated Mother Just Served Us Nachos`;
    } else if (normalized.match(/energy|kinetic|potential/i)) {
      solution = 'Energy';
      explanation = `⚡ Energy makes things happen!

Types:
• KINETIC: Energy of motion
• POTENTIAL: Stored energy
• THERMAL: Heat energy
• CHEMICAL: In food & batteries

Law: Energy can't be created or destroyed, only transformed!

Example: Ball on hill (potential) → rolling (kinetic)`;
    } else if (normalized.match(/states of matter|solid|liquid|gas/i)) {
      solution = 'States of Matter';
      explanation = `🧊💧💨 Three main states:

SOLID:
• Fixed shape & volume
• Particles close together
• Example: ice

LIQUID:
• Fixed volume, changes shape
• Particles move freely
• Example: water

GAS:
• No fixed shape or volume
• Particles far apart
• Example: steam

Changes: Melting, freezing, evaporation, condensation`;
    } else {
      solution = 'I can help with science!';
      explanation = `Ask about:
✓ Biology: Photosynthesis, Cells, DNA, Genetics, Ecosystems, Food Chains, Life Cycles
✓ Physics: Newton's Laws, Gravity, Energy (Kinetic/Potential), Motion, Forces, Magnetism
✓ Chemistry: Atoms, Molecules, Elements, Periodic Table, Chemical Reactions, States of Matter
✓ Earth Science: Water Cycle, Weather, Rocks & Minerals, Plate Tectonics, Climate
✓ Space: Solar System, Planets, Stars, Moon Phases, Gravity
✓ Human Body: Organs, Systems, Digestion, Circulation, Respiration
✓ Environment: Conservation, Pollution, Renewable Energy`;
    }

    return {
      solution,
      explanation: explanation.trim(),
      subject: 'science',
      confidence: 0.75,
    };
  }
}