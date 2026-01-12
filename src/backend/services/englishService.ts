import { HomeworkResponse } from '../types/index';

export class EnglishService {
  private normalizeInput(problem: string): string {
    let normalized = problem.toLowerCase();
    normalized = normalized.replace(/^(what is|explain|tell me about|help with|check|review)\s+/i, '');
    return normalized.trim();
  }

  solve(problem: string): HomeworkResponse {
    const normalized = this.normalizeInput(problem);
    let solution = '';
    let explanation = '';

    // Spelling help
    if (normalized.match(/spell|spelling/i)) {
      solution = 'Spelling help';
      explanation = `Ask for a word to spell!
Example: "Spell beautiful" or "How do I spell necessary?"`;
    }
    // Grammar concepts - Parts of speech
    else if (normalized.match(/adverb|adverbial/i)) {
      solution = 'Adverb/Adverbial';
      explanation = `📚 An adverb/adverbial modifies verbs, adjectives, or other adverbs.

It tells us HOW, WHEN, WHERE, or HOW MUCH something happens.

Examples:
• She runs QUICKLY (how)
• He arrived YESTERDAY (when)
• They played OUTSIDE (where)
• It's VERY hot (how much)

Common adverbs end in -ly: slowly, carefully, happily`;
    }
    else if (normalized.match(/\b(noun|nouns)\b/i)) {
      solution = 'Noun';
      explanation = `📚 A noun is a person, place, thing, or idea.

Types:
• Common noun: dog, city, book
• Proper noun: Max, London, Bible (capitalized!)
• Abstract noun: love, freedom, happiness`;
    }
    else if (normalized.match(/\b(verb|verbs)\b/i)) {
      solution = 'Verb';
      explanation = `📚 A verb is an action or state of being.

Types:
• Action verbs: run, jump, write, think
• Linking verbs: is, am, are, was, were
• Helping verbs: can, could, will, would, should

Example: She IS WRITING a letter.`;
    }
    else if (normalized.match(/adjective/i)) {
      solution = 'Adjective';
      explanation = `📚 An adjective describes a noun.

It tells us WHAT KIND, HOW MANY, or WHICH ONE.

Examples:
• The RED car (what kind)
• THREE apples (how many)
• THAT book (which one)`;
    }
    else if (normalized.match(/pronoun/i)) {
      solution = 'Pronoun';
      explanation = `📚 A pronoun replaces a noun.

Types:
• Subject: I, you, he, she, it, we, they
• Object: me, you, him, her, it, us, them
• Possessive: my, your, his, her, its, our, their

Example: JOHN loves HIS dog → HE loves HIS dog`;
    }
    else if (normalized.match(/preposition/i)) {
      solution = 'Preposition';
      explanation = `📚 A preposition shows relationships between words.

Common prepositions:
• Location: in, on, at, above, below, beside
• Time: before, after, during, until
• Direction: to, from, through, across

Example: The cat is ON the table.`;
    }
    else if (normalized.match(/conjunction/i)) {
      solution = 'Conjunction';
      explanation = `📚 A conjunction connects words or sentences.

Types:
• Coordinating: for, and, nor, but, or, yet, so (FANBOYS)
• Subordinating: because, although, when, if, while

Example: I like pizza AND pasta. I'm tired BECAUSE I worked late.`;
    }
    // Grammar help - Common mistakes
    else if (normalized.match(/grammar|tense|sentence|punctuation|its|your|there|their/i)) {
      solution = 'Grammar tip';
      explanation = `Common mistakes:
✓ Its = possessive
✓ It's = it is
✓ Your = possessive
✓ You're = you are
✓ There = location
✓ Their = possessive`;
    }
    // Vocabulary
    else if (normalized.match(/vocabulary|meaning|define|synonym|antonym|word/i)) {
      solution = 'Vocabulary help';
      explanation = `Ask me about word meanings!
Example: "What does serendipity mean?"`;
    }
    // Essay tips
    else if (normalized.match(/essay|paragraph|write|introduction|conclusion/i)) {
      solution = 'Essay tips';
      explanation = `📝 Essay Structure:
1. Introduction
2. Body paragraphs with evidence
3. Conclusion that summarizes`;
    }
    else if (normalized.match(/metaphor|simile|figurative language/i)) {
      solution = 'Figurative Language';
      explanation = `📖 Making writing more interesting:

SIMILE: Comparison using "like" or "as"
• Example: "Brave as a lion"

METAPHOR: Direct comparison
• Example: "Time is money"

PERSONIFICATION: Giving human qualities to non-humans
• Example: "The wind whispered"

HYPERBOLE: Exaggeration
• Example: "I'm so hungry I could eat a horse"`;
    } else if (normalized.match(/past tense|present tense|future tense|verb tense/i)) {
      solution = 'Verb Tenses';
      explanation = `⏰ When things happen:

PRESENT:
• I walk, she walks
• Happening now

PAST:
• I walked, she walked
• Already happened
• Irregular: go→went, eat→ate

FUTURE:
• I will walk, she will walk
• Going to happen

PRESENT CONTINUOUS:
• I am walking
• Happening right now`;
    } else if (normalized.match(/prefix|suffix|root word/i)) {
      solution = 'Prefixes & Suffixes';
      explanation = `🔤 Word parts:

PREFIX (before root):
• un- = not (unhappy)
• re- = again (rewrite)
• pre- = before (preview)
• mis- = wrong (misspell)

SUFFIX (after root):
• -ed = past (walked)
• -ing = continuous (walking)
• -ly = adverb (quickly)
• -ful = full of (helpful)

ROOT = main part of word`;
    } else if (normalized.match(/theme|main idea|central idea/i)) {
      solution = 'Theme & Main Idea';
      explanation = `💡 Understanding stories:

MAIN IDEA:
• What the text is mostly about
• Usually stated directly

THEME:
• The lesson or message
• Usually not stated directly

Example themes:
• "Honesty is important"
• "Friendship requires trust"
• "Actions have consequences"`;
    } else if (normalized.match(/subject|predicate|sentence structure/i)) {
      solution = 'Sentence Structure';
      explanation = `📝 Parts of a sentence:

SUBJECT: Who/what the sentence is about
• Example: "The dog" in "The dog barked"

PREDICATE: What the subject does
• Example: "barked" in "The dog barked"

Complete sentence needs BOTH:
• Subject + Predicate = Complete sentence
• "The dog barked loudly" ✓
• "The dog" ✗ (no predicate)`;
    } else if (normalized.match(/punctuation|comma|period|semicolon|colon/i)) {
      solution = 'Punctuation';
      explanation = `🔤 Punctuation marks:

PERIOD (.) - End of sentence
COMMA (,) - Pause, separate items
QUESTION MARK (?) - End of question
EXCLAMATION (!) - Strong feeling
APOSTROPHE (') - Possession or contraction
• John's book (possession)
• don't (do not)

QUOTATION MARKS ("") - Direct speech
• She said, "Hello!"`;
    } else if (normalized.match(/synonym|antonym|homonym/i)) {
      solution = 'Word Relationships';
      explanation = `📚 Related words:

SYNONYM: Words with similar meanings
• happy = joyful = glad

ANTONYM: Words with opposite meanings
• hot ↔ cold
• big ↔ small

HOMONYM: Same sound, different meaning
• there/their/they're
• to/too/two
• write/right`;
    } else {
      solution = 'I can help with English!';
      explanation = `Ask about:
✓ Grammar: Nouns, Verbs, Adjectives, Adverbs, Pronouns, Prepositions, Conjunctions
✓ Spelling & Vocabulary
✓ Figurative Language: Metaphors, Similes, Personification, Hyperbole
✓ Punctuation: Commas, Periods, Apostrophes, Quotations
✓ Sentence Structure & Essay Writing
✓ Word Relationships: Synonyms, Antonyms, Homonyms
✓ Verb Tenses: Past, Present, Future
✓ Reading Comprehension & Themes`;
    }

    return {
      solution,
      explanation: explanation.trim(),
      subject: 'english',
      confidence: 0.85,
    };
  }
}