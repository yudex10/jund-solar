# Mídias e direção de arte — reformulação local

Atualizado em 15/09/2026. Esta versão substitui o relatório da etapa anterior. Originais analisados em `C:\Users\netoc\Downloads\Nova pasta\`: quatro PNGs e um MP4. Nenhum vídeo vertical foi fornecido. Os originais permanecem intactos.

Todas as cenas fornecidas são ilustrativas: não representam projetos, clientes, instalações ou equipe da Jund Solar. As soluções e o manifesto trazem identificação visível de imagem ilustrativa; os textos alternativos também esclarecem esse caráter.

| Original | Uso | Derivados e peso em bytes |
|---|---|---|
| Solar_panels_reflecting_sunset_1080p_20260914203217.mp4 | Fundo dominante do hero desktop; primeiro quadro como poster | hero-solar.webm: 1.391.937; hero-solar.mp4: 1.525.692 |
| Primeiro quadro do vídeo | Poster horizontal desktop e recorte vertical mobile | hero-wide-960.webp: 49.514; hero-wide-1600.webp: 100.834; hero-poster-800.webp: 61.242; hero-poster-1600.webp: 126.466 |
| ChatGPT Image 14 de set. de 2026, 20_52_36.png | Solução residencial, recorte concentrado no telhado e módulos | residencial-editorial-700.webp: 61.422; residencial-editorial-1400.webp: 132.644 |
| ChatGPT Image 14 de set. de 2026, 20_54_23.png | Solução empresarial, instalação ampla e contexto urbano | empresarial-editorial-700.webp: 67.238; empresarial-editorial-1400.webp: 148.842 |
| ChatGPT Image 14 de set. de 2026, 20_54_33.png | Manifesto em largura total, paisagem aberta | panorama-editorial-800.webp: 77.396; panorama-editorial-1600.webp: 213.872 |
| ChatGPT Image 14 de set. de 2026, 20_54_11.png | Fora da composição | Casa de luxo junto a lago e montanhas nevadas: cenário excessivamente idealizado e pouco conectado à empresa brasileira. Nenhum derivado incorporado. |

## Layout e comportamento

Hero de largura total com overlay marinho suavizado, headline e apoio centralizados, tipografia mais contida e header transparente que se torna sólido ao rolar. O CTA do header foi preservado; os botões do bloco principal, o eyebrow e a faixa de localização foram removidos. Uma seta discreta indica a rolagem. No mobile, o CTA fixo permanece oculto durante o hero e reaparece nas demais seções. Soluções em grandes composições alternadas de imagem e texto; processo técnico com cinco etapas; benefícios em fundo marinho; manifesto com aproximadamente 80vh no desktop; empresa editorial sem pessoas inventadas; CTA amarelo e FAQ limpo.

O arquivo oficial do logo não foi redesenhado: um filtro SVG/CSS aplica branco/amarelo sobre os fundos escuros. Uma versão vetorial oficial nessas cores melhoraria a nitidez.

O vídeo tem 8 segundos, 1280×720, 24 fps, sem áudio. WebM é preferido e MP4 é fallback. Autoplay mudo, loop e playsinline, sem controles, conforme briefing. O carregamento começa após o poster e apenas em desktop com ponteiro preciso, largura mínima de 1024 px e conexão adequada. Pausa fora da tela ou em aba oculta. Falha de formato ou autoplay mantém o poster.

Mobile e tablet recebem imagem estática responsiva, sem download do vídeo. Reduced motion, economia de dados e conexão lenta também recebem poster. As imagens abaixo do hero usam lazy loading, srcset, sizes e dimensões explícitas. O navegador escolhe uma variante, não baixa todos os tamanhos. As oito variantes antigas de banco, sem referência na página atual, foram retiradas do repositório na finalização.

## Autenticidade futura

1. Substituir a imagem residencial por instalação residencial real da Jund Solar.
2. Substituir a imagem empresarial por projeto comercial/industrial real.
3. Obter vídeo horizontal real de telhado e módulos para o hero; uma captura vertical pode ser avaliada futuramente.
4. Avaliar foto real de instalação/obra para o manifesto, preservando espaço para texto.
5. Receber fotos reais da equipe e de equipamentos para enriquecer a seção institucional, sem inventar pessoas nem fatos.

Thiago deve confirmar identificação e autorização de uso dos projetos e pessoas, arquivos originais em alta resolução e qual contato será comercial principal. Vendas, Thiago e Guilherme continuam presentes; PRIMARY_SALES_CONTACT permanece null. Os CTAs restantes conservam o destino anterior, sem escolher nova hierarquia. Quando houver definição, sincronizar também os href estáticos para usuários sem JavaScript.

## Limitação visual honesta

Os recortes variam entre telhado residencial, instalação urbana e paisagem aberta; seções tipográficas interrompem a sequência de imagens. Ainda há predomínio de luz de pôr do sol e acabamento idealizado nas mídias fornecidas. Fotografias diurnas reais são a melhoria mais importante para transmitir autenticidade local; tratamento cromático não transforma ilustração em prova de execução.

Pesos acima são dos arquivos, não uma medição de transferência inicial. Resultados locais de navegação, acessibilidade e performance ficam em review/TESTES.md e nos JSONs de revisão. Não representam medição de produção.
