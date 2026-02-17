import { Helmet } from "react-helmet-async";

const SITE_URL = "https://blog.mappso.com";

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    type?: string;
    image?: string;
}

const defaults = {
    title: "Milo R. Jørgensen — Full-Stack Developer & Founder",
    siteName: "mappso",
    description:
        "Portfolio of Milo R. Jørgensen — Full-Stack Developer & Founder based in Aarhus, Denmark. Specializing in React, .NET, TypeScript, and cloud infrastructure.",
    image: `${SITE_URL}/assets/profile.jpeg`,
};

const SEO: React.FC<SEOProps> = ({
    title,
    description = defaults.description,
    path = "",
    type = "website",
    image = defaults.image,
}) => {
    const pageTitle = title
        ? `${title} | ${defaults.siteName}`
        : defaults.title;
    const url = `${SITE_URL}${path}`;

    return (
        <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={defaults.siteName} />
            <meta property="og:locale" content="en_DK" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
export { SITE_URL };
