import { RecursiveUrlLoader } from 'langchain/document_loaders/web/recursive_url';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';

const TARGET_URL = 'https://www.the263fx.netlify.app'; // ✅ Change to your real domain

export default async function crawlAndEmbed() {
  try {
    const loader = new RecursiveUrlLoader(TARGET_URL, {
      maxDepth: 2,
      extractor: (html, url) => {
        const loader = new CheerioWebBaseLoader(url);
        return loader.load();
      },
    });

    const docs = await loader.load();
    const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());

    return vectorStore;
  } catch (error) {
    console.error('Error in crawlAndEmbed:', error);
    throw error;
  }
}
