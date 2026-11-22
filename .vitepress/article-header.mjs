import { basename, dirname } from 'node:path/posix';

function isTitle(token) {
  return token?.type === 'heading_open' && token.tag === 'h1' && token.level === 0;
}

function isInvisible(token) {
  return token.type === 'html_block' && /^(?:<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*<\/\1>)$/i.test(token.content.trim());
}

export function articleHeader(md) {
  md.core.ruler.after('anchor', 'article-header', (state) => {
    const { tokens, env, Token } = state;
    if (state.inlineMode || !env.relativePath || (env.frontmatter?.layout ?? 'doc') !== 'doc') return;

    const firstVisible = tokens.findIndex(token => !isInvisible(token));
    const start = firstVisible === -1 ? tokens.length : firstVisible;
    if (!isTitle(tokens[start])) {
      const name = basename(env.relativePath, '.md');
      const folder = basename(dirname(env.relativePath));
      const filenameTitle = name === 'index' && folder !== '.' ? folder : name;
      const configured = typeof env.frontmatter?.title === 'string' ? env.frontmatter.title.trim() : '';
      const title = configured || filenameTitle;
      const existing = tokens.findIndex((token, index) => isTitle(token) && tokens[index + 1].content.trim() === title);
      if (existing !== -1) {
        tokens.splice(start, 0, ...tokens.splice(existing, 3));
      } else {
        const ids = new Set(tokens.map(token => token.attrGet('id')));
        let id = 'article-title';
        for (let suffix = 2; ids.has(id); suffix++) id = `article-title-${suffix}`;
        const label = configured ? configured.replace(/\s*[\r\n]+\s*/g, ' ') : filenameTitle.replace(/[!-/:-@[-`{-~]/g, '\\$&');
        const heading = md.parse(`# ${label} {#${id}}`, {});
        heading[0].attrSet('v-pre', '');
        tokens.splice(start, 0, ...heading);
      }
    }

    const metadata = new Token('html_block', '', 0);
    metadata.content = '<ArticleMetadata />\n';
    tokens.splice(start + 3, 0, metadata);
  });
}
