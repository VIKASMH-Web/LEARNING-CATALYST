/**
 * PDF Text Extraction Utility
 * Uses pdf.js loaded from CDN to extract text from uploaded PDF files.
 * No npm dependencies required.
 */

const PDF_JS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs';
const PDF_WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

let pdfjsLib = null;

/**
 * Dynamically load pdf.js from CDN (cached after first load)
 */
async function loadPdfJs() {
    if (pdfjsLib) return pdfjsLib;

    try {
        const pdfModule = await import(/* @vite-ignore */ PDF_JS_CDN);
        pdfjsLib = pdfModule;
        pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_CDN;
        return pdfjsLib;
    } catch (err) {
        console.error('Failed to load pdf.js from CDN:', err);
        throw new Error('Could not load PDF parser. Please check your internet connection.');
    }
}

/**
 * Extract text from a single PDF file
 * @param {File} file - The uploaded File object
 * @returns {Promise<string>} - Extracted text content
 */
export async function extractTextFromPDF(file) {
    const pdfjs = await loadPdfJs();

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const pdf = await pdfjs.getDocument({ data: uint8Array }).promise;
    const totalPages = pdf.numPages;
    const textParts = [];

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
            .map(item => item.str)
            .join(' ');
        textParts.push(pageText);
    }

    return textParts.join('\n\n');
}

/**
 * Extract text from a plain text file
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function extractTextFromTxt(file) {
    return await file.text();
}

/**
 * Extract text from any supported file type
 * @param {File} file - The uploaded File object
 * @returns {Promise<{text: string, pageCount: number, fileType: string}>}
 */
export async function extractTextFromFile(file) {
    if (!file) return { text: '', pageCount: 0, fileType: 'unknown' };

    const name = file.name.toLowerCase();
    const type = file.type;

    // PDF files
    if (name.endsWith('.pdf') || type === 'application/pdf') {
        const pdfjs = await loadPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const pdf = await pdfjs.getDocument({ data: uint8Array }).promise;
        const totalPages = pdf.numPages;
        const textParts = [];

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map(item => item.str)
                .join(' ');
            if (pageText.trim()) {
                textParts.push(pageText);
            }
        }

        return {
            text: textParts.join('\n\n'),
            pageCount: totalPages,
            fileType: 'pdf'
        };
    }

    // Plain text files
    if (name.endsWith('.txt') || type === 'text/plain') {
        const text = await file.text();
        return {
            text,
            pageCount: 1,
            fileType: 'txt'
        };
    }

    // For doc/docx/images, we extract the filename as a fallback
    // (proper docx parsing would require another library)
    if (name.endsWith('.doc') || name.endsWith('.docx')) {
        return {
            text: `[Document: ${file.name}]`,
            pageCount: 1,
            fileType: 'doc'
        };
    }

    // Image files - no text extraction, just filename
    if (name.match(/\.(png|jpg|jpeg|gif|webp)$/)) {
        return {
            text: `[Image: ${file.name}]`,
            pageCount: 1,
            fileType: 'image'
        };
    }

    return { text: '', pageCount: 0, fileType: 'unknown' };
}

/**
 * Extract text from multiple uploaded files
 * @param {Object} uploadedFiles - { syllabus: File, pyqs: File, ... }
 * @returns {Promise<Object>} - { syllabus: { text, pageCount, fileType }, ... }
 */
export async function extractAllTexts(uploadedFiles) {
    const results = {};
    const entries = Object.entries(uploadedFiles).filter(([, file]) => file !== null);

    const promises = entries.map(async ([key, file]) => {
        try {
            const result = await extractTextFromFile(file);
            results[key] = { ...result, fileName: file.name, fileSize: file.size };
        } catch (err) {
            console.error(`Error extracting text from ${file.name}:`, err);
            results[key] = {
                text: '',
                pageCount: 0,
                fileType: 'error',
                fileName: file.name,
                fileSize: file.size,
                error: err.message
            };
        }
    });

    await Promise.all(promises);
    return results;
}
