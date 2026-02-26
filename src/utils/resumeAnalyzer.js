import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure pdf.js worker (using local bundled worker via Vite)
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// ─── Stopwords ───────────────────────────────────────────────
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
    'etc', 'e.g', 'i.e', 'per', 'via', 'able', 'across', 'must', 'including', 'include',
    'within', 'without', 'along', 'among', 'around', 'based', 'using', 'used', 'related',
    'required', 'preferred', 'strong', 'good', 'great', 'excellent', 'proven', 'plus',
    'minimum', 'maximum', 'least', 'years', 'year', 'experience', 'experienced',
    'role', 'position', 'job', 'company', 'team', 'responsible', 'responsibilities',
    'qualifications', 'requirements', 'description', 'overview', 'summary', 'looking',
    'join', 'opportunity', 'ideal', 'candidate', 'apply', 'application',
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
            const pageText = content.items.map(item => item.str).join(' ');
            text += pageText + '\n';
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

// ─── Keyword Extraction ──────────────────────────────────────

function tokenize(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s\-\+\#\.\/]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 1);
}

function extractKeywords(text) {
    const words = tokenize(text);
    const keywords = new Map(); // keyword -> frequency

    // Single words (unigrams)
    for (const word of words) {
        if (STOPWORDS.has(word)) continue;
        if (word.length < 2) continue;
        if (/^\d+$/.test(word)) continue;
        keywords.set(word, (keywords.get(word) || 0) + 1);
    }

    // Bigrams (two-word phrases)
    for (let i = 0; i < words.length - 1; i++) {
        if (STOPWORDS.has(words[i]) && STOPWORDS.has(words[i + 1])) continue;
        const bigram = `${words[i]} ${words[i + 1]}`;
        if (bigram.length > 4) {
            keywords.set(bigram, (keywords.get(bigram) || 0) + 1);
        }
    }

    // Trigrams (three-word phrases like "machine learning engineer")
    for (let i = 0; i < words.length - 2; i++) {
        const trigram = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
        if (trigram.length > 6) {
            keywords.set(trigram, (keywords.get(trigram) || 0) + 1);
        }
    }

    return keywords;
}

function extractJDKeywords(jdText) {
    const allKeywords = extractKeywords(jdText);

    // Filter to only meaningful keywords (freq >= 1, not too generic)
    const meaningful = new Map();
    for (const [kw, freq] of allKeywords) {
        // Prefer multi-word phrases and technical terms
        const words = kw.split(' ');
        const isMultiWord = words.length > 1;
        const isTechnical = /[+#.]/.test(kw) || /^[a-z]+[A-Z]/.test(kw);

        if (isMultiWord || isTechnical || freq >= 1) {
            // Skip very common single words that aren't useful
            if (words.length === 1 && STOPWORDS.has(kw)) continue;
            meaningful.set(kw, freq);
        }
    }

    // Sort by frequency and take top keywords
    const sorted = [...meaningful.entries()]
        .sort((a, b) => {
            // Prioritize multi-word keywords
            const aMulti = a[0].split(' ').length > 1 ? 2 : 0;
            const bMulti = b[0].split(' ').length > 1 ? 2 : 0;
            return (b[1] + bMulti) - (a[1] + aMulti);
        })
        .slice(0, 50);

    return new Map(sorted);
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
                // Save previous section
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

    // Save last section
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
            text: 'No phone number detected — most recruiters expect a contact number',
            section: 'Contact',
            priority: 'Medium'
        });
    }

    // Check for standard sections
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

    // Check for ATS-hostile patterns
    if (/[│┃┆┊╎║▏▎▍▌▋▊▉█]/.test(text)) {
        score -= 10;
        issues.push({
            type: 'warning',
            text: 'Special characters or table borders detected — these may not parse correctly in ATS',
            section: 'Format',
            priority: 'Medium'
        });
    }

    // Check if text is too short (likely parsing issue)
    if (text.length < 200) {
        score -= 20;
        issues.push({
            type: 'error',
            text: 'Very little text extracted — your resume may use images or complex layouts that ATS cannot read',
            section: 'Format',
            priority: 'High'
        });
    }

    // Positive checks
    if (hasEmail && hasPhone) {
        issues.push({
            type: 'success',
            text: 'Contact information (email and phone) is properly included',
            section: 'Contact',
            priority: 'Low'
        });
    }

    if (sections.experience && sections.education && sections.skills) {
        issues.push({
            type: 'success',
            text: 'All critical resume sections (Experience, Education, Skills) are present',
            section: 'Structure',
            priority: 'Low'
        });
    }

    return { score: Math.max(0, score), issues };
}

// ─── Content Quality Check ───────────────────────────────────

function checkContentQuality(text, sections) {
    let score = 100;
    const issues = [];
    const words = tokenize(text);

    // Check for action verbs
    const foundActionVerbs = words.filter(w => ACTION_VERBS.has(w));
    const uniqueActionVerbs = new Set(foundActionVerbs);

    if (uniqueActionVerbs.size === 0) {
        score -= 25;
        issues.push({
            type: 'error',
            text: 'No action verbs found — use verbs like "developed", "led", "implemented", "optimized" to describe achievements',
            section: 'Experience',
            priority: 'High'
        });
    } else if (uniqueActionVerbs.size < 3) {
        score -= 12;
        issues.push({
            type: 'warning',
            text: `Only ${uniqueActionVerbs.size} unique action verb(s) found — aim for 5+ varied action verbs throughout your resume`,
            section: 'Experience',
            priority: 'Medium'
        });
    } else {
        issues.push({
            type: 'success',
            text: `Good use of ${uniqueActionVerbs.size} action verbs including "${[...uniqueActionVerbs].slice(0, 3).join('", "')}"`,
            section: 'Experience',
            priority: 'Low'
        });
    }

    // Check for quantified achievements
    const quantifiedPattern = /\d+[%xX]|\$\s*\d|increased\s+.*\d|reduced\s+.*\d|improved\s+.*\d|grew\s+.*\d|saved\s+.*\d|\d+\s*(users?|customers?|clients?|projects?|team|people|members?|employees?)/gi;
    const quantifiedMatches = text.match(quantifiedPattern) || [];

    if (quantifiedMatches.length === 0) {
        score -= 20;
        issues.push({
            type: 'error',
            text: 'No quantifiable achievements found — add metrics like percentages, revenue, user counts, or time saved',
            section: 'Experience',
            priority: 'High'
        });
    } else if (quantifiedMatches.length < 3) {
        score -= 8;
        issues.push({
            type: 'warning',
            text: `Only ${quantifiedMatches.length} quantified achievement(s) found — try to add numbers to at least 3-5 bullet points`,
            section: 'Experience',
            priority: 'Medium'
        });
    } else {
        issues.push({
            type: 'success',
            text: `${quantifiedMatches.length} quantified achievements detected — this makes your impact tangible to recruiters`,
            section: 'Experience',
            priority: 'Low'
        });
    }

    // Check for professional summary
    if (!sections.summary) {
        score -= 15;
        issues.push({
            type: 'error',
            text: 'No professional summary found — recruiters spend 6 seconds on first scan, a strong summary hooks them immediately',
            section: 'Summary',
            priority: 'High'
        });
    } else {
        const summaryWords = sections.summary.split(/\s+/).length;
        if (summaryWords < 15) {
            score -= 8;
            issues.push({
                type: 'warning',
                text: 'Professional summary is too brief — aim for 2-3 sentences highlighting your experience, skills, and career goals',
                section: 'Summary',
                priority: 'Medium'
            });
        } else {
            issues.push({
                type: 'success',
                text: 'Professional summary is present and well-structured',
                section: 'Summary',
                priority: 'Low'
            });
        }
    }

    // Check bullet points usage
    const bulletPattern = /^[\s]*[•\-\*\◦\○\●\►\▸\‣\⁃]/gm;
    const bullets = text.match(bulletPattern) || [];
    if (bullets.length < 3) {
        score -= 10;
        issues.push({
            type: 'warning',
            text: 'Few or no bullet points detected — use bullet points to make your achievements easy to scan',
            section: 'Experience',
            priority: 'Medium'
        });
    }

    return { score: Math.max(0, score), issues };
}

// ─── Formatting Check ────────────────────────────────────────

function checkFormatting(text) {
    let score = 100;
    const issues = [];
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

    // Check resume length
    if (wordCount < 100) {
        score -= 25;
        issues.push({
            type: 'error',
            text: 'Resume appears very short — a strong resume typically has 300-700 words',
            section: 'Format',
            priority: 'High'
        });
    } else if (wordCount < 250) {
        score -= 12;
        issues.push({
            type: 'warning',
            text: `Resume has only ~${wordCount} words — consider adding more detail about your experience and achievements`,
            section: 'Format',
            priority: 'Medium'
        });
    } else if (wordCount > 1200) {
        score -= 10;
        issues.push({
            type: 'warning',
            text: `Resume has ~${wordCount} words — consider condensing to 1-2 pages for better recruiter engagement`,
            section: 'Format',
            priority: 'Medium'
        });
    } else {
        issues.push({
            type: 'success',
            text: `Resume length (~${wordCount} words) is appropriate — within the ideal range for ATS and recruiter review`,
            section: 'Format',
            priority: 'Low'
        });
    }

    // Check for consistent date formatting
    const datePatterns = text.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{4}\b|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b|\b\d{4}\s*[-–—]\s*(present|\d{4})\b/gi) || [];
    if (datePatterns.length > 0) {
        issues.push({
            type: 'success',
            text: 'Dates are detected in your resume — ensure they follow a consistent format throughout',
            section: 'Format',
            priority: 'Low'
        });
    }

    // Check for very long lines (walls of text)
    const longLines = lines.filter(l => l.length > 200);
    if (longLines.length > 3) {
        score -= 8;
        issues.push({
            type: 'warning',
            text: 'Some paragraphs appear very dense — break long blocks into concise bullet points',
            section: 'Format',
            priority: 'Medium'
        });
    }

    // Check for all-caps overuse (besides section headers)
    const allCapsLines = lines.filter(l => l === l.toUpperCase() && l.length > 3 && /[A-Z]/.test(l));
    if (allCapsLines.length > 5) {
        score -= 5;
        issues.push({
            type: 'warning',
            text: 'Excessive use of ALL CAPS detected — use standard capitalization for better ATS readability',
            section: 'Format',
            priority: 'Low'
        });
    }

    return { score: Math.max(0, score), issues };
}

// ─── Keyword Match ───────────────────────────────────────────

function matchKeywords(resumeText, jdKeywords) {
    let score = 100;
    const issues = [];
    const resumeLower = resumeText.toLowerCase();
    const matched = [];
    const missing = [];

    // Sort JD keywords by importance (frequency * word count)
    const sortedKeywords = [...jdKeywords.entries()]
        .sort((a, b) => {
            const aWeight = a[1] * (a[0].split(' ').length > 1 ? 2 : 1);
            const bWeight = b[1] * (b[0].split(' ').length > 1 ? 2 : 1);
            return bWeight - aWeight;
        });

    // Check top keywords (limit to manageable number)
    const topKeywords = sortedKeywords.slice(0, 30);

    for (const [keyword] of topKeywords) {
        // For multi-word phrases, check exact match
        // For single words, check word boundary match
        const words = keyword.split(' ');
        let found = false;

        if (words.length > 1) {
            found = resumeLower.includes(keyword);
        } else {
            // Word boundary match for single words
            const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            found = regex.test(resumeLower);
        }

        if (found) {
            matched.push(keyword);
        } else {
            missing.push(keyword);
        }
    }

    // Calculate score based on match percentage
    const totalChecked = matched.length + missing.length;
    if (totalChecked > 0) {
        const matchRate = matched.length / totalChecked;
        score = Math.round(matchRate * 100);

        if (matchRate >= 0.7) {
            issues.push({
                type: 'success',
                text: `Strong keyword match — ${matched.length} of ${totalChecked} key terms from the job description found in your resume`,
                section: 'Keywords',
                priority: 'Low'
            });
        } else if (matchRate >= 0.4) {
            issues.push({
                type: 'warning',
                text: `Moderate keyword match — only ${matched.length} of ${totalChecked} key terms found. Add ${missing.length} missing keywords to improve ATS score`,
                section: 'Keywords',
                priority: 'Medium'
            });
        } else {
            issues.push({
                type: 'error',
                text: `Low keyword match — only ${matched.length} of ${totalChecked} key terms found. Your resume may be filtered out by ATS systems`,
                section: 'Keywords',
                priority: 'High'
            });
        }

        if (missing.length > 0) {
            const topMissing = missing.slice(0, 8);
            issues.push({
                type: 'warning',
                text: `Key missing terms: "${topMissing.join('", "')}" — consider incorporating these naturally into your resume`,
                section: 'Keywords',
                priority: 'High'
            });
        }
    }

    return { score: Math.max(0, score), issues, matched, missing };
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
        // Without JD, do a general keyword check
        const resumeKeywords = extractKeywords(resumeText);
        const technicalTerms = [...resumeKeywords.keys()].filter(k =>
            /[+#.]/.test(k) || k.split(' ').length > 1
        );
        keywordResult = {
            score: Math.min(100, 50 + technicalTerms.length * 3),
            issues: [{
                type: 'warning',
                text: 'No job description provided — paste a JD for accurate keyword matching and a more precise ATS score',
                section: 'Keywords',
                priority: 'Medium'
            }],
            matched: technicalTerms.slice(0, 10),
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

    // Combine all issues
    const allIssues = [
        ...atsResult.issues,
        ...contentResult.issues,
        ...formatResult.issues,
        ...keywordResult.issues,
    ];

    // Sort: errors first, then warnings, then successes
    const priorityOrder = { error: 0, warning: 1, success: 2 };
    allIssues.sort((a, b) => priorityOrder[a.type] - priorityOrder[b.type]);

    // Generate suggestions based on the analysis
    const suggestions = generateSuggestions(allIssues, sections, keywordResult);

    return {
        overallScore,
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
            desc: 'Write a 2-3 sentence overview at the top of your resume highlighting your years of experience, core expertise, and what value you bring. This is the first thing recruiters and ATS systems scan.'
        });
    }

    if (hasError('quantif') || hasWarning('quantif') || hasError('metrics')) {
        suggestions.push({
            title: 'Quantify your achievements',
            desc: 'Replace vague statements with measurable results. Instead of "improved performance", write "improved app performance by 40%, reducing load time from 3.2s to 1.9s". Numbers catch recruiter attention.'
        });
    }

    if (keywordResult.missing.length > 0) {
        const topMissing = keywordResult.missing.slice(0, 5).join(', ');
        suggestions.push({
            title: 'Add missing JD keywords',
            desc: `Your resume is missing these key terms from the job description: ${topMissing}. Naturally incorporate them into your experience bullets, skills section, or summary. Don't just list them — use them in context.`
        });
    }

    if (hasError('action verb') || hasWarning('action verb')) {
        suggestions.push({
            title: 'Use stronger action verbs',
            desc: 'Start each bullet point with a powerful action verb: "Spearheaded", "Architected", "Optimized", "Drove", "Delivered". Avoid passive phrases like "was responsible for" or "helped with".'
        });
    }

    if (!sections.skills) {
        suggestions.push({
            title: 'Add a dedicated skills section',
            desc: 'Create a skills section with 8-12 relevant hard and soft skills. Group them by category (e.g., Programming Languages, Tools & Frameworks, Soft Skills) for better ATS parsing and readability.'
        });
    }

    if (hasWarning('bullet') || hasWarning('dense')) {
        suggestions.push({
            title: 'Improve formatting with bullet points',
            desc: 'Use concise bullet points (1-2 lines each) instead of dense paragraphs. Each bullet should follow the formula: Action Verb + Task + Result. This improves both ATS parsing and human readability.'
        });
    }

    if (hasWarning('length') || hasError('short')) {
        suggestions.push({
            title: 'Optimize resume length',
            desc: 'For most professionals, the ideal resume is 1-2 pages (300-700 words). If too short, add more detail about your top achievements. If too long, cut older or less relevant experience.'
        });
    }

    // Always add at least some suggestions
    if (suggestions.length < 3) {
        if (!suggestions.find(s => s.title.includes('ATS'))) {
            suggestions.push({
                title: 'Tailor your resume for each application',
                desc: 'Customize your resume for each job by matching the language used in the job description. Mirror their terminology — if they say "project management", use that exact phrase, not "PM" or "managing projects".'
            });
        }
    }

    return suggestions.slice(0, 6);
}
