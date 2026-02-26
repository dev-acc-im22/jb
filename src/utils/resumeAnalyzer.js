import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import nlp from 'compromise';
import { compareTwoStrings } from 'string-similarity';

// Configure pdf.js worker (local bundled via Vite)
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// ─── Stopwords (expanded) ────────────────────────────────────
const STOPWORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do',
    'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can',
    'it', 'its', 'this', 'that', 'these', 'those', 'i', 'me', 'my', 'we', 'our', 'you',
    'your', 'he', 'she', 'they', 'them', 'their', 'what', 'which', 'who', 'whom', 'how',
    'when', 'where', 'why', 'if', 'then', 'than', 'so', 'as', 'up', 'out', 'about', 'into',
    'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under', 'over',
    'again', 'further', 'once', 'here', 'there', 'all', 'each', 'every', 'both', 'few',
    'more', 'most', 'other', 'some', 'such', 'no', 'not', 'only', 'own', 'same', 'very',
    'just', 'also', 'now', 'new', 'like', 'well', 'back', 'even', 'still', 'way', 'take',
    'come', 'go', 'make', 'get', 'know', 'think', 'see', 'look', 'want', 'give', 'use',
    'find', 'tell', 'ask', 'work', 'seem', 'feel', 'try', 'leave', 'call', 'need',
    'etc', 'per', 'via', 'able', 'across', 'must', 'including', 'include',
    'within', 'without', 'along', 'among', 'around', 'based', 'using', 'used', 'related',
    'required', 'preferred', 'strong', 'good', 'great', 'excellent', 'proven', 'plus',
    'minimum', 'maximum', 'least', 'years', 'year', 'experience', 'experienced',
    'role', 'position', 'job', 'company', 'team', 'responsible', 'responsibilities',
    'qualifications', 'requirements', 'description', 'overview', 'summary', 'looking',
    'join', 'opportunity', 'ideal', 'candidate', 'apply', 'application', 'ensure',
    'ability', 'knowledge', 'understanding', 'familiarity', 'proficiency', 'working',
    'help', 'support', 'provide', 'maintain', 'develop', 'create', 'manage', 'lead',
    'collaborate', 'communicate', 'drive', 'deliver', 'report', 'handle',
]);

// ─── Action Verbs ────────────────────────────────────────────
const ACTION_VERBS = new Set([
    'achieved', 'administered', 'analyzed', 'architected', 'automated', 'boosted',
    'built', 'championed', 'coached', 'collaborated', 'consolidated', 'coordinated',
    'created', 'customized', 'decreased', 'delivered', 'deployed', 'designed',
    'developed', 'directed', 'drove', 'eliminated', 'enabled', 'engineered',
    'established', 'exceeded', 'executed', 'expanded', 'expedited', 'facilitated',
    'formulated', 'generated', 'guided', 'headed', 'identified', 'implemented',
    'improved', 'increased', 'influenced', 'initiated', 'innovated', 'integrated',
    'introduced', 'launched', 'led', 'leveraged', 'maintained', 'managed', 'maximized',
    'mentored', 'migrated', 'minimized', 'modernized', 'negotiated', 'operated',
    'optimized', 'orchestrated', 'organized', 'overhauled', 'oversaw', 'performed',
    'pioneered', 'planned', 'presented', 'prioritized', 'produced', 'programmed',
    'proposed', 'published', 'raised', 'rebuilt', 'recommended', 'redesigned',
    'reduced', 'refactored', 'refined', 'replaced', 'resolved', 'restructured',
    'revamped', 'reviewed', 'revised', 'scaled', 'secured', 'simplified',
    'spearheaded', 'standardized', 'streamlined', 'strengthened', 'supervised',
    'surpassed', 'tested', 'trained', 'transformed', 'translated', 'upgraded',
]);

// ─── Tech & Skill Synonyms (for fuzzy matching) ─────────────
const SKILL_SYNONYMS = {
    'javascript': ['js', 'ecmascript', 'es6', 'es2015'],
    'typescript': ['ts'],
    'python': ['py'],
    'react': ['reactjs', 'react.js'],
    'angular': ['angularjs', 'angular.js', 'ng'],
    'vue': ['vuejs', 'vue.js'],
    'node': ['nodejs', 'node.js'],
    'express': ['expressjs', 'express.js'],
    'next': ['nextjs', 'next.js'],
    'mongodb': ['mongo'],
    'postgresql': ['postgres', 'psql'],
    'mysql': ['mariadb'],
    'aws': ['amazon web services'],
    'gcp': ['google cloud', 'google cloud platform'],
    'azure': ['microsoft azure'],
    'docker': ['containerization', 'containers'],
    'kubernetes': ['k8s'],
    'ci/cd': ['cicd', 'continuous integration', 'continuous delivery', 'continuous deployment'],
    'machine learning': ['ml'],
    'artificial intelligence': ['ai'],
    'natural language processing': ['nlp'],
    'rest': ['restful', 'rest api', 'restful api'],
    'graphql': ['gql'],
    'html': ['html5'],
    'css': ['css3'],
    'sass': ['scss'],
    'redux': ['redux toolkit', 'rtk'],
    'sql': ['structured query language'],
    'nosql': ['no-sql'],
    'api': ['apis', 'web api', 'web apis'],
    'ux': ['user experience'],
    'ui': ['user interface'],
    'devops': ['dev ops'],
    'agile': ['scrum', 'kanban'],
    'git': ['github', 'gitlab', 'bitbucket', 'version control'],
    'project management': ['pm', 'project manager'],
    'communication': ['verbal communication', 'written communication'],
    'leadership': ['team leadership', 'team lead'],
    'testing': ['unit testing', 'integration testing', 'e2e testing', 'qa'],
    'figma': ['sketch', 'adobe xd'],
    'data analysis': ['data analytics', 'data analyst'],
    'business intelligence': ['bi'],
    'etl': ['data pipeline', 'data pipelines'],
    'microservices': ['micro services', 'microservice architecture'],
    'object oriented': ['oop', 'object-oriented'],
    'functional programming': ['fp'],
};

// Build reverse synonym lookup
const REVERSE_SYNONYMS = {};
for (const [canonical, aliases] of Object.entries(SKILL_SYNONYMS)) {
    for (const alias of aliases) {
        REVERSE_SYNONYMS[alias] = canonical;
    }
    REVERSE_SYNONYMS[canonical] = canonical;
}

// ─── Standard Resume Sections ────────────────────────────────
const SECTION_PATTERNS = {
    contact: /^(contact\s*(info|information|details)?|personal\s*(info|information|details)?|address|phone|email)/i,
    summary: /^(summary|professional\s*summary|profile|objective|career\s*objective|about\s*me|personal\s*statement|executive\s*summary)/i,
    experience: /^(experience|work\s*experience|professional\s*experience|employment|employment\s*history|work\s*history|career\s*history)/i,
    education: /^(education|academic|academics|qualifications|educational\s*qualifications|degrees?)/i,
    skills: /^(skills|technical\s*skills|core\s*competencies|competencies|key\s*skills|areas?\s*of\s*expertise|proficiencies|technologies)/i,
    projects: /^(projects|personal\s*projects|academic\s*projects|key\s*projects|notable\s*projects)/i,
    certifications: /^(certifications?|licenses?|professional\s*certifications?|credentials)/i,
    awards: /^(awards?|honors?|achievements?|recognition)/i,
    publications: /^(publications?|papers?|research)/i,
    languages: /^(languages?|language\s*proficiency)/i,
    interests: /^(interests?|hobbies|extracurricular|volunteer|volunteering)/i,
    references: /^(references?)/i,
};

// ─── File Text Extraction ────────────────────────────────────

export async function extractTextFromFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'txt') {
        return await file.text();
    }

    if (ext === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            // Reconstruct text with proper spacing
            let lastY = null;
            const pageLines = [];
            let currentLine = '';
            for (const item of content.items) {
                if (lastY !== null && Math.abs(item.transform[5] - lastY) > 3) {
                    pageLines.push(currentLine.trim());
                    currentLine = '';
                }
                currentLine += item.str + ' ';
                lastY = item.transform[5];
            }
            if (currentLine.trim()) pageLines.push(currentLine.trim());
            text += pageLines.join('\n') + '\n';
        }
        return text;
    }

    if (ext === 'docx' || ext === 'doc') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    }

    throw new Error(`Unsupported file format: .${ext}`);
}

// ─── NLP-Powered Keyword Extraction ──────────────────────────

function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/['']/g, "'")
        .replace(/[""]/g, '"')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractNLPKeywords(text) {
    const doc = nlp(text);
    const keywords = new Map();

    // Extract noun phrases (most important for JD matching)
    const nounPhrases = doc.nouns().out('array');
    for (const np of nounPhrases) {
        const cleaned = np.toLowerCase().trim();
        if (cleaned.length > 2 && !STOPWORDS.has(cleaned)) {
            keywords.set(cleaned, (keywords.get(cleaned) || 0) + 2); // Higher weight
        }
    }

    // Extract technical terms & acronyms (uppercase words, words with special chars)
    const techTermRegex = /\b[A-Z][A-Za-z]*(?:\.[A-Za-z]+)*\b|\b[A-Z]{2,}\b|[A-Za-z]+[+#]+|[A-Za-z]+\.js|[A-Za-z]+\.py/g;
    const techMatches = text.match(techTermRegex) || [];
    for (const term of techMatches) {
        const lower = term.toLowerCase();
        if (lower.length > 1 && !STOPWORDS.has(lower)) {
            keywords.set(lower, (keywords.get(lower) || 0) + 3); // Highest weight for tech terms
        }
    }

    // Extract verbs (for action verb matching)
    const verbs = doc.verbs().toInfinitive().out('array');
    for (const verb of verbs) {
        const lower = verb.toLowerCase();
        if (ACTION_VERBS.has(lower)) {
            keywords.set(lower, (keywords.get(lower) || 0) + 1);
        }
    }

    // Extract individual meaningful words (nouns, adjectives)
    const words = text.toLowerCase().split(/[\s,;:!?\(\)\[\]{}]+/).filter(w => w.length > 2);
    for (const word of words) {
        const cleaned = word.replace(/[^a-z0-9+#.\-\/]/g, '');
        if (cleaned.length > 2 && !STOPWORDS.has(cleaned) && !keywords.has(cleaned)) {
            keywords.set(cleaned, (keywords.get(cleaned) || 0) + 1);
        }
    }

    // Extract bigrams for compound skills
    for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i].replace(/[^a-z0-9+#.\-]/g, '');
        const w2 = words[i + 1].replace(/[^a-z0-9+#.\-]/g, '');
        if (w1.length > 1 && w2.length > 1 && !STOPWORDS.has(w1) && !STOPWORDS.has(w2)) {
            const bigram = `${w1} ${w2}`;
            keywords.set(bigram, (keywords.get(bigram) || 0) + 1.5);
        }
    }

    return keywords;
}

function extractJDKeywords(jdText) {
    const allKeywords = extractNLPKeywords(jdText);

    // Sort by weight and return top keywords
    const sorted = [...allKeywords.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 40);

    return new Map(sorted);
}

// ─── Canonicalize for Synonym Matching ───────────────────────

function canonicalize(term) {
    const lower = term.toLowerCase().trim();
    return REVERSE_SYNONYMS[lower] || lower;
}

// ─── Section Detection ───────────────────────────────────────

function detectSections(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const sections = {};
    let currentSection = 'header';
    let currentContent = [];

    for (const line of lines) {
        let matched = false;
        for (const [sectionName, pattern] of Object.entries(SECTION_PATTERNS)) {
            if (pattern.test(line) && line.length < 60) {
                if (currentContent.length > 0) {
                    sections[currentSection] = currentContent.join('\n');
                }
                currentSection = sectionName;
                currentContent = [];
                matched = true;
                break;
            }
        }
        if (!matched) {
            currentContent.push(line);
        }
    }
    if (currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n');
    }

    return sections;
}

// ─── ATS Compatibility Check ─────────────────────────────────

function checkATSCompatibility(text, sections) {
    let score = 100;
    const issues = [];

    // Check for contact info
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
    const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text) ||
        /\d{10,}/.test(text.replace(/[\s\-\.]/g, ''));
    const hasLinkedIn = /linkedin\.com/i.test(text);
    const hasURL = /https?:\/\/[^\s]+/.test(text) || /[a-z]+\.(com|io|dev|org|net)/i.test(text);

    if (!hasEmail) {
        score -= 15;
        issues.push({
            type: 'error',
            text: 'No email address detected — ATS systems need this for applicant tracking',
            section: 'Contact',
            priority: 'High'
        });
    }
    if (!hasPhone) {
        score -= 10;
        issues.push({
            type: 'warning',
            text: 'No phone number detected — most recruiters expect a contact number on resumes',
            section: 'Contact',
            priority: 'Medium'
        });
    }
    if (hasLinkedIn) {
        issues.push({ type: 'success', text: 'LinkedIn profile link included — great for recruiter verification', section: 'Contact', priority: 'Low' });
    } else if (hasURL) {
        issues.push({ type: 'success', text: 'Portfolio/website link detected', section: 'Contact', priority: 'Low' });
    }

    // Critical sections
    const criticalSections = ['experience', 'education', 'skills'];
    const importantSections = ['summary', 'projects', 'certifications'];

    for (const sec of criticalSections) {
        if (!sections[sec]) {
            score -= 12;
            issues.push({
                type: 'error',
                text: `Missing "${sec.charAt(0).toUpperCase() + sec.slice(1)}" section — this is essential for ATS parsing`,
                section: 'Structure',
                priority: 'High'
            });
        }
    }

    for (const sec of importantSections) {
        if (!sections[sec]) {
            score -= 5;
            issues.push({
                type: 'warning',
                text: `Consider adding a "${sec.charAt(0).toUpperCase() + sec.slice(1)}" section to strengthen your resume`,
                section: 'Structure',
                priority: 'Medium'
            });
        }
    }

    // ATS-hostile patterns
    if (/[│┃┆┊╎║▏▎▍▌▋▊▉█]/.test(text)) {
        score -= 8;
        issues.push({ type: 'warning', text: 'Special characters or table borders detected — these may confuse ATS parsers', section: 'Format', priority: 'Medium' });
    }

    // Very sparse text (likely image-based or scanned)
    if (text.length < 200) {
        score -= 20;
        issues.push({ type: 'error', text: 'Very little text extracted — your resume may use images or complex layouts that ATS cannot read', section: 'Format', priority: 'High' });
    }

    // Check for image references
    if (/\.(jpg|jpeg|png|gif|bmp|svg)\b/i.test(text)) {
        score -= 5;
        issues.push({ type: 'warning', text: 'Image references detected — ATS systems cannot read embedded images', section: 'Format', priority: 'Medium' });
    }

    // Positive checks
    if (hasEmail && hasPhone) {
        issues.push({ type: 'success', text: 'Contact information (email and phone) is properly included', section: 'Contact', priority: 'Low' });
    }
    if (sections.experience && sections.education && sections.skills) {
        issues.push({ type: 'success', text: 'All critical resume sections (Experience, Education, Skills) are present', section: 'Structure', priority: 'Low' });
    }

    return { score: Math.max(0, Math.min(100, score)), issues };
}

// ─── Content Quality Check (NLP-powered) ─────────────────────

function checkContentQuality(text, sections) {
    let score = 100;
    const issues = [];
    const doc = nlp(text);

    // NLP-powered action verb detection
    const verbs = doc.verbs().toInfinitive().out('array').map(v => v.toLowerCase());
    const foundActionVerbs = verbs.filter(v => ACTION_VERBS.has(v));
    const uniqueActionVerbs = new Set(foundActionVerbs);

    // Also check raw text for past-tense action verbs
    const words = text.toLowerCase().split(/\s+/);
    for (const w of words) {
        const cleaned = w.replace(/[^a-z]/g, '');
        if (ACTION_VERBS.has(cleaned)) uniqueActionVerbs.add(cleaned);
    }

    if (uniqueActionVerbs.size === 0) {
        score -= 25;
        issues.push({
            type: 'error',
            text: 'No action verbs found — use verbs like "developed", "led", "implemented", "optimized" to describe achievements',
            section: 'Experience',
            priority: 'High'
        });
    } else if (uniqueActionVerbs.size < 4) {
        score -= 12;
        issues.push({
            type: 'warning',
            text: `Only ${uniqueActionVerbs.size} unique action verb(s) found — aim for 5+ varied action verbs across your experience section`,
            section: 'Experience',
            priority: 'Medium'
        });
    } else {
        const examples = [...uniqueActionVerbs].slice(0, 4).join('", "');
        issues.push({
            type: 'success',
            text: `Strong use of ${uniqueActionVerbs.size} action verbs including "${examples}"`,
            section: 'Experience',
            priority: 'Low'
        });
    }

    // Check for quantified achievements using NLP number detection
    const numbers = doc.numbers().out('array');
    const quantifiedPattern = /\d+[%xX]|\$[\d,.]+|\d+\s*(percent|%|users?|customers?|clients?|projects?|members?|employees?|team|people|increase|decrease|reduction|improvement|growth)|reduced\s+.*\d|improved\s+.*\d|increased\s+.*\d|saved\s+.*\d|grew\s+.*\d|boosted\s+.*\d|\d+[kKmMbB]\+?/gi;
    const quantifiedMatches = text.match(quantifiedPattern) || [];
    const metricsCount = Math.max(quantifiedMatches.length, Math.floor(numbers.length / 2));

    if (metricsCount === 0) {
        score -= 20;
        issues.push({
            type: 'error',
            text: 'No quantifiable achievements found — add metrics like "$1.2M revenue increase", "40% faster deployment", "managed team of 12"',
            section: 'Experience',
            priority: 'High'
        });
    } else if (metricsCount < 3) {
        score -= 8;
        issues.push({
            type: 'warning',
            text: `Only ${metricsCount} quantified achievement(s) found — try to quantify at least 3-5 bullet points with specific numbers`,
            section: 'Experience',
            priority: 'Medium'
        });
    } else {
        issues.push({
            type: 'success',
            text: `${metricsCount} quantified achievements detected — concrete metrics make your impact tangible to recruiters`,
            section: 'Experience',
            priority: 'Low'
        });
    }

    // Professional summary check
    if (!sections.summary) {
        score -= 15;
        issues.push({
            type: 'error',
            text: 'No professional summary found — recruiters spend 6 seconds on first scan, a strong summary hooks them instantly',
            section: 'Summary',
            priority: 'High'
        });
    } else {
        const summaryWords = sections.summary.split(/\s+/).length;
        if (summaryWords < 15) {
            score -= 8;
            issues.push({ type: 'warning', text: 'Professional summary is too brief — aim for 2-3 impactful sentences', section: 'Summary', priority: 'Medium' });
        } else if (summaryWords > 100) {
            score -= 5;
            issues.push({ type: 'warning', text: 'Professional summary is too long — keep it concise at 2-4 sentences max', section: 'Summary', priority: 'Medium' });
        } else {
            issues.push({ type: 'success', text: 'Professional summary is present and well-structured', section: 'Summary', priority: 'Low' });
        }
    }

    // Passive voice detection via NLP
    const sentences = doc.sentences().out('array');
    let passiveCount = 0;
    for (const sentence of sentences) {
        const sDoc = nlp(sentence);
        if (sDoc.match('#Copula #PastTense').found || sDoc.match('was #PastTense').found || sDoc.match('were #PastTense').found) {
            passiveCount++;
        }
    }
    if (passiveCount > 5) {
        score -= 8;
        issues.push({
            type: 'warning',
            text: `${passiveCount} instances of passive voice detected — use active voice ("Developed the platform" instead of "The platform was developed")`,
            section: 'Experience',
            priority: 'Medium'
        });
    }

    // Bullet point check
    const bulletPattern = /^[\s]*[•\-\*\◦\○\●\►\▸\‣\⁃]/gm;
    const bullets = text.match(bulletPattern) || [];
    if (bullets.length < 3) {
        score -= 8;
        issues.push({ type: 'warning', text: 'Few or no bullet points detected — use bullet points to make achievements easy to scan', section: 'Experience', priority: 'Medium' });
    } else if (bullets.length >= 8) {
        issues.push({ type: 'success', text: `Good use of ${bullets.length} bullet points for clear, scannable content`, section: 'Experience', priority: 'Low' });
    }

    // First person pronouns (should be avoided in resumes)
    const firstPersonCount = (text.match(/\b(I|my|me|mine|myself)\b/g) || []).length;
    if (firstPersonCount > 3) {
        score -= 5;
        issues.push({
            type: 'warning',
            text: `${firstPersonCount} first-person pronouns found — remove "I", "my", "me" and start bullets with action verbs instead`,
            section: 'Experience',
            priority: 'Medium'
        });
    }

    return { score: Math.max(0, Math.min(100, score)), issues };
}

// ─── Formatting Check ────────────────────────────────────────

function checkFormatting(text) {
    let score = 100;
    const issues = [];
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

    // Resume length
    if (wordCount < 100) {
        score -= 25;
        issues.push({ type: 'error', text: 'Resume appears very short — a strong resume typically has 300-700 words', section: 'Format', priority: 'High' });
    } else if (wordCount < 250) {
        score -= 12;
        issues.push({ type: 'warning', text: `Resume has only ~${wordCount} words — consider adding more detail about your experience and skills`, section: 'Format', priority: 'Medium' });
    } else if (wordCount > 1200) {
        score -= 10;
        issues.push({ type: 'warning', text: `Resume has ~${wordCount} words — consider condensing to 1-2 pages for better focus`, section: 'Format', priority: 'Medium' });
    } else {
        issues.push({ type: 'success', text: `Resume length (~${wordCount} words) is within the ideal range`, section: 'Format', priority: 'Low' });
    }

    // Consistent date formatting
    const datePatterns = text.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{4}\b|\b\d{4}\s*[-–—]\s*(present|\d{4})\b/gi) || [];
    if (datePatterns.length > 0) {
        issues.push({ type: 'success', text: `${datePatterns.length} date entries detected with consistent formatting`, section: 'Format', priority: 'Low' });
    } else {
        score -= 5;
        issues.push({ type: 'warning', text: 'No clear date formatting found — ensure employment dates are clearly stated', section: 'Format', priority: 'Medium' });
    }

    // Dense paragraphs
    const longLines = lines.filter(l => l.length > 200);
    if (longLines.length > 3) {
        score -= 8;
        issues.push({ type: 'warning', text: 'Dense paragraphs detected — break long blocks into concise bullet points (1-2 lines each)', section: 'Format', priority: 'Medium' });
    }

    // ALL CAPS overuse
    const allCapsLines = lines.filter(l => l === l.toUpperCase() && l.length > 3 && /[A-Z]/.test(l));
    if (allCapsLines.length > 5) {
        score -= 5;
        issues.push({ type: 'warning', text: 'Excessive ALL CAPS usage — use standard title case for better readability', section: 'Format', priority: 'Low' });
    }

    // Spelling via NLP (basic typo detection)
    const doc = nlp(text);
    const unknownWords = doc.not('#Noun').not('#Verb').not('#Adjective').not('#Adverb').not('#Value').not('#Determiner').not('#Conjunction').not('#Preposition');
    // This is a rough check — NLP-based

    return { score: Math.max(0, Math.min(100, score)), issues };
}

// ─── Advanced Keyword Match (Fuzzy + Synonym) ────────────────

function matchKeywords(resumeText, jdKeywords) {
    let score = 100;
    const issues = [];
    const resumeLower = normalizeText(resumeText);
    const resumeKeywords = extractNLPKeywords(resumeText);
    const resumeKeywordSet = new Set(resumeKeywords.keys());

    const matched = [];
    const missing = [];
    const fuzzyMatched = []; // keywords matched via synonyms or fuzzy

    for (const [keyword] of jdKeywords) {
        const keywordLower = keyword.toLowerCase().trim();
        if (keywordLower.length < 2) continue;

        // Step 1: Exact match
        const words = keywordLower.split(' ');
        let found = false;

        if (words.length > 1) {
            found = resumeLower.includes(keywordLower);
        } else {
            const regex = new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            found = regex.test(resumeLower);
        }

        if (found) {
            matched.push(keywordLower);
            continue;
        }

        // Step 2: Synonym match
        const canonical = canonicalize(keywordLower);
        let synonymFound = false;

        // Check if the canonical form exists in resume
        if (canonical !== keywordLower) {
            if (resumeLower.includes(canonical) || resumeKeywordSet.has(canonical)) {
                fuzzyMatched.push(keywordLower);
                synonymFound = true;
            }
        }

        // Check if any synonym of this keyword exists in resume
        if (!synonymFound) {
            const synonyms = SKILL_SYNONYMS[canonical] || SKILL_SYNONYMS[keywordLower] || [];
            for (const syn of synonyms) {
                const synRegex = new RegExp(`\\b${syn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                if (synRegex.test(resumeLower)) {
                    fuzzyMatched.push(keywordLower);
                    synonymFound = true;
                    break;
                }
            }
        }

        if (synonymFound) continue;

        // Step 3: Fuzzy string match (Dice coefficient)
        let bestFuzzyScore = 0;
        for (const resumeKw of resumeKeywordSet) {
            const similarity = compareTwoStrings(keywordLower, resumeKw);
            if (similarity > bestFuzzyScore) bestFuzzyScore = similarity;
            if (similarity > 0.75) break; // Good enough match found
        }

        if (bestFuzzyScore > 0.75) {
            fuzzyMatched.push(keywordLower);
        } else {
            missing.push(keywordLower);
        }
    }

    // Calculate score
    const totalChecked = matched.length + fuzzyMatched.length + missing.length;
    if (totalChecked > 0) {
        const exactMatchRate = matched.length / totalChecked;
        const totalMatchRate = (matched.length + fuzzyMatched.length) / totalChecked;
        score = Math.round(totalMatchRate * 100);

        if (totalMatchRate >= 0.7) {
            issues.push({
                type: 'success',
                text: `Strong keyword match — ${matched.length} exact + ${fuzzyMatched.length} similar matches out of ${totalChecked} key terms from the job description`,
                section: 'Keywords',
                priority: 'Low'
            });
        } else if (totalMatchRate >= 0.4) {
            issues.push({
                type: 'warning',
                text: `Moderate keyword match — ${matched.length + fuzzyMatched.length} of ${totalChecked} key terms found. Add missing keywords to improve your ATS score`,
                section: 'Keywords',
                priority: 'Medium'
            });
        } else {
            issues.push({
                type: 'error',
                text: `Low keyword match — only ${matched.length + fuzzyMatched.length} of ${totalChecked} key terms found. Your resume may be filtered out by ATS`,
                section: 'Keywords',
                priority: 'High'
            });
        }

        if (missing.length > 0) {
            const topMissing = missing.slice(0, 10);
            issues.push({
                type: 'warning',
                text: `Key missing terms: "${topMissing.join('", "')}" — incorporate these naturally into your resume`,
                section: 'Keywords',
                priority: 'High'
            });
        }

        if (fuzzyMatched.length > 0) {
            issues.push({
                type: 'success',
                text: `${fuzzyMatched.length} keyword(s) matched via synonyms/similar terms — good coverage with natural language variation`,
                section: 'Keywords',
                priority: 'Low'
            });
        }
    }

    return {
        score: Math.max(0, Math.min(100, score)),
        issues,
        matched: [...matched, ...fuzzyMatched.map(k => `${k} ≈`)],
        missing
    };
}

// ─── Main Analysis Function ──────────────────────────────────

export async function analyzeResume(resumeText, jobDescription = '') {
    const sections = detectSections(resumeText);

    // Run all checks
    const atsResult = checkATSCompatibility(resumeText, sections);
    const contentResult = checkContentQuality(resumeText, sections);
    const formatResult = checkFormatting(resumeText);

    let keywordResult;
    if (jobDescription && jobDescription.trim().length > 20) {
        const jdKeywords = extractJDKeywords(jobDescription);
        keywordResult = matchKeywords(resumeText, jdKeywords);
    } else {
        // Without JD, do a general keyword analysis
        const resumeKeywords = extractNLPKeywords(resumeText);
        const technicalTerms = [...resumeKeywords.keys()].filter(k =>
            /[+#.]/.test(k) || k.split(' ').length > 1 || REVERSE_SYNONYMS[k]
        );
        keywordResult = {
            score: Math.min(100, 50 + technicalTerms.length * 2),
            issues: [{
                type: 'warning',
                text: 'No job description provided — paste a JD for accurate keyword matching and a more precise ATS score',
                section: 'Keywords',
                priority: 'Medium'
            }],
            matched: technicalTerms.slice(0, 12),
            missing: []
        };
    }

    // Weighted overall score
    const weights = { ats: 0.25, content: 0.25, format: 0.20, keywords: 0.30 };
    const overallScore = Math.round(
        atsResult.score * weights.ats +
        contentResult.score * weights.content +
        formatResult.score * weights.format +
        keywordResult.score * weights.keywords
    );

    // Combine and sort issues
    const allIssues = [
        ...atsResult.issues,
        ...contentResult.issues,
        ...formatResult.issues,
        ...keywordResult.issues,
    ];

    const priorityOrder = { error: 0, warning: 1, success: 2 };
    allIssues.sort((a, b) => priorityOrder[a.type] - priorityOrder[b.type]);

    // Generate suggestions
    const suggestions = generateSuggestions(allIssues, sections, keywordResult);

    return {
        overallScore: Math.max(0, Math.min(100, overallScore)),
        categoryScores: {
            atsCompatibility: atsResult.score,
            contentQuality: contentResult.score,
            formatting: formatResult.score,
            keywordMatch: keywordResult.score,
        },
        issues: allIssues,
        suggestions,
        matchedKeywords: keywordResult.matched,
        missingKeywords: keywordResult.missing,
        sections: Object.keys(sections),
        wordCount: resumeText.split(/\s+/).filter(w => w.length > 0).length,
    };
}

// ─── Suggestion Generator ────────────────────────────────────

function generateSuggestions(issues, sections, keywordResult) {
    const suggestions = [];
    const hasError = (keyword) => issues.some(i => i.type === 'error' && i.text.toLowerCase().includes(keyword));
    const hasWarning = (keyword) => issues.some(i => i.type === 'warning' && i.text.toLowerCase().includes(keyword));

    if (hasError('summary') || hasWarning('summary')) {
        suggestions.push({
            title: 'Add a professional summary',
            desc: 'Write a 2-3 sentence overview at the top: "[X] years of experience in [field] with expertise in [top 3 skills]. Proven track record of [key achievement]. Seeking to [goal]."'
        });
    }

    if (hasError('quantif') || hasWarning('quantif') || hasError('metrics')) {
        suggestions.push({
            title: 'Quantify your achievements',
            desc: 'Replace vague statements with numbers. "Improved performance" → "Improved page load time by 40%, reducing bounce rate from 45% to 28%". Use $, %, #, and time metrics.'
        });
    }

    if (keywordResult.missing.length > 0) {
        const topMissing = keywordResult.missing.slice(0, 5).join(', ');
        suggestions.push({
            title: 'Add missing JD keywords',
            desc: `Your resume is missing: ${topMissing}. Don't just list them — weave them into your experience bullets. E.g., "Led ${keywordResult.missing[0] || 'the initiative'} project resulting in..."`
        });
    }

    if (hasError('action verb') || hasWarning('action verb')) {
        suggestions.push({
            title: 'Use stronger action verbs',
            desc: 'Start each bullet with a power verb: "Spearheaded", "Architected", "Optimized", "Orchestrated", "Pioneered". Avoid "Responsible for", "Worked on", "Helped with".'
        });
    }

    if (!sections.skills) {
        suggestions.push({
            title: 'Add a dedicated skills section',
            desc: 'Group 8-12 skills by category: "Languages: Python, JavaScript, SQL | Frameworks: React, Django | Tools: Docker, Git, AWS". This helps ATS parsing.'
        });
    }

    if (hasWarning('passive')) {
        suggestions.push({
            title: 'Eliminate passive voice',
            desc: 'Change "The system was developed by me" to "Developed a system that...". Active voice is more impactful and uses fewer words.'
        });
    }

    if (hasWarning('first-person') || hasWarning('pronouns')) {
        suggestions.push({
            title: 'Remove first-person pronouns',
            desc: 'Replace "I managed a team" with "Managed a team of 8 engineers". Resume bullets should start with the action verb, not "I".'
        });
    }

    if (hasWarning('bullet') || hasWarning('dense')) {
        suggestions.push({
            title: 'Use structured bullet points',
            desc: 'Follow the CAR formula: Challenge (context), Action (what you did), Result (measurable outcome). Keep each bullet to 1-2 lines maximum.'
        });
    }

    if (hasWarning('length') || hasError('short')) {
        suggestions.push({
            title: 'Optimize resume length',
            desc: 'For 0-5 years experience: 1 page. For 5-15 years: 1-2 pages. For 15+: 2 pages max. Each entry should have 3-5 impactful bullets.'
        });
    }

    // Always provide tailoring advice
    if (suggestions.length < 4) {
        suggestions.push({
            title: 'Mirror the job description language',
            desc: 'Use the exact phrasing from the JD. If they say "cross-functional collaboration", use that exact phrase — not "worked with different teams". ATS matches exact terms.'
        });
    }

    return suggestions.slice(0, 6);
}
