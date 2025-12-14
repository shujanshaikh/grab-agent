import { codeToHtml } from 'shiki';

interface CodeBlockProps {
    code: string;
    lang?: string;
}

export async function CodeBlock({ code, lang = 'typescript' }: CodeBlockProps) {
    const html = await codeToHtml(code, {
        lang,
        theme: 'github-dark-dimmed',
    });

    return (
        <div
            className="rounded-lg overflow-hidden text-sm [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:bg-[#22272e]"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
